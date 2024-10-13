const getGmailMsg = async (token) => {
    try {
        const response = await fetch('http://localhost:8080/api/gmail/msg', {
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
        const response = await fetch('http://localhost:8080/api/Weather', {
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

    if (previewUrl) {
        const audio = new Audio(previewUrl);
        audio.play();
    } else {
        console.log('No preview available for this song.');
    }
};


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
        SendEmail(google_token, "anast.bouby@icloud.com");
    }
    return;
};

function ActionReaction({ setActionReaction, selectedCity, setSelectedCity }) {
    const [selectedActionItem, setSelectedActionItem] = useState('Action');
    const [selectedReactionItem, setSelectedReactionItem] = useState('Reaction');
    const [input, setInput] = useState('');

    function TextInputDash() {
        const [isOverflowing, setIsOverflowing] = useState(false);
        const buttonRef = useRef(null);

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
            <div />
        );
    }


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

    function MenuDashAction({ }) {
        const [isOverflowing, setIsOverflowing] = useState(false);
        const buttonRef = useRef(null);

        const handleClick = (action) => {
            setSelectedActionItem(action);
            setActionReaction((prevState) => ({
                ...prevState,
                action: action,
            }));
        };

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
                </Menu.Dropdown>
            </Menu>
        );
    }

    function MenuDashReaction({ }) {
        const [selectedItem, setSelectedItem] = useState("Reaction");
        const [isOverflowing, setIsOverflowing] = useState(false);
        const buttonRef = useRef(null);

        const handleClick = (reaction) => {
            setSelectedReactionItem(reaction);
            setActionReaction((prevState) => ({
                ...prevState,
                reaction: reaction,
            }));
        };

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
                        onClick={() => handleClick('sendEmail')}
                    >
                        send an email
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        );
    }

    return (
        <div className="cont-rect">
            <MenuDashAction />
            {/* <TextInputDash /> */}
            <MenuDashReaction />
        </div>
    );
}