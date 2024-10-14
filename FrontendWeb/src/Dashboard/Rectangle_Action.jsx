import { useState, useRef } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
    Menu,
    Button,
    TextInput,
    Modal,
    MenuDivider,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import './Dashboard.css';
import logo_cross from '../assets/cross.png';
import { applyActions, applyReactions } from './Action_Reaction';


const applyAcRea = async (action, reaction, input, cityInput) => {
    console.log("Apply!!");

    const finalInput = action === "Email" ? input : cityInput;

    if (action !== "Action" && reaction !== "Reaction") {
        const dataAction = await applyActions(action, finalInput);

        if (dataAction) {
            applyReactions(reaction);
        }
    }
};


function RectangleDashboard({ id, onRemove, input, inputChange }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [action, setAction] = useState('Action');
    const [reaction, setReaction] = useState('Reaction');
    const [choseCity, setChoseCity] = useState('City');
    const buttonRef = useRef(null);

    const handleRemove = () => {
        onRemove(id);
        close();
    };

    const setSelectedCity = (cityName) => {
        setChoseCity(cityName);
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
                <Menu width={200} shadow="md">
                    <Menu.Target>
                            <Button
                                className="button-menu"
                                size="lg"
                                ref={buttonRef}
                            >
                                {choseCity}
                                <IconChevronDown size={16} />
                            </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        {cities.map((city, index) => (
                            <div key={index}>
                                <Menu.Item
                                    onClick={() => setSelectedCity(city.name)}
                                >
                                    {city.name}
                                </Menu.Item>
                                <MenuDivider />
                            </div>
                        ))}
                    </Menu.Dropdown>
                </Menu>
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
                            <Menu.Item onClick={() => setAction('Weather')}>
                                When it rains
                            </Menu.Item>
                            <MenuDivider />
                            <Menu.Item onClick={() => setAction('Email')}>
                                When I recieve an email
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    {action === 'Weather' ? (
                        handleWeather()
                    ) : (
                        action === 'Action' ? (
                            <></>
                        ) : (
                            handleInput()
                        )
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
                    applyAcRea(action, reaction, input, choseCity)
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
