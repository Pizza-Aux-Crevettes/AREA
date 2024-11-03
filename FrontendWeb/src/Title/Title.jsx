import { Menu, MenuDivider, MenuItem, Tooltip } from '@mantine/core';
import { IconSettings, IconMenu2 } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Title.css';
import Cookies from 'cookies-js';
import { browser } from 'globals';
import { useEffect, useState } from 'react';

function Parameters({ apiUrl }) {
    const navigate = useNavigate();

    function deleteCookies() {
        Cookies.set('token', '', { expires: -1 });
        localStorage.removeItem('spotify_token');
        localStorage.removeItem('google_token');
        localStorage.removeItem('discord_token');
        localStorage.removeItem('twitch_token');
        localStorage.removeItem('github_token');
        localStorage.removeItem('twitch_refresh');
        localStorage.removeItem('spotify_refresh');
        localStorage.removeItem('google_refresh');
        localStorage.removeItem('discord_refresh');
        navigate('/');
        setTimeout(() => {
            window.location.reload();
        }, 50);
    }

    const toggleFont = () => {
        fetch(`${apiUrl}/api/setAdaptabilityUser`, {
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
                console.error('Error during POST request :', error);
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

    function goToDownload() {
        navigate('/DownloadAPK');
        location.pathname === '/DownloadAPK';
    }

    function ChangeIpAdress() {
        const userInput = window.prompt(
            'Please enter an IP address :',
            `${localStorage.getItem('userInputIP')}`
        );
        if (userInput !== null) {
            localStorage.setItem('userInputIP', userInput);
        }
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
                    <MenuDivider />
                    <Menu.Item onClick={goToDownload}>Download apk</Menu.Item>
                    <MenuDivider />
                    <Menu.Item onClick={ChangeIpAdress}>
                        Change IP address
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    );
}

function Title({ title }) {
    const apiUrl = localStorage.getItem('userInputIP');

    useEffect(() => {});
    return (
        <div>
            <div className="top-part">
                <NavigateMenu />
                <h1>{title}</h1>
                <Parameters apiUrl={apiUrl} />
            </div>
        </div>
    );
}

export default Title;
