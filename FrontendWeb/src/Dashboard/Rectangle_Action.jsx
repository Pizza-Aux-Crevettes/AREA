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


const applyAcRea = async (action, reaction, input) => {
    console.log(input);

    if (action !== "Action" && reaction !== "Reaction") {
        const dataAction = await applyActions(action, input);

        if (dataAction) {
            applyReactions(reaction);
        }
    }
};

function RectangleDashboard({ id, onRemove, input, inputChange }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [action, setAction] = useState('Action');
    const [reaction, setReaction] = useState('Reaction');
    const buttonRef = useRef(null);

    const handleRemove = () => {
        onRemove(id);
        close();
    };

    const changeActions = (action) => {
        setAction(action);
        inputChange(id, '');
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
                    placeholder="City"
                    value={input}
                    onChange={(value) => inputChange(id, value)}
                    data={cities.map((city) => ({ value: city.name, label: city.name }))}
                />
            </>
        )
    }

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
                    value={input}
                    onChange={(value) => inputChange(id, value)}
                    data={cities.map((city) => ({ value: city.name, label: city.name }))}
                />
            </>
        )
    }

    const handleInput = () => {
        return (
            <>
                <TextInput
                    radius="md"
                    size="lg"
                    placeholder={"Enter your input"}
                    value={input}
                    onChange={(e) => inputChange(id, e.target.value)}
                />
            </>
        )
    }

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
                <div className='cont-rect'>
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
                                When I recieve an email
                            </Menu.Item>
                            <MenuDivider />
                            <Menu.Item onClick={() => changeActions('Alerts')}>
                                When it is alerts
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    {action === 'Alerts' ? (
                        handleAlerts()
                    ) : (<></>)}
                    {action === 'Weather' ? (
                        handleWeather()
                    ) : (
                        action === 'Email' ? (
                            handleInput()
                        ) : (<></>)
                    )}

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
                            <Menu.Item onClick={() => setReaction('Spotify')}>
                                sad music is played
                            </Menu.Item>
                            <MenuDivider />
                            <Menu.Item
                                onClick={() => setReaction('sendEmail')}
                            >
                                send an email
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
                <button className="button-cross" onClick={open}>
                    <img src={logo_cross} width={35} height={35}></img>
                </button>
            </div>
            {/* {area.buttonText === '■ Stop' ? (
                                        <StopArea
                                            areaId={area.id}
                                            onConfirm={handleStopArea}
                                        />
                                    ) : ( */}
            <Button
                className="button-correct"
                onClick={() =>
                    applyAcRea(action, reaction, input)
                }
            >
                Apply
                {/* {area.buttonText} */}
            </Button>
            {/* )} */}
        </>
    );
}

export default RectangleDashboard;
