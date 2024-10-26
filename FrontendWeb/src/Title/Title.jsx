import { Menu, MenuDivider, MenuItem, Tooltip } from '@mantine/core';
import { IconSettings, IconMenu2 } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Title.css';
import Cookies from 'cookies-js';
import { browser } from 'globals';

function Parameters() {
    const navigate = useNavigate();
    const location = useLocation();
    function deleteCookies() {
        Cookies.set('token', '', { expires: -1 });
        Cookies.set('spotify_token', '', { expires: -1 });
        Cookies.set('google_token', '', { expires: -1 });
        Cookies.set('discord_token', '', { expires: -1 });
        Cookies.set('twitch_token', '', { expires: -1 });
        Cookies.set('twitch_refresh', '', { expires: -1 });
        Cookies.set('spotify_refresh', '', { expires: -1 });
        Cookies.set('google_refresh', '', { expires: -1 });
        Cookies.set('discord_refresh', '', { expires: -1 });

        navigate('/');
        setTimeout(() => {
            window.location.reload();
        }, 50);
    }

    const toggleFont = () => {
        fetch('http://localhost:8080/api/setAdaptabilityUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify({
                token: Cookies.get('token'),
            }),
        })
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.error('Erreur lors de la requête POST:', error);
            });
    };

    return (
        <div>
            <Menu width={200} shadow="md">
                <Tooltip label="Parameters" position="left">
                    <Menu.Target className="button-style">
                        <IconSettings size={45} color="black" />
                    </Menu.Target>
                </Tooltip>
                <Menu.Dropdown>
                    <Menu.Item onClick={deleteCookies}>Log out</Menu.Item>
                    <MenuDivider />
                    <MenuItem onClick={toggleFont}>Dislexic font</MenuItem>
                </Menu.Dropdown>
            </Menu>
        </div>
    );
}

function NavigateMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    function goToDashboard() {
        navigate('/');
        location.pathname === '/';
    }

    function goToService() {
        navigate('/service');
        location.pathname === '/service';
    }

    return (
        <div>
            <Menu width={200} shadow="md">
                <Tooltip label="Navigate" position="right">
                    <Menu.Target className="button-style">
                        <IconMenu2 size={45} color="black" />
                    </Menu.Target>
                </Tooltip>
                <Menu.Dropdown>
                    <Menu.Item onClick={goToDashboard}>Dashboard</Menu.Item>
                    <MenuDivider />
                    <Menu.Item onClick={goToService}>
                        Service Connection
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    );
}

function Title({ title }) {
    return (
        <div>
            <div className="top-part">
                <NavigateMenu />
                <h1>{title}</h1>
                <Parameters />
            </div>
        </div>
    );
}

export default Title;
