import React from 'react';
import { stationService } from '../services/station.service';
import { DefaultStationList } from '../cmps/DefaultStationList';
import { SvgLoader } from '../cmps/SvgLoader';
import { AppHeader } from '../cmps/AppHeader';

export class HomePage extends React.Component {
  state = {
    stations: [],
    tags: [],
  };

  componentDidMount() {
    this.loadStations();
    this.loadTags();
  }

  loadStations = async () => {
    try {
      const stations = await stationService.query();
      this.setState((prevState) => ({ ...prevState, stations }));
    } catch (err) {
      console.error('Could not get stations', err);
    }
  };

  loadTags = async () => {
    try {
      const tags = await stationService.getTags();
      this.setState((prevState) => ({ ...prevState, tags }));
    } catch (err) {
      console.error('Could not get tags', err);
    }
  };

  render() {
    const { stations, tags } = this.state;
    console.log('🚀 ~ file: HomePage.jsx ~ line 38 ~ HomePage ~ render ~ stations', stations);

    if (!stations.length || !tags.length) return <SvgLoader />;
    return (
      <section className='home-page'>
        {/* <AppHeader /> */}
        <DefaultStationList stations={stations.slice(0, 9)} title={'Popular releases'} />
        <DefaultStationList stations={stations.slice(9, 19)} title={'Top Mixes'} />
        <DefaultStationList stations={stations.slice(19, 29)} title={'Workout'} />
        <DefaultStationList stations={stations.slice(29, 39)} title={'Disney Hits'} />
        <DefaultStationList
          stations={stations?.slice(39, stations.length)}
          title={'Shared playlists'}
        />
      </section>
    );
  }
}
