import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router';
import routes from './routes';
import { socketService } from './services/socket.service';

import { WelcomePage } from './pages/WelcomePage';
import { StationDetails } from './pages/StationDetails';
import { LoginSignup } from './pages/LoginSignup';

import { AppHeader } from './cmps/AppHeader';
import { NavBar } from './cmps/NavBar';
import { MusicPlayer } from './cmps/MusicPlayer';
import { UserMsg } from './cmps/UserMsg';

import { insertStationInStore } from './store/actions/station.action';

const _App = ({ updateStationInStore }) => {
  const [isWelcome, setIsWelcome] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    return () => {
      socketService.terminate();
    };
  }, []);

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
          <UserMsg />
        </>
      )}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userModule.user,
    users: state.userModule.users,
  };
};

const mapDispatchToProps = {
  insertStationInStore,
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
