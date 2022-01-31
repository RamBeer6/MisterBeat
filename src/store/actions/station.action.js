import { stationService } from '../../services/station.service';

export function loadSongs(stationId, filterBy) {
  return async (dispatch) => {
    try {
      let songs;
      if (!stationId) songs = [];
      else songs = await stationService.loadSongs(stationId, filterBy);
      dispatch({
        type: 'SET_SONGS',
        songs,
        currStationId: stationId,
      });
    } catch (err) {
      throw err;
    }
  };
}

export function updateSongs(stationId, songs) {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'UPDATE_SONGS',
        songs,
        currStationId: stationId,
      });
      await stationService.updateSongs(stationId, songs);
    } catch (err) {
      throw err;
    }
  };
}

export function removeSong(stationId, songId) {
  return async (dispatch) => {
    try {
      const newSongs = await stationService.removeSongStation(stationId, songId);
      dispatch({
        type: 'REMOVE_SONG',
        songId,
        currStationId: stationId,
      });
      return newSongs;
    } catch (err) {
      throw err;
    }
  };
}

export function addStation(station, user) {
  return async (dispatch) => {
    const newStation = await stationService.addNewStation(station, user);
    try {
      dispatch({
        type: 'ADD_STATION',
        currStationId: newStation._id,
      });
      return newStation;
    } catch (err) {
      throw err;
    }
  };
}

export function insertStationInStore(stationId) {
  return (dispatch) => {
    dispatch({
      type: 'INSERT_STATION',
      currStationId: stationId,
    });
  };
}

export function updateStation(station, user) {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'UPDATE_STATION',
        currStationId: station._id,
      });
      return await stationService.updateStation(station, user);
    } catch (err) {
      throw err;
    }
  };
}

export function removeStation(stationId) {
  return async (dispatch) => {
    try {
      await stationService.removeStation(stationId);
      dispatch({
        type: 'REMOVE_STATION',
        stationId,
        currStationId: '',
      });
    } catch (err) {
      throw err;
    }
  };
}

export function addSong(stationId, song) {
  return async (dispatch) => {
    try {
      const newSong = await stationService.addSongStation(stationId, song);
      dispatch({
        type: 'ADD_SONG',
        song,
        currStationId: stationId,
      });
      return newSong;
    } catch (err) {
      throw err;
    }
  };
}

export function loadStations(filter) {
  return async (dispatch) => {
    try {
      const stations = await stationService.query(filter);
      return stations;
      // dispatch({ type: 'SET_STATIONS', stations })
    } catch (err) {
      console.log('StationActions: err in loadStation', err);
    }
  };
}

export function getLikedStations(userStations) {
  return async (dispatch) => {
    try {
      return await stationService.getLikedStations(userStations);
      // dispatch({ type: 'SET_STATIONS', stations })
    } catch (err) {
      console.log('StationActions: err in getLikedStations', err);
    }
  };
}
