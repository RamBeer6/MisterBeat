import { Link, NavLink } from 'react-router-dom';
import NavBarOptions from './NavBarOptions';
import logo from '../assets/imgs/logo.png';
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

export default function NavBar() {
  return (
    <nav className='nav-bar'>
      <Link to='/'>
        <img className='nav-bar__logo' src={logo} alt='logo' />
      </Link>

      <ul className='nav-bar-list'>
        <NavLink to='/' className='active-option'>
          <li>
            <div className='symbol fas fa-home' />
            <NavBarOptions title='Home' />
          </li>
        </NavLink>

        <NavLink to='/search' className='active-option'>
          <li>
            <div className='symbol fas fa-search' />
            <NavBarOptions title='Search' />
          </li>
        </NavLink>

        <NavLink to='/library' className='active-option'>
          <li>
            <div className='symbol fas fa-compact-disc' />
            <NavBarOptions title='Your Library' />
          </li>
        </NavLink>

<<<<<<< HEAD
                <NavLink to="/station/create" className="active-option">
                    <li>
                        <div className="symbol fas fa-plus-square" />
                        <NavBarOptions title="Create Playlist" />
                    </li>
                </NavLink>
=======
        <NavLink to='/station' className='active-option'>
          <li>
            <div className='symbol fas fa-plus-square' />
            <NavBarOptions title='Create Playlist' />
          </li>
        </NavLink>
>>>>>>> e264da18000054a7a700791a56f0cddbad7dc338

        <NavLink to='/likedSongs' className='active-option'>
          <li className='liked'>
            <div className='symbol fas fa-thumbs-up' />
            <NavBarOptions title='Liked Songs' />
          </li>
        </NavLink>
      </ul>

      <strong className='nav-bar__title'>Playlists</strong>
      <hr />
      <li>
        <NavBarOptions title='Beyonce' />
      </li>
      <li>
        <NavBarOptions title="90's Hits" />
      </li>
      <li>
        <NavBarOptions title='Hip-Hop' />
      </li>
      <li>
        <NavBarOptions title='Rock' />
      </li>
    </nav>
  );
}
