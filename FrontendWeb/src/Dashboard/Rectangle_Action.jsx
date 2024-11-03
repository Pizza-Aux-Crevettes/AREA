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
    Tooltip,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import './Dashboard.css';
import logo_cross from '../assets/cross.png';
import icon_discord from '../assets/discord_black.png';
import icon_github from '../assets/github.png';
import icon_google from '../assets/google-black.png';
import icon_spotify from '../assets/spotify-black.png';
import icon_twitch from '../assets/twitch.png';
import icon_weather from '../assets/weather.png';
import icon_news from '../assets/news.png';

import Cookies from 'cookies-js';

const applyAcRea = async (
    action,
    reaction,
    inputAction,
    idDiscordInputFinal,
    emailInputFinal,
    orgfinal,
    repfinal,
    inputReaction,
    apiUrl
) => {
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
    if (
        (reaction === 'Branch' || reaction === 'Issue') &&
        (orgfinal === '' || repfinal === '')
    ) {
        alert('Please complete all fields');
        return;
    }
    if (reaction === 'Branch' && inputReaction.includes(' ')) {
        alert('Please no space in branch name');
        return;
    }
    if (reaction === 'MP' && idDiscordInputFinal === '') {
        alert('Please complete all fields');
        return;
    }
    if (reaction === 'sendEmail' && emailInputFinal === '') {
        alert('Please complete all fields');
        return;
    }
    if (action && reaction && inputReaction && inputAction) {
        fetch(`${apiUrl}/api/setArea`, {
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
                inputReact:
                    idDiscordInputFinal +
                    emailInputFinal +
                    orgfinal +
                    repfinal +
                    inputReaction,
            }),
        })
            .then((response) => {
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
        {
            action: 'Weather',
            label: 'When it rains',
            icon: icon_weather,
            connected: false,
        },
        {
            action: 'Email',
            label: 'When I receive an email',
            icon: icon_google,
            connected: false,
        },
        {
            action: 'Alerts',
            label: 'When an alert happens',
            icon: icon_weather,
            connected: false,
        },
        {
            action: 'News',
            label: 'When news is published',
            icon: icon_news,
            connected: false,
        },
        {
            action: 'DiscordUsername',
            label: 'When my username changes',
            icon: icon_discord,
            connected: false,
        },
        {
            action: 'DiscordGuilds',
            label: 'When my guild count changes',
            icon: icon_discord,
            connected: false,
        },
    ]);

    const [menuItemsReaction, setMenuItemsReaction] = useState([
        {
            reaction: 'Spotify',
            label: 'Play sad music',
            icon: icon_spotify,
            connected: false,
        },
        {
            reaction: 'sendEmail',
            label: 'Send an email',
            icon: icon_google,
            connected: false,
        },
        {
            reaction: 'MP',
            label: 'Send a private message',
            icon: icon_discord,
            connected: false,
        },
        {
            reaction: 'Clip',
            label: 'Create a clip',
            icon: icon_twitch,
            connected: false,
        },
        {
            reaction: 'Event',
            label: 'Create an event on Google Calendar',
            icon: icon_google,
            connected: false,
        },
        {
            reaction: 'Issue',
            label: 'Create an issue',
            icon: icon_github,
            connected: false,
        },
        {
            reaction: 'Branch',
            label: 'Create a branch',
            icon: icon_github,
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

    const apiUrl = localStorage.getItem('userInputIP');

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

        const response = await fetch(`${apiUrl}/api/user/me`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const json = await response.json();
        const resultToken = await fetch(`${apiUrl}/api/getToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer${apiUrl} ${Cookies.get('token')}`,
            },
            body: JSON.stringify({
                user_email: json.email,
            }),
        });
        const data = await resultToken.json();
        if (reaction === 'Branch' || reaction === 'Issue') {
            try {
                const response = await fetch(
                    'https://api.github.com/user/orgs',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/vnd.github.v3+json',
                            Authorization: `Bearer ${data[0]['github_token']}`,
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
                        Authorization: `Bearer ${data[0]['github_token']}`,
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
        const response = await fetch(`${apiUrl}/api/user/me`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const json = await response.json();
        const resultToken = await fetch(`${apiUrl}/api/getToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer${apiUrl} ${Cookies.get('token')}`,
            },
            body: JSON.stringify({
                user_email: json.email,
            }),
        });
        const data = await resultToken.json();
        try {
            const orgFetchPromises = orgsUser.map((org) =>
                fetch(`https://api.github.com/orgs/${org.login}/repos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/vnd.github.v3+json',
                        Authorization: `Bearer ${data[0]['github_token']}`,
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
                        Authorization: `Bearer ${data[0]['github_token']}`,
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
            console.error('Failed to fetch repositories :', error);
            return null;
        }
    };

    const orgsVal = (value) => {
        setRepChosen('');
        setRepfinal('');
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
                if (localStorage.getItem('google_token') === 'false') {
                    return false;
                }
                break;
            case 'DiscordUsername':
                if (localStorage.getItem('discord_token') === 'false') {
                    return false;
                }
                break;
            case 'DiscordGuilds':
                if (localStorage.getItem('discord_token') === 'false') {
                    return false;
                }
                break;
            case 'Spotify':
                if (localStorage.getItem('spotify_token') === 'false') {
                    return false;
                }
                break;
            case 'sendEmail':
                if (localStorage.getItem('google_token') === 'false') {
                    return false;
                }
                break;
            case 'Clip':
                if (localStorage.getItem('twitch_token') === 'false') {
                    return false;
                }
                break;
            case 'Event':
                if (localStorage.getItem('google_token') === 'false') {
                    return false;
                }
                break;
            case 'Issue':
                if (localStorage.getItem('github_token') === 'false') {
                    return false;
                }
                break;
            case 'Branch':
                if (localStorage.getItem('github_token') === 'false') {
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

    const handleInput = (field, fieldName, reaction) => {
        return (
            <>
                {
                    reaction === "MP" ? 
                    <TextInput
                        disabled={alreadyExist}
                        radius="md"
                        size="lg"
                        placeholder="Enter your mp"
                        value={field}
                        onChange={(e) => inputChange(id, fieldName, e.target.value)}
                    />
                    : reaction === "Clip" ?
                    <TextInput
                        disabled={alreadyExist}
                        radius="md"
                        size="lg"
                        placeholder="Enter username twitch"
                        value={field}
                        onChange={(e) => inputChange(id, fieldName, e.target.value)}
                    /> 
                    : reaction === "Event" ?
                    <TextInput
                        disabled={alreadyExist}
                        radius="md"
                        size="lg"
                        placeholder="Enter event name"
                        value={field}
                        onChange={(e) => inputChange(id, fieldName, e.target.value)}
                    />
                    : reaction === "Issue" ?
                    <TextInput
                        disabled={alreadyExist}
                        radius="md"
                        size="lg"
                        placeholder="Enter issue name"
                        value={field}
                        onChange={(e) => inputChange(id, fieldName, e.target.value)}
                    />
                    : reaction === "Branch" ?
                    <TextInput
                        disabled={alreadyExist}
                        radius="md"
                        size="lg"
                        placeholder="Enter branch name"
                        value={field}
                        onChange={(e) => inputChange(id, fieldName, e.target.value)}
                    />
                    : reaction === "sendEmail" ?
                    <TextInput
                        disabled={alreadyExist}
                        radius="md"
                        size="lg"
                        placeholder="Enter email message"
                        value={field}
                        onChange={(e) => inputChange(id, fieldName, e.target.value)}
                    />
                    :
                    <TextInput
                        disabled={alreadyExist}
                        radius="md"
                        size="lg"
                        placeholder="Enter username twitch"
                        value={field}
                        onChange={(e) => inputChange(id, fieldName, e.target.value)}
                    />
                }
            </>
        );
    };

    const emailInputChange = (value) => {
        setEmailInput(value);
        setEmailInputFinal(value + ' ');
    };

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
    };

    const idDiscordInputChange = (value) => {
        setIdDiscordInput(value);
        setIdDiscordInputFinal(value + ' ');
    };

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
    };

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
                    radius="md"
                    size="lg"
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

    const existingReaction = (reactInput) => {
        const spaceIndex = reactInput.indexOf(' ');
        if (reaction === 'MP') {
            const idDiscord = reactInput.substring(0, spaceIndex);
            const mess = reactInput.substring(spaceIndex + 1);
            const displayInput =
                'Id Discord: ' + idDiscord + ', Message: ' + mess;
            return (
                <Tooltip label={displayInput}>
                    <div className="alreadyExist">{displayInput}</div>
                </Tooltip>
            );
        } else if (reaction === 'sendEmail') {
            const email = reactInput.substring(0, spaceIndex);
            const mess = reactInput.substring(spaceIndex + 1);
            const displayInput = 'Email: ' + email + ', Message: ' + mess;
            return (
                <Tooltip label={displayInput}>
                    <div className="alreadyExist">{displayInput}</div>
                </Tooltip>
            );
        } else if (reaction === 'Branch' || reaction === 'Issue') {
            const secondSpaceIndex = reactInput.indexOf(' ', spaceIndex + 1);
            const orgUser = reactInput.substring(0, spaceIndex);
            const repos = reactInput.substring(
                spaceIndex + 1,
                secondSpaceIndex
            );
            const name = reactInput.substring(secondSpaceIndex + 1);
            const displayInput =
                'Organisation/User: ' +
                orgUser +
                ', Repos: ' +
                repos +
                ', Name/Title: ' +
                name;
            return (
                <Tooltip label={displayInput}>
                    <div className="alreadyExist">{displayInput}</div>
                </Tooltip>
            );
        } else {
            return (
                <Tooltip label={reactInput}>
                    <div className="alreadyExist">{reactInput}</div>
                </Tooltip>
            );
        }
    };

    const existingArea = () => {
        return (
            <>
                {inputContentAct !== 'Nothing' ? (
                    <Tooltip label={inputContentAct}>
                        <div className="alreadyExist">{inputContentAct}</div>
                    </Tooltip>
                ) : null}
                {inputContentReact !== 'Nothing' &&
                inputContentReact !== undefined
                    ? existingReaction(inputContentReact)
                    : null}
            </>
        );
    };

    return (
        <>
            {hoverText ? <div className="popUp">{hoverText}</div> : <></>}
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
                    <Menu width={220} shadow="md">
                        <Menu.Target>
                            <Button
                                className="button-menu"
                                size="lg"
                                disabled={alreadyExist}
                                ref={buttonRef}
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
                                    >
                                        <Menu.Item
                                            onClick={() =>
                                                setAction(item.action)
                                            }
                                            disabled={
                                                action === item.action ||
                                                !item.connected
                                            }
                                        >
                                            <div className="container-icon">
                                                <img
                                                    src={item.icon}
                                                    className="icon-item"
                                                />
                                                {item.label}
                                            </div>
                                        </Menu.Item>
                                    </div>
                                    {index !== menuItemsAction.length - 1 && (
                                        <MenuDivider />
                                    )}
                                </Fragment>
                            ))}
                        </Menu.Dropdown>
                    </Menu>

                    {alreadyExist ? existingArea() : null}
                    {action === 'Weather' && !alreadyExist
                        ? handleWeather()
                        : null}
                    {action === 'Alerts' && !alreadyExist
                        ? handleAlerts()
                        : null}
                    {action === 'News' && !alreadyExist
                        ? handleInput(inputContentAct, 'inputAction')
                        : null}

                    {(reaction === 'Branch' || reaction == 'Issue') &&
                    !alreadyExist
                        ? handleOrgs()
                        : null}
                    {reaction === 'MP' && !alreadyExist
                        ? handleInputIdDiscord()
                        : null}
                    {reaction === 'sendEmail' && !alreadyExist
                        ? handleInputEmail()
                        : null}
                    {(reaction === 'Branch' || reaction == 'Issue') &&
                    !alreadyExist
                        ? handleRep()
                        : null}
                    {(reaction === 'MP' ||
                        reaction === 'Clip' ||
                        reaction === 'Event' ||
                        reaction === 'Issue' ||
                        reaction === 'Branch' ||
                        reaction === 'sendEmail') &&
                    !alreadyExist
                        ? handleInput(inputContentReact, 'inputReaction', reaction)
                        : null}

                    <Menu width={220} shadow="md">
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
                                            <div className="container-icon">
                                                <img
                                                    src={item.icon}
                                                    className="icon-item"
                                                />
                                                {item.label}
                                            </div>
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
                            idDiscordInputFinal,
                            emailInputFinal,
                            orgfinal,
                            repfinal,
                            inputContentReact,
                            apiUrl
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
