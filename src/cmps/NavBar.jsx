import { Link, NavLink } from "react-router-dom";
import NavBarOptions from "./NavBarOptions";
import logo from "../assets/imgs/logo.png";
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

export default function NavBar() {
    return (
        <section className="nav-bar">
            <Link to="/">
                <img className="nav-bar__logo" src={logo} alt="logo" />
            </Link>

            <NavLink to="/">
                <div className="symbol">
                    <div className="fas fa-home" />
                    <NavBarOptions title="Home" />
                </div>
            </NavLink>

            <NavLink to="/search">
                <div className="symbol">
                    <div className="fas fa-search" />
                    <NavBarOptions title="Search" />
                </div>
            </NavLink>

            <NavLink to="/library">
                <div className="symbol">
                    <div className="fas fa-compact-disc" />
                    <NavBarOptions title="Your Library" />
                </div>
            </NavLink>

            <NavLink to="/station">
                <div className="symbol">
                    <div className="fas fa-plus-square" />
                    <NavBarOptions title="Create Playlist" />
                </div>
            </NavLink>

            <NavLink to="/library">
                <div className="symbol">
                    <div className="fas fa-thumbs-up" />
                    <NavBarOptions title="Liked Songs" />

                </div>
            </NavLink>

            <strong className="nav-bar__title">Playlists</strong>
            <hr />
            <NavBarOptions title="Beyonce" />
            <NavBarOptions title="90's Hits" />
            <NavBarOptions title="Hip-Hop" />
            <NavBarOptions title="Rock" />
        </section>
    );
}
