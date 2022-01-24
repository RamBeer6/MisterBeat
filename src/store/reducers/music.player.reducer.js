const initialState = {
  // player: null,
  isPlaying: false,
  currSongId: '',
  currSongIdx: 0,
  currStationId: '',
  currSongs: [],
};

export function musicPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SONG':
      return { ...state, currSongId: action.currSongId };
    case 'PAUSE_SONG':
      return { ...state, currSongId: action.currSongId };
    case 'SET_PLAYER':
      return { ...state, player: action.player };
    //   case 'SET_SONG':
    //     return { ...state, currSongIdx: action.currSongIdx }
    case 'TOGGLE_ISPLAYING':
      return { ...state, isPlaying: action.isPlaying };
    case 'SET_PLAYER_SONGS':
      return { ...state, currSongs: action.currSongs };
    //   case 'SET_STATION_TO_PLAYER':
    //     return { ...state, currStationId: action.currStationId }
    //   case 'SET_SONGS_TO_PLAYER':
    //     return { ...state, currSongs: action.currSongs }
    default:
      return state;
  }
}
