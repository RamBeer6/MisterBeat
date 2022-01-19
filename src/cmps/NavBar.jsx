import NavBarOptions from "./NavBarOptions";
import logo from "../assets/imgs/logo.png";
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

export default function NavBar() {
    return (
        <section className="nav-bar">
            <img className="nav-bar__logo" src={logo} alt="logo" />
            <div className="symbol">
                <div className="fas fa-home" />
                <NavBarOptions title="Home" />
            </div>
            <div className="symbol">
                <div className="fas fa-search" />
                <NavBarOptions title="Search" />
            </div>
            <div className="symbol">
                <div className="library-symbol">||\</div>
                <NavBarOptions title="Your Library" />
            </div>
            <strong className="nav-bar__title">Playlists</strong>
            <hr />
        </section>
    );
}
