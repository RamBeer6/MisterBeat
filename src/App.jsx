import React from 'react';
// import { Route, Switch } from "react-router";
import { Routes, Route } from 'react-router';
import routes from './routes';
import { AppHeader } from './cmps/AppHeader';
import { MusicPlayer } from './cmps/MusicPlayer';

export class App extends React.Component {
  render() {
    return (
      <section>
        <AppHeader />
        <main>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} exact={true} element={route.component} path={route.path} />
            ))}
          </Routes>
          <MusicPlayer videoId={'04854XqcfCY'} />
        </main>
      </section>
    );
  }
}
