import React, { useState } from 'react';
import { Routes, Route } from 'react-router';
import routes from './routes';
import { WelcomePage } from './pages/WelcomePage';
import { StationDetails } from './pages/StationDetails';
import { LoginSignup } from './pages/LoginSignup';

import { AppHeader } from './cmps/AppHeader';
import { NavBar } from './cmps/NavBar';
import { MusicPlayer } from './cmps/MusicPlayer';

export const App = () => {
  const [isWelcome, setIsWelcome] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <section>
      {isWelcome ? (
        <WelcomePage setIsWelcome={setIsWelcome} setIsLogin={setIsLogin} />
      ) : isLogin ? (
        <LoginSignup setIsWelcome={setIsWelcome} setIsLogin={setIsLogin} />
      ) : (
        <>
          <main className='main'>
            <NavBar setIsWelcome={setIsWelcome} setIsLogin={setIsLogin} />
            <div className='main-container'>
              {/* <SvgLoader /> //Example */}
              <AppHeader />
              <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    exact={true}
                    element={route.component}
                    path={route.path}
                  />
                ))}
                <Route path='/station/:stationId' element={<StationDetails />} />
              </Routes>
            </div>
          </main>
          <MusicPlayer videoId={'04854XqcfCY'} />
        </>
      )}
    </section>
  );
};
