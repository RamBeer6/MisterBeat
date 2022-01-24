import React from "react";
import { Routes, Route } from "react-router";
import routes from "./routes";

// import { HomePage } from "./pages/HomePage";
// import { SvgLoader } from "./cmps/SvgLoader";
import { StationDetails } from "./pages/StationDetails";
// import { AppHeader } from "./cmps/AppHeader";
import { MusicPlayer } from './cmps/MusicPlayer';
import NavBar from './cmps/NavBar';
// import MainContainer from "./cmps/MainContainer";

export const App = () => {
  return (
    <section>
      {/* <AppHeader /> */}
      <main className='main'>
        {/* <HomePage /> */}
        <NavBar />
        <div className='main-container'>
          {/* <SvgLoader /> //Example */}
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} exact={true} element={route.component} path={route.path} />
            ))}
            {/* <Route path='/station/:stationId?' element={<StationDetails />} /> */}
          </Routes>
        </div>
      </main>
      <MusicPlayer videoId={'04854XqcfCY'} />
    </section>
  );
};
