import React from 'react';
import { Routes, Route } from 'react-router';
import routes from './routes';

import { HomePage } from './pages/HomePage';
import { StationDetails } from './pages/StationDetails';

import { AppHeader } from './cmps/AppHeader';
import { MusicPlayer } from './cmps/MusicPlayer';
import NavBar from './cmps/NavBar';
import MainContainer from './cmps/MainContainer';

export class App extends React.Component {
  render() {
    return (
      <section>
        {/* <AppHeader /> */}
        <main className='main'>
          {/* <HomePage /> */}
          <NavBar />
          <div className='main-container'>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} exact={true} element={route.component} path={route.path} />
              ))}
              <Route path='/station/:stationId' element={<StationDetails />} />
            </Routes>
          </div>
        </main>
        <MusicPlayer />
      </section>
    );
  }
}
