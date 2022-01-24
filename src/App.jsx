import React from "react";
import { Routes, Route } from "react-router";
import routes from "./routes";
import { StationDetails } from "./pages/StationDetails";
// import { AppHeader } from "./cmps/AppHeader";
import { MusicPlayer } from "./cmps/MusicPlayer";
import NavBar from "./cmps/NavBar";
import { WelcomePage } from "./pages/WelcomePage";

export const App = () => {
  const isWelcome = true;
  // const isLogIn = true;
  return (
    <section>
      {isWelcome ? (
        <WelcomePage />
      ) : (
        <>
          <main className="main">
            <NavBar />
            <div className="main-container">
              {/* <SvgLoader /> //Example */}
              <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    exact={true}
                    element={route.component}
                    path={route.path}
                  />
                ))}
                <Route
                  path="/station/:stationId"
                  element={<StationDetails />}
                />
              </Routes>
            </div>
          </main>
          <MusicPlayer videoId={"04854XqcfCY"} />
        </>
      )}
    </section>
  );
};
