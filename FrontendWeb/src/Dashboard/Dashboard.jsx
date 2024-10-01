import { useState, useRef, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Menu, Button, TextInput, Tooltip, Modal } from "@mantine/core";
import Title from "../Title";
import "./Dashboard.css";
import logo_plus from "../assets/plus.png";
import logo_cross from "../assets/cross.png";

function ActionReaction() {
    const [selectedActionItem, setSelectedActionItem] = useState("Action ▼");
    const [selectedCity, setSelectedCity] = useState("City ▼");
    const cities = [
        { name: "Paris" },
        { name: "Marseille" },
        { name: "Lyon" },
        { name: "Toulouse" },
        { name: "Nice" },
        { name: "Nantes" },
        { name: "Montpellier" },
        { name: "Strasbourg" },
        { name: "Bordeaux" },
        { name: "Lille" },
    ];

    function TextInputDash() {
        const [isOverflowing, setIsOverflowing] = useState(false);
        const buttonRef = useRef(null);

        useEffect(() => {
            const checkOverflow = () => {
                if (buttonRef.current) {
                    const span = document.createElement("span");
                    span.style.visibility = "hidden";
                    span.style.whiteSpace = "nowrap";
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
        return selectedActionItem === "When it rains" ? (
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
            <TextInput placeholder="Input" radius="md" size="lg" />
        );
    }

    function MenuDashAction({ title }) {
        const [isOverflowing, setIsOverflowing] = useState(false);
        const buttonRef = useRef(null);

        useEffect(() => {
            const checkOverflow = () => {
                if (buttonRef.current) {
                    const span = document.createElement("span");
                    span.style.visibility = "hidden";
                    span.style.whiteSpace = "nowrap";
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
                        </Button>
                    </Tooltip>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item
                        onClick={() => setSelectedActionItem("When it rains")}
                    >
                        When it rains
                    </Menu.Item>
                    <Menu.Item
                        onClick={() =>
                            setSelectedActionItem(
                                "Action numero deux un peu incroyable mais pas trop"
                            )
                        }
                    >
                        Action numero deux un peu incroyable mais pas trop
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => setSelectedActionItem("Action courte")}
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

        useEffect(() => {
            const checkOverflow = () => {
                if (buttonRef.current) {
                    const span = document.createElement("span");
                    span.style.visibility = "hidden";
                    span.style.whiteSpace = "nowrap";
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
                        label={selectedItem}
                        disabled={!isOverflowing}
                        position="bottom"
                        withArrow
                    >
                        <Button
                            className="button-menu"
                            size="lg"
                            ref={buttonRef}
                        >
                            {selectedItem}
                        </Button>
                    </Tooltip>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item
                        onClick={() => setSelectedItem("sad music is played")}
                    >
                        sad music is played
                    </Menu.Item>
                    <Menu.Item
                        onClick={() =>
                            setSelectedItem("Reaction numero deux pour Perrine")
                        }
                    >
                        Reaction numero deux pour Perrine
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => setSelectedItem("Reaction courte")}
                    >
                        Reaction courte
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        );
    }

    return (
        <div className="cont-rect">
            <MenuDashAction title="Action ▼" />
            <TextInputDash />
            <MenuDashReaction title="Reaction ▼" />
        </div>
    );
}

function RectangleDashboard({ id, onRemove }) {
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
            <ActionReaction />
            <Button className="button-cross" onClick={open}>
                <img src={logo_cross} width={35} height={35}></img>
            </Button>
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
    const [areas, setAreas] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);

    const addNewArea = () => {
        const newArea = {
            id: areas.length + 1,
        };
        setAreas([...areas, newArea]);
    };

    const removeArea = (id) => {
        setAreas((prevAreas) => prevAreas.filter((area) => area.id !== id));
    };

    return (
        <div className="dashboard">
            <div className="all-container">
                <Title title="Dashboard" />
                <div className="container">
                    <div className="back-rectangle">
                        <div className="column-container">
                            {areas.map((area) => (
                                <div key={area.id}>
                                    <RectangleDashboard
                                        id={area.id}
                                        onRemove={removeArea}
                                    />
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
