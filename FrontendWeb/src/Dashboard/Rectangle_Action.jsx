import { useState, useRef, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
    Menu,
    Button,
    TextInput,
    Tooltip,
    Modal,
    MenuDivider,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import Title from '../Title/Title';
import './Dashboard.css';
import logo_plus from '../assets/plus.png';
import logo_cross from '../assets/cross.png';
import Cookies from 'cookies-js';
import {applyActions, applyReactions} from './Action_Reaction';


const applyAcRea = async (action, reaction, input) => {
    console.log("Apply!!")
    if (action !== "Action" && reaction !== "Reaction") {
        const forJson = input;
        const dataAction = await applyActions(action, forJson);

        if (dataAction) {
            applyReactions(reaction);
        }
    }
};

function RectangleDashboard({ id, onRemove, input, inputChange, actionReaction }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [action, setAction] = useState('Action');
    const [reaction, setReaction] = useState('Reaction');
    const [isOverflowing, setIsOverflowing] = useState(false);
    const buttonRef = useRef(null);

    const handleRemove = () => {
        onRemove(id);
        close();
    };

    const handleWeather = () => {

        return (
            <>
                <select
                    value={input}
                    onChange={(e) => inputChange(id, e.target.value)}
                >
                    <option value="" disabled hidden>Cities</option>
                    <option value='Paris'>Paris</option>
                    <option value='Marseille'>Marseille</option>
                    <option value='Lyon'>Lyon</option>
                    <option value='Toulouse'>Toulouse</option>
                    <option value='Nice'>Nice</option>
                    <option value='Nantes'>Nantes</option>
                    <option value='Montpellier'>Montpellier</option>
                    <option value='Strasbourg'>Strasbourg</option>
                    <option value='Bordeaux'>Bordeaux</option>
                    <option value='Lille'>Lille</option>
                </select>
            </>
        )
    }

    const handleInput = (type, input) => {
        return (
            <>
                <input
                    placeholder={type}
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
                <Menu width={200} shadow="md">
                    <Menu.Target>
                        <Tooltip
                            label={action}
                            disabled={!isOverflowing}
                            position="bottom"
                            withArrow
                        >
                            <Button
                                className="button-menu"
                                size="lg"
                                ref={buttonRef}
                            >
                                {action}
                                <IconChevronDown size={16} />
                            </Button>
                        </Tooltip>
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
                ) : (<></>)}

                <Menu width={200} shadow="md">
                    <Menu.Target>
                        <Tooltip
                            label={reaction}
                            disabled={!isOverflowing}
                            position="bottom"
                            withArrow
                        >
                            <Button
                                className="button-menu"
                                size="lg"
                                ref={buttonRef}
                            >
                                {reaction}
                                <IconChevronDown size={16} />
                            </Button>
                        </Tooltip>
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
                {/* <ActionReaction
                setActionReaction={setActionReaction}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
            /> */}
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
                    applyAcRea()
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
