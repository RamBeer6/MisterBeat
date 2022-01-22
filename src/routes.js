import { WelcomePage } from './pages/WelcomePage';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { LibraryPage } from './pages/LibraryPage';
import { LoginSignup } from './pages/LoginSignup';
// import { UserDetails } from "./pages/UserDetails";
import { SvgLoader } from './cmps/SvgLoader';
import { StationDetails } from './pages/StationDetails';
import { LikedSongs } from './pages/LikedSongs';

const routes = [
  {
    path: '/user',
    component: <SvgLoader />,
  },
  {
    path: '/station/:stationId',
    component: <StationDetails />,
  },
  {
    path: '/search',
    component: <SearchPage />,
  },
  {
    path: '/library',
    component: <LibraryPage />,
  },
  {
    path: '/likedSongs',
    component: <LikedSongs />,
  },
  {
    path: '/login',
    component: <LoginSignup />,
  },
  {
    path: '/signup',
    component: <LoginSignup />,
  },
  {
    path: '/',
    component: <HomePage />,
  },
  // {
  //   path: "/home",
  //   component: <HomePage />,
  // },
  // {
  //   path: "/",
  //   component: <WelcomePage />,
  // },
];

export default routes;
