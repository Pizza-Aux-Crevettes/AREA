import { useState, useRef, Fragment, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
    Menu,
    Button,
    TextInput,
    Modal,
    MenuDivider,
    Select,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import './Dashboard.css';
import logo_cross from '../assets/cross.png';
import Cookies from 'cookies-js';

const applyAcRea = async (action, reaction, inputAction, inputReaction) => {
    fetch('http://localhost:8080/api/setArea', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`,
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
        })
        .catch((error) => {
            console.error(error);
        });
};

function RectangleDashboard({
    id,
    onRemove,
    contentAct,
    contentReact,
    inputChange,
    inputContentAct,
    inputContentReact,
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
    ]);

    const [menuItemsReaction, setMenuItemsReaction] = useState([
        { reaction: 'Spotify', label: 'Sad music is played', connected: false },
        { reaction: 'sendEmail', label: 'Send an email', connected: false },
        { reaction: 'MP', label: 'Send a mp', connected: false },
        { reaction: 'Clip', label: 'Create a Twitch clip', connected: false },
        { reaction: 'Event', label: 'Create a Event on Google Calendar', connected: false },
    ]);

    const [hoverText, setHoverText] = useState('');

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
            case 'Email':
                text = 'Please log in to google';
                break;
            case 'DiscordUsername':
                text = 'Please log in to discord';
                break;
            case 'Spotify':
                text = 'Please log in to spotify';
                break;
            case 'sendEmail':
                text = 'Please log in to Google';
                break;
            case 'Clip':
                text = 'Please log in to Twitch';
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
                    radius="md"
                    size="lg"
                    placeholder="Enter your input"
                    value={field}
                    onChange={(e) => inputChange(id, fieldName, e.target.value)}
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
                    {action === 'News' ? handleInput(inputContentAct, 'inputAction') : null}

                    {reaction === 'MP' || reaction === 'Clip' || reaction === 'Event'
                        ? handleInput(inputContentReact, 'inputReaction')
                        : null}

                    <Menu width={200} shadow="md">
                        <Menu.Target>
                            <Button
                                className="button-menu"
                                size="lg"
                                ref={buttonRef}
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
                                                setReaction(item.reaction)
                                            }
                                            disabled={
                                                action === item.reaction ||
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
                </div>
                <button className="button-cross" onClick={open}>
                    <img src={logo_cross} width={35} height={35} alt="cross" />
                </button>
            </div>

            <Button
                className="button-correct"
                onClick={() =>
                    applyAcRea(
                        action,
                        reaction,
                        inputContentAct,
                        inputContentReact
                    )
                }
            >
                Apply
            </Button>
        </>
    );
}

export default RectangleDashboard;
