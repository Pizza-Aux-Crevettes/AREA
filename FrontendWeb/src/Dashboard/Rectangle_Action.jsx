import { useState, useRef, Fragment, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
    Menu,
    Button,
    TextInput,
    Modal,
    MenuDivider,
    Select,
    getBreakpointValue,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import './Dashboard.css';
import logo_cross from '../assets/cross.png';
import Cookies from 'cookies-js';

const applyAcRea = async (action, reaction, inputAction, inputReaction) => {
    if (
        action === 'DiscordUsername' ||
        action === 'DiscordGuilds' ||
        action === 'Email'
    ) {
        inputAction = 'Nothing';
    }
    if (reaction === 'Spotify') {
        inputReaction = 'Nothing';
    }
    if (action && reaction && inputReaction && inputAction) {
        fetch('http://localhost:8080/api/setArea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify({
                token: Cookies.get('token'),
                action: action,
                reaction: reaction,
                inputAct: inputAction,
                inputReact: inputReaction,
            }),
        })
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        alert('Please complete all fields');
    }
};

function RectangleDashboard({
    id,
    onRemove,
    contentAct,
    contentReact,
    inputChange,
    inputContentAct,
    inputContentReact,
    alreadyExist,
}) {
    const [opened, { open, close }] = useDisclosure(false);
    const [action, setAction] = useState(contentAct);
    const [reaction, setReaction] = useState(contentReact);
    const buttonRef = useRef(null);
    const [menuItemsAction, setMenuItemsAction] = useState([
        { action: 'Weather', label: 'When it rains', connected: false },
        { action: 'Email', label: 'When I receive an email', connected: false },
        { action: 'Alerts', label: 'When it is alerts', connected: false },
        { action: 'News', label: 'When news appears', connected: false },
        {
            action: 'DiscordUsername',
            label: 'When my discord username changes',
            connected: false,
        },
        {
            action: 'DiscordGuilds',
            label: 'When my number of discord guilds change',
            connected: false,
        },
    ]);

    const [menuItemsReaction, setMenuItemsReaction] = useState([
        { reaction: 'Spotify', label: 'Sad music is played', connected: false },
        { reaction: 'sendEmail', label: 'Send an email', connected: false },
        { reaction: 'MP', label: 'Send a mp', connected: false },
        { reaction: 'Clip', label: 'Create a twitch clip', connected: false },
        {
            reaction: 'Event',
            label: 'Create a Event on Google Calendar',
            connected: false,
        },
        {
            reaction: 'Issue',
            label: 'Create an issue on github',
            connected: false,
        },
        {
            reaction: 'Branch',
            label: 'Create a Branch on github',
            connected: false,
        },
    ]);

    const [hoverText, setHoverText] = useState('');

    const [githubOrgs, setGithubOrgs] = useState([]);
    const [orgChosen, setOrgChosen] = useState('');
    const [orgfinal, setOrgfinal] = useState('');
    const [githubRep, setGithubRep] = useState([]);
    const [repChosen, setRepChosen] = useState('');
    const [repfinal, setRepfinal] = useState('');

    const [emailInput, setEmailInput] = useState('');
    const [emailInputFinal, setEmailInputFinal] = useState('');

    const [idDiscordInput, setIdDiscordInput] = useState('');
    const [idDiscordInputFinal, setIdDiscordInputFinal] = useState('');

    useEffect(() => {
        const checkConnection = async () => {
            for (let i = 0; i < menuItemsAction.length; i++) {
                const res = await checkServicesConnexion(
                    menuItemsAction[i].action
                );
                changeConnexionAction(i, res);
            }
            for (let i = 0; i < menuItemsReaction.length; i++) {
                const res = await checkServicesConnexion(
                    menuItemsReaction[i].reaction
                );
                changeConnexionReaction(i, res);
            }
        };
        checkConnection();
    }, [action, reaction]);

    async function settupReaction(reaction) {
        setReaction(reaction);
        setOrgChosen('');
        setOrgfinal('');
        setRepChosen('');
        setRepfinal('');
        setEmailInput('');
        setEmailInputFinal('');
        setIdDiscordInput('');
        setIdDiscordInputFinal('');
        if (reaction === 'Branch' || reaction === 'Issue') {
            try {
                const response = await fetch(
                    'https://api.github.com/user/orgs',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/vnd.github.v3+json',
                            Authorization: `Bearer ${Cookies.get('github_token')}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const orgsUser = await response.json();

                const personnal = await fetch('https://api.github.com/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/vnd.github.v3+json',
                        Authorization: `Bearer ${Cookies.get('github_token')}`,
                    },
                });
                if (!personnal.ok) {
                    throw new Error(`HTTP error! status: ${personnal.status}`);
                }
                const personnalUser = await personnal.json();
                setGithubOrgs([...orgsUser, personnalUser]);
                await getRep(orgsUser, personnalUser);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const getRep = async (orgsUser, personnalUser) => {
        try {
            const orgFetchPromises = orgsUser.map((org) =>
                fetch(`https://api.github.com/orgs/${org.login}/repos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/vnd.github.v3+json',
                        Authorization: `Bearer ${Cookies.get('github_token')}`,
                    },
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `Error fetching repos for org ${org.login}: ${response.status}`
                        );
                    }
                    return response.json();
                })
            );
            const orgRepos = await Promise.all(orgFetchPromises);
            const flatOrgRepos = orgRepos.flat();
            setGithubRep((prevRepos) => [...prevRepos, ...flatOrgRepos]);
            const userResponse = await fetch(
                `https://api.github.com/users/${personnalUser.login}/repos`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/vnd.github.v3+json',
                        Authorization: `Bearer ${Cookies.get('github_token')}`,
                    },
                }
            );
            if (!userResponse.ok) {
                throw new Error(
                    `Error fetching repos for user ${personnalUser.login}: ${userResponse.status}`
                );
            }
            const userRepos = await userResponse.json();
            setGithubRep((prevRepos) => [...prevRepos, ...userRepos]);
        } catch (error) {
            console.error('Failed to fetch repositories:', error);
            return null;
        }
    };

    const orgsVal = (value) => {
        setOrgChosen(value);
        setOrgfinal(value + ' ');
    };

    const repsVal = (value) => {
        setRepChosen(value);
        setRepfinal(value + ' ');
    };

    const handleOrgs = () => {
        return (
            <>
                <Select
                    disabled={alreadyExist}
                    size="lg"
                    radius="md"
                    placeholder="Organisations github"
                    value={orgChosen}
                    onChange={(value) => orgsVal(value)}
                    data={githubOrgs.map((userOrg) => ({
                        value: userOrg.login,
                        label: userOrg.login,
                    }))}
                />
            </>
        );
    };

    const handleRep = () => {
        const filterRep = githubRep.filter(
            (userRep) => userRep.owner.login === orgChosen
        );
        return (
            <>
                <Select
                    disabled={alreadyExist}
                    size="lg"
                    radius="md"
                    placeholder="Repos github"
                    value={repChosen}
                    onChange={(value) => repsVal(value)}
                    data={filterRep.map((userRep) => ({
                        value: userRep.name,
                        label: userRep.name,
                    }))}
                />
            </>
        );
    };

    const checkServicesConnexion = async (area) => {
        switch (area) {
            case 'Email':
                if (!Cookies.get('google_token')) {
                    return false;
                }
                break;
            case 'DiscordUsername':
                if (!Cookies.get('discord_token')) {
                    return false;
                }
                break;
            case 'DiscordGuilds':
                if (!Cookies.get('discord_token')) {
                    return false;
                }
                break;
            case 'Spotify':
                if (!Cookies.get('spotify_token')) {
                    return false;
                }
                break;
            case 'sendEmail':
                if (!Cookies.get('google_token')) {
                    return false;
                }
                break;
            case 'Clip':
                if (!Cookies.get('twitch_token')) {
                    return false;
                }
                break;
            case 'Event':
                if (!Cookies.get('google_token')) {
                    return false;
                }
                break;
            case 'Issue':
                if (!Cookies.get('github_token')) {
                    return false;
                }
                break;
            case 'Branch':
                if (!Cookies.get('github_token')) {
                    return false;
                }
                break;
            default:
                return true;
        }
        return true;
    };

    const changeConnexionAction = (index, result) => {
        let newItemAction = [...menuItemsAction];
        newItemAction[index].connected = result;
        setMenuItemsAction(newItemAction);
    };
    const changeConnexionReaction = (index, result) => {
        let newItemReaction = [...menuItemsReaction];
        newItemReaction[index].connected = result;
        setMenuItemsReaction(newItemReaction);
    };

    const handleRemove = () => {
        onRemove(id, action, reaction, inputContentAct, inputContentReact);
        close();
    };

    const MouseHover = (service, isConnected) => {
        if (isConnected === true) {
            setHoverText('');
            return;
        }
        let text = '';
        switch (service) {
            case 'DiscordUsername':
                text = 'Please log in to discord';
                break;
            case 'DiscordGuilds':
                text = 'Please log in to discord';
                break;
            case 'Spotify':
                text = 'Please log in to spotify';
                break;
            case 'sendEmail':
                text = 'Please log in to google';
                break;
            case 'Event':
                text = 'Please log in to google';
                break;
            case 'Email':
                text = 'Please log in to google';
                break;
            case 'Clip':
                text = 'Please log in to twitch';
                break;
            case 'Issue':
                text = 'Please log in to github';
                break;
            case 'Branch':
                text = 'Please log in to github';
                break;
        }
        setHoverText(text);
    };

    const handleMouseLeave = () => {
        setHoverText('');
    };

    const handleInput = (field, fieldName) => {
        return (
            <>
                <TextInput
                    disabled={alreadyExist}
                    radius="md"
                    size="lg"
                    placeholder="Enter your input"
                    value={field}
                    onChange={(e) => inputChange(id, fieldName, e.target.value)}
                />
            </>
        );
    };

    const emailInputChange = (value) => {
        setEmailInput(value);
        setEmailInputFinal(value + ' ');
    }

    const handleInputEmail = () => {
        return (
            <>
                <TextInput
                    disabled={alreadyExist}
                    radius="md"
                    size="lg"
                    placeholder="Enter an email"
                    value={emailInput}
                    onChange={(e) => emailInputChange(e.target.value)}
                />
            </>
        );
    }

    const idDiscordInputChange = (value) => {
        setIdDiscordInput(value);
        setIdDiscordInputFinal(value + ' ');
    }

    const handleInputIdDiscord = () => {
        return (
            <>
                <TextInput
                    disabled={alreadyExist}
                    radius="md"
                    size="lg"
                    placeholder="Enter an id Discord"
                    value={idDiscordInput}
                    onChange={(e) => idDiscordInputChange(e.target.value)}
                />
            </>
        );
    }

    const handleWeather = () => {
        const cities = [
            { name: 'Paris' },
            { name: 'Marseille' },
            { name: 'Lyon' },
            { name: 'Toulouse' },
            { name: 'Nice' },
            { name: 'Nantes' },
            { name: 'Montpellier' },
            { name: 'Strasbourg' },
            { name: 'Bordeaux' },
            { name: 'Lille' },
        ];

        return (
            <>
                <Select
                    disabled={alreadyExist}
                    size="lg"
                    radius="md"
                    placeholder="City"
                    value={inputContentAct}
                    onChange={(value) => inputChange(id, 'inputAction', value)}
                    data={cities.map((city) => ({
                        value: city.name,
                        label: city.name,
                    }))}
                />
            </>
        );
    };

    const handleAlerts = () => {
        const cities = [
            { name: 'Tokyo' },
            { name: 'Jakarta' },
            { name: 'Manille' },
            { name: 'Port-au-Prince' },
            { name: 'Mexico City' },
            { name: 'Los Angeles' },
            { name: 'Calcutta' },
            { name: 'Dhaka' },
            { name: 'Caracas' },
            { name: 'Christchurch' },
        ];

        return (
            <>
                <Select
                    disabled={alreadyExist}
                    placeholder="City"
                    value={inputContentAct}
                    onChange={(value) => inputChange(id, 'inputAction', value)}
                    data={cities.map((city) => ({
                        value: city.name,
                        label: city.name,
                    }))}
                />
            </>
        );
    };

    return (
        <>
            {hoverText ? (
                <div
                    className="popUp"
                    style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        zIndex: 100,
                    }}
                >
                    {hoverText}
                </div>
            ) : (
                <></>
            )}
            <div className="rectangle">
                <Modal
                    opened={opened}
                    onClose={close}
                    title="Closing area"
                    centered
                >
                    <p>Are you sure you want to close this area?</p>
                    <Button onClick={handleRemove}>Yes</Button>
                </Modal>
                <div className="cont-rect">
                    <Menu width={200} shadow="md">
                        <Menu.Target>
                            <Button
                                className="button-menu"
                                size="lg"
                                ref={buttonRef}
                                disabled={alreadyExist}
                            >
                                {action}
                                <IconChevronDown size={16} />
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            {menuItemsAction.map((item, index) => (
                                <Fragment key={item.action}>
                                    <div
                                        onMouseOver={() =>
                                            MouseHover(
                                                item.action,

                                                item.connected
                                            )
                                        }
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            display: 'inline-block',
                                            position: 'relative',
                                        }}
                                    >
                                        <Menu.Item
                                            onClick={() =>
                                                setAction(item.action)
                                            }
                                            disabled={
                                                action === item.action ||
                                                item.connected === false
                                            }
                                        >
                                            {item.label}
                                        </Menu.Item>
                                    </div>
                                    {index !== menuItemsAction.length - 1 && (
                                        <MenuDivider />
                                    )}
                                </Fragment>
                            ))}
                        </Menu.Dropdown>
                    </Menu>

                    {action === 'Weather' ? handleWeather() : null}
                    {action === 'Alerts' ? handleAlerts() : null}
                    {action === 'News'
                        ? handleInput(inputContentAct, 'inputAction')
                        : null}

                    {reaction === 'Branch' || reaction == 'Issue'
                        ? handleOrgs()
                        : null}
                    {reaction === 'MP' ? handleInputIdDiscord() : null}
                    {reaction === 'sendEmail' ? handleInputEmail() : null}
                    {reaction === 'Branch' || reaction == 'Issue'
                        ? handleRep()
                        : null}
                    {reaction === 'MP' ||
                        reaction === 'Clip' ||
                        reaction === 'Event' ||
                        reaction === 'Issue' ||
                        reaction === 'Branch' ||
                        reaction === 'sendEmail'
                        ? handleInput(inputContentReact, 'inputReaction')
                        : null}

                    <Menu width={200} shadow="md">
                        <Menu.Target>
                            <Button
                                className="button-menu"
                                size="lg"
                                ref={buttonRef}
                                disabled={alreadyExist}
                            >
                                {reaction}
                                <IconChevronDown size={16} />
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            {menuItemsReaction.map((item, index) => (
                                <Fragment key={item.reaction}>
                                    <div
                                        onMouseOver={() =>
                                            MouseHover(
                                                item.reaction,

                                                item.connected
                                            )
                                        }
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            display: 'inline-block',
                                            position: 'relative',
                                        }}
                                    >
                                        <Menu.Item
                                            onClick={() =>
                                                settupReaction(item.reaction)
                                            }
                                            disabled={
                                                action === item.reaction ||
                                                item.connected === false
                                            }
                                        >
                                            {item.label}
                                        </Menu.Item>
                                    </div>
                                    {index !== menuItemsReaction.length - 1 && (
                                        <MenuDivider />
                                    )}
                                </Fragment>
                            ))}
                        </Menu.Dropdown>
                    </Menu>
                </div>
                <button className="button-cross" onClick={open}>
                    <img src={logo_cross} width={35} height={35} alt="cross" />
                </button>
            </div>
            {!alreadyExist && (
                <Button
                    className="button-correct"
                    onClick={() =>
                        applyAcRea(
                            action,
                            reaction,
                            inputContentAct,
                            idDiscordInputFinal + emailInputFinal + orgfinal + repfinal + inputContentReact
                        )
                    }
                >
                    Apply
                </Button>
            )}
        </>
    );
}

export default RectangleDashboard;
