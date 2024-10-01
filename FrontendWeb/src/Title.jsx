import logo_menu from "./assets/menu.png";
import logo_exit from "./assets/exit.png";
import "./Title.css";
import Cookies from "cookies-js";

function Title({ title }) {
    function deleteCookies() {
        console.log("oui");
        Cookies.set("token", "", { expires: -1 });
        window.location.reload();
    }
    return (
        <div>
            <div className="top-part">
                <button className="button-style">
                    <img
                        src={logo_menu}
                        className="logo menu"
                        alt="Menu logo"
                        height="30vh"
                    />
                </button>
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
