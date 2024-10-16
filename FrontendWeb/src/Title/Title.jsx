import logo_menu from '../assets/menu.png';
import logo_exit from '../assets/exit.png';
import { Menu, MenuDivider } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import './Title.css';
import Cookies from 'cookies-js';
import { browser } from 'globals';

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
                <Menu.Target>
                    <img src={logo_menu} alt="Menu logo" height="30vh" />
                </Menu.Target>
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
    function deleteCookies() {
        Cookies.set('token', '', { expires: -1 });
        Cookies.set('spotify_token', '', { expires: -1 });
        Cookies.set('google_token', '', { expires: -1 });
        Cookies.set('discord_token', '', { expires: -1 });
        Cookies.set('x_token', '', { expires: -1 });

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    return (
        <div>
            <div className="top-part">
                <NavigateMenu />
                <h1>{title}</h1>
                <button className="button-style" onClick={deleteCookies}>
                    <img
                        src={logo_exit}
                        className="logo exit"
                        alt="Exit logo"
                        height="35vh"
                    />
                </button>
            </div>
        </div>
    );
}

export default Title;
