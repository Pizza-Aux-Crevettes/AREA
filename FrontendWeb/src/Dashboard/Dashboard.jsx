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
//import playPreview from "../ServiceConnection/ServiceConnection";
import './Dashboard.css';
import logo_plus from '../assets/plus.png';
import logo_cross from '../assets/cross.png';
import Cookies from 'cookies-js';

const getGmailMsg = async (token) => {
    try {
        const response = await fetch('http://localhost:3000/api/gmail/msg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
            }),
        });
        const data = await response.json();
        if (data.msg === 'Not new emails') {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.log(error);
    }
};

const SendEmail = async (token, dest) => {
    try {
        const response = await fetch('http://localhost:3000/api/gmail/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                dest: dest,
            }),
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

const getWeather = async (forJson) => {
    try {
        const response = await fetch('http://localhost:3000/api/Weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                forJson,
            }),
        });
        const res = await response.json();
        return res;
    } catch (error) {
        console.log(error);
    }
};

const playPreview = async () => {
    const response = await fetch(
        `https://api.spotify.com/v1/tracks/5Qnrgqy1pAm9GyNQOgyVFz`,
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('spotify_token')}`,
            },
        }
    );
    const data = await response.json();
    const previewUrl = data.preview_url;
    console.log(previewUrl);

    if (previewUrl) {
        const audio = new Audio(previewUrl);
        audio.play();
    } else {
        console.log('No preview available for this song.');
    }
};

function ActionReaction({ setActionReaction, selectedCity, setSelectedCity }) {
    const [selectedActionItem, setSelectedActionItem] = useState('Action');
    const [selectedReactionItem, setSelectedReactionItem] = useState('Action');
    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };
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

    function TextInputDash() {
        const [isOverflowing, setIsOverflowing] = useState(false);
        const buttonRef = useRef(null);

        useEffect(() => {
            const checkOverflow = () => {
                if (buttonRef.current) {
                    const span = document.createElement('span');
                    span.style.visibility = 'hidden';
                    span.style.whiteSpace = 'nowrap';
                    span.style.font = window.getComputedStyle(
                        buttonRef.current
                    ).font;
                    span.textContent = selectedActionItem;

                    document.body.appendChild(span);
                    const textWidth = span.scrollWidth;
                    document.body.removeChild(span);

                    const buttonWidth = buttonRef.current.clientWidth;
                    const isOverflowing = textWidth > buttonWidth;

                    setIsOverflowing(isOverflowing);
                }
            };
            checkOverflow();
        }, [selectedCity]);
        return selectedActionItem === 'Weather' ? (
            <Menu>
                <Menu.Target>
                    <Tooltip
                        label={selectedCity}
                        disabled={!isOverflowing}
                        position="bottom"
                        withArrow
                    >
                        <Button
                            className="button-menu"
                            size="lg"
                            ref={buttonRef}
                        >
                            {selectedCity}
                            <IconChevronDown size={16} />
                        </Button>
                    </Tooltip>
                </Menu.Target>
                <Menu.Dropdown>
                    {cities.map((city, index) => (
                        <div key={index}>
                            <Menu.Item
                                onClick={() => setSelectedCity(city.name)}
                            >
                                {city.name}
                            </Menu.Item>
                        </div>
                    ))}
                </Menu.Dropdown>
            </Menu>
        ) : (
            <TextInput
                placeholder="Input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                radius="md"
                size="lg"
            />
        );
    }

    function MenuDashAction({ title }) {
        const [isOverflowing, setIsOverflowing] = useState(false);
        const buttonRef = useRef(null);

        const handleClick = (action) => {
            setSelectedActionItem(action);
            setActionReaction((prevState) => ({
                ...prevState,
                action: action,
            }));
        };

        useEffect(() => {
            const checkOverflow = () => {
                if (buttonRef.current) {
                    const span = document.createElement('span');
                    span.style.visibility = 'hidden';
                    span.style.whiteSpace = 'nowrap';
                    span.style.font = window.getComputedStyle(
                        buttonRef.current
                    ).font;
                    span.textContent = selectedActionItem;

                    document.body.appendChild(span);
                    const textWidth = span.scrollWidth;
                    document.body.removeChild(span);

                    const buttonWidth = buttonRef.current.clientWidth;
                    const isOverflowing = textWidth > buttonWidth;

                    setIsOverflowing(isOverflowing);
                }
            };
            checkOverflow();
        }, [selectedActionItem]);

        return (
            <Menu width={200} shadow="md">
                <Menu.Target>
                    <Tooltip
                        label={selectedActionItem}
                        disabled={!isOverflowing}
                        position="bottom"
                        withArrow
                    >
                        <Button
                            className="button-menu"
                            size="lg"
                            ref={buttonRef}
                        >
                            {selectedActionItem}
                            <IconChevronDown size={16} />
                        </Button>
                    </Tooltip>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item onClick={() => handleClick('Weather')}>
                        When it rains
                    </Menu.Item>
                    <MenuDivider />
                    <Menu.Item onClick={() => handleClick('Email')}>
                        When I recieve an email
                    </Menu.Item>
                    <MenuDivider />
                    <Menu.Item
                        onClick={() => setSelectedActionItem('Action courte')}
                    >
                        Action courte
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        );
    }
    function MenuDashReaction({ title }) {
        const [selectedItem, setSelectedItem] = useState(title);
        const [isOverflowing, setIsOverflowing] = useState(false);
        const buttonRef = useRef(null);

        const handleClick = (reaction) => {
            setSelectedReactionItem('sad music is played');
            setActionReaction((prevState) => ({
                ...prevState,
                reaction: reaction,
            }));
        };

        useEffect(() => {
            const checkOverflow = () => {
                if (buttonRef.current) {
                    const span = document.createElement('span');
                    span.style.visibility = 'hidden';
                    span.style.whiteSpace = 'nowrap';
                    span.style.font = window.getComputedStyle(
                        buttonRef.current
                    ).font;
                    span.textContent = selectedItem;

                    document.body.appendChild(span);
                    const textWidth = span.scrollWidth;
                    document.body.removeChild(span);

                    const buttonWidth = buttonRef.current.clientWidth;
                    const isOverflowing = textWidth > buttonWidth;

                    setIsOverflowing(isOverflowing);
                }
            };
            checkOverflow();
        }, [selectedItem]);

        return (
            <Menu width={200} shadow="md">
                <Menu.Target>
                    <Tooltip
                        label={selectedReactionItem}
                        disabled={!isOverflowing}
                        position="bottom"
                        withArrow
                    >
                        <Button
                            className="button-menu"
                            size="lg"
                            ref={buttonRef}
                        >
                            {selectedReactionItem}
                            <IconChevronDown size={16} />
                        </Button>
                    </Tooltip>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item onClick={() => handleClick('Spotify')}>
                        sad music is played
                    </Menu.Item>
                    <MenuDivider />
                    <Menu.Item
                        onClick={() => setSelectedReactionItem('sendEmail')}
                    >
                        send an email
                    </Menu.Item>
                    <MenuDivider />
                    <Menu.Item
                        onClick={() =>
                            setSelectedReactionItem('Reaction courte')
                        }
                    >
                        Reaction courte
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        );
    }

    return (
        <div className="cont-rect">
            <MenuDashAction title="Action" />
            <TextInputDash />
            <MenuDashReaction title="Reaction" />
        </div>
    );
}

const applyActions = async (action, forJson) => {
    const google_token = Cookies.get('google_token');

    if (action === 'Email' && google_token !== '') {
        const data = await getGmailMsg(google_token);
        return data;
    } else if (action === 'Weather') {
        const res = await getWeather(forJson);
        return res;
    } else {
        return false;
    }
};

const applyReactions = (reaction) => {
    const google_token = Cookies.get('google_token');
    if (reaction === 'Spotify') {
        playPreview();
    } else if (reaction === 'sendEmail') {
        SendEmail(google_token, '');
    }
    return;
};

const applyAcRea = async (actionReaction, selectedCity) => {
    const forJson = selectedCity;

    const dataAction = await applyActions(actionReaction.action, forJson);

    if (dataAction) {
        applyReactions(actionReaction.reaction);
    }
};

function RectangleDashboard({
    id,
    onRemove,
    setActionReaction,
    selectedCity,
    setSelectedCity,
}) {
    const [opened, { open, close }] = useDisclosure(false);

    const handleRemove = () => {
        onRemove(id);
        close();
    };

    return (
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
            <ActionReaction
                setActionReaction={setActionReaction}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
            />
            <button className="button-cross" onClick={open}>
                <img src={logo_cross} width={35} height={35}></img>
            </button>
        </div>
    );
}

function AddRectangle({ addNewArea }) {
    return (
        <div>
            <Button className="rectangle-add" onClick={addNewArea}>
                <img src={logo_plus} alt="Add new area" width={50} />
            </Button>
        </div>
    );
}

function Dashboard() {
    const [areas, setAreas] = useState([
        { id: 1, buttonText: 'Apply' },
        { id: 2, buttonText: 'Apply' },
        { id: 3, buttonText: 'Apply' },
    ]);
    const [actionReaction, setActionReaction] = useState({
        action: '',
        reaction: '',
    });
    const [selectedCity, setSelectedCity] = useState('City');

    const addNewArea = () => {
        const maxId =
            areas.length > 0 ? Math.max(...areas.map((area) => area.id)) : 0;
        const newArea = { id: maxId + 1, buttonText: 'Apply' };
        setAreas([...areas, newArea]);
    };

    const handleApplyClick = (id) => {
        setAreas((prevAreas) =>
            prevAreas.map((area) =>
                area.id === id
                    ? {
                          ...area,
                          buttonText:
                              area.buttonText === 'Apply' ? '■ Stop' : 'Apply',
                      }
                    : area
            )
        );

        const area = areas.find((area) => area.id === id);
        if (area.buttonText === 'Apply') {
            applyAcRea(actionReaction, selectedCity);
        }
    };

    const handleStopArea = (id) => {
        setAreas((prevAreas) =>
            prevAreas.map((area) =>
                area.id === id ? { ...area, buttonText: 'Apply' } : area
            )
        );
    };

    const removeArea = (id) => {
        setAreas((prevAreas) => prevAreas.filter((area) => area.id !== id));
    };

    function StopArea({ areaId, onConfirm }) {
        const [opened, setOpened] = useState(false);

        const handleCloseModal = () => setOpened(false);
        const handleConfirm = () => {
            onConfirm(areaId);
            setOpened(false);
        };

        return (
            <>
                <Button
                    className="button-correct"
                    onClick={() => setOpened(true)}
                >
                    ■ Stop
                </Button>

                <Modal
                    opened={opened}
                    onClose={handleCloseModal}
                    title="Stopping area"
                    centered
                >
                    <p>Are you sure you want to stop this area?</p>
                    <Button onClick={handleConfirm}>Yes</Button>
                </Modal>
            </>
        );
    }

    return (
        <div className="dashboard">
            <div className="all-container">
                <Title title="Dashboard" />
                <div className="container">
                    <div className="back-rectangle">
                        <div className="column-container">
                            {areas.map((area) => (
                                <div key={area.id} className="row_container">
                                    <RectangleDashboard
                                        id={area.id}
                                        onRemove={removeArea}
                                        setActionReaction={setActionReaction}
                                        selectedCity={selectedCity}
                                        setSelectedCity={setSelectedCity}
                                    />

                                    {area.buttonText === '■ Stop' ? (
                                        <StopArea
                                            areaId={area.id}
                                            onConfirm={handleStopArea}
                                        />
                                    ) : (
                                        <Button
                                            className="button-correct"
                                            onClick={() =>
                                                handleApplyClick(area.id)
                                            }
                                        >
                                            {area.buttonText}
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <AddRectangle addNewArea={addNewArea} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
