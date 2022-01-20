import { WelcomePage } from "./pages/WelcomePage";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { LibraryPage } from "./pages/LibraryPage";
import { LoginSignup } from "./pages/LoginSignup";
// import { UserDetails } from "./pages/UserDetails";
import { StationDetails } from "./pages/StationDetails";

const routes = [
  // {
  //   path: "/user",
  //   component: <UserDetails />,
  // },
  {
    path: "/station/:stationId",
    component: <StationDetails />,
  },
  {
    path: "/search",
    component: <SearchPage />,
  },
  {
    path: "/library",
    component: <LibraryPage />,
  },
  {
    path: "/login",
    component: <LoginSignup />,
  },
  {
    path: "/signup",
    component: <LoginSignup />,
  },
  {
    path: "/home",
    component: <HomePage />,
  },
  {
    path: "/",
    component: <WelcomePage />,
  },
];

export default routes;
