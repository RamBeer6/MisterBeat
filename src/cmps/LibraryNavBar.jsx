import { NavLink } from "react-router-dom";
import { User } from "./User";


export function LibraryNavBar() {
    return (
        <section className="library-nav-bar">
            <nav className="nav-bar-container flex">

                <li className="nav-option-options">
                    <h4>Playlists</h4>
                </li>

                <li className="nav-option-options">
                    <h4>Artists</h4>
                </li>

                <li className="nav-option-options">
                    <h4>Albums</h4>
                </li>
                <User />
            </nav>
        </section>
    );
}
