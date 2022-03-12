export function playSong(songId, songIdx) {
  return (dispatch) => {
    dispatch({
      type: 'SET_SONG',
      currSongId: songId,
    });
  };
}

export function songIdx(currSongIdx) {
  return (dispatch) => {
    dispatch({
      type: 'SET_IDX_SONG',
      currSongIdx,
    });
  };
}

export function pauseSong(songId, songIdx) {
  return (dispatch) => {
    dispatch({
      type: 'PAUSE_SONG',
      currSongId: songId,
    });
  };
}

export function setPlayer(player) {
  return (dispatch) => {
    dispatch({
      type: 'SET_PLAYER',
      player,
    });
  };
}

export function onTogglePlay(isPlaying) {
  return async (dispatch) => {
    dispatch({
      type: 'TOGGLE_ISPLAYING',
      isPlaying,
    });
  };
}

export function setPlayerSongs(currSongs, currStationId) {
  return async (dispatch) => {
    dispatch({
      type: 'SET_PLAYER_SONGS',
      currSongs,
      currStationId,
    });
  };
}

export function shuffleCurrSongs(shuffleSongs) {
  return async (dispatch) => {
    dispatch({
      type: 'SET_SHUFFLE_SONGS',
      shuffleSongs,
    });
  };
}

export function shuffle(isShuffle) {
  return async (dispatch) => {
    dispatch({
      type: 'SET_SHUFFLE',
      isShuffle,
    });
  };
}

export function songDetails(songDetails) {
  return async (dispatch) => {
    dispatch({
      type: 'SET_SONG_OBJECT',
      songDetails,
    });
  };
}
