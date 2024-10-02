import logo_menu from "../assets/menu.png";
import logo_exit from "../assets/exit.png";
import { Menu, MenuDivider } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import "./Title.css";
import Cookies from "cookies-js";

function NavigateMenu () {
    const navigate = useNavigate();
    const location = useLocation();

    function goToDashboard() {
        navigate("/");
        location.pathname === "/";
    }

    function goToService() {
        navigate("/Service");
        location.pathname === "/Service";
    }

    return (
        <div>
            <Menu width={200} shadow="md">
                <Menu.Target>
                    <img
                        src={logo_menu}
                        alt="Menu logo"
                        height="30vh"
                    />
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item
                        onClick={goToDashboard}>
                        Dashboard
                    </Menu.Item>
                    <MenuDivider />
                    <Menu.Item
                        onClick={goToService}>
                        Service Connection
                    </Menu.Item>
                </Menu.Dropdown>
                </Menu>
        </div>
    )
}


function Title({ title }) {
    function deleteCookies() {
        console.log("oui");
        Cookies.set("token", "", { expires: -1 });
        window.location.reload();
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
