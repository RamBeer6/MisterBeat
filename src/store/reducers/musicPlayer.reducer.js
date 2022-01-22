const initialState = {
  player: '',
  isPlaying: false,
  currSongIdx: '',
  currStationIdx: '',
  currSongs: [],
};

export function musicPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PLAYER':
      console.log('STORE - state.player', state.player);
      console.log('STORE - action.player', action.player);
      return { ...state, player: action.player };
    case 'SET_SONG':
      return { ...state, currSongIdx: action.currSongIdx };
    case 'TOGGLE_ISPLAYING':
      return { ...state, isPlaying: action.isPlaying };
    case 'SET_STATION':
      return { ...state, currStationId: action.currStationId };
    case 'SET_SONGS_TO_PLAYER':
      return { ...state, currSongs: action.currSongs };
    default:
      return state;
  }
}
