import { useState, useRef } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
    Menu,
    Button,
    TextInput,
    Modal,
    MenuDivider,
    Select
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import './Dashboard.css';
import logo_cross from '../assets/cross.png';
import { applyActions, applyReactions } from './Action_Reaction';
import Cookies from 'cookies-js';

const applyAcRea = async (action, reaction, inputAction, inputReaction) => {
    fetch('http://localhost:8080/api/setArea', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
    /*if (action !== 'Action' && reaction !== 'Reaction') {
        const forJson = input;
        const dataAction = await applyActions(action, forJson);

        if (dataAction) {
            applyReactions(reaction, contentReact);
        }
    }*/
};

function RectangleDashboard({ id, onRemove, contentAct, contentReact, inputChange }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [action, setAction] = useState('Action');
    const [reaction, setReaction] = useState('Reaction');
    const buttonRef = useRef(null);

    const handleRemove = () => {
        onRemove(id, action, reaction, input, '');
        close();
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
                    value={contentAct}
                    onChange={(value) => inputChange(id, 'contentAct', value)}
                    data={cities.map((city) => ({ value: city.name, label: city.name }))}
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
                    value={contentAct}
                    onChange={(value) => inputChange(id, 'contentAct', value)}
                    data={cities.map((city) => ({ value: city.name, label: city.name }))}
                />
            </>
        );
    };

    return (
        <>
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
                            <Menu.Item onClick={() => changeActions('Weather')}>
                                When it rains
                            </Menu.Item>
                            <MenuDivider />
                            <Menu.Item onClick={() => changeActions('Email')}>
                                When I receive an email
                            </Menu.Item>
                            <MenuDivider />
                            <Menu.Item onClick={() => changeActions('Alerts')}>
                                When it is alerts
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    {action === 'Weather' ? handleWeather() : null}
                    {action === 'Alerts' ? handleAlerts() : null}
                    {action === 'Email' ? handleInput(contentAct, 'contentAct') : null}
                    {reaction === 'Tweet' || reaction === "MP" ? handleInput(contentReact, 'contentReact') : null}

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
                            <Menu.Item onClick={() => changeReactions('Spotify')}>
                                sad music is played
                            </Menu.Item>
                            <MenuDivider />
                            <Menu.Item onClick={() => changeReactions('sendEmail')}>
                                send an email
                            </Menu.Item>
                            <MenuDivider />
                            <Menu.Item onClick={() => changeReactions('Tweet')}>
                                tweet your input
                            </Menu.Item>
                            <MenuDivider />
                            <Menu.Item onClick={() => changeReactions('MP')}>
                                send a mp
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                </div>
                <button className="button-cross" onClick={open}>
                    <img src={logo_cross} width={35} height={35} alt="cross"/>
                </button>
            </div>

            <Button
                className="button-correct"
                onClick={() =>
                    applyAcRea(action, reaction, contentAct, contentReact)
                }
            >
                Apply
            </Button>
        </>
    );
}

export default RectangleDashboard;
