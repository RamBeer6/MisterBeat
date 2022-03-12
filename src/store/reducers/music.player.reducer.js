const initialState = {
  isPlaying: false,
  currSongId: '',
  currSongIdx: 0,
  currStationId: '',
  currSongs: [],
  isShuffle: false,
  shuffleSongs: [],
  songDetails: '',
};

export function musicPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SONG':
      return { ...state, currSongId: action.currSongId };
    case 'PAUSE_SONG':
      return { ...state, currSongId: action.currSongId };
    case 'SET_PLAYER':
      return { ...state, player: action.player };
    case 'TOGGLE_ISPLAYING':
      return { ...state, isPlaying: action.isPlaying };
    case 'SET_PLAYER_SONGS':
      return { ...state, currSongs: action.currSongs, currStationId: action.currStationId };
    case 'SET_IDX_SONG':
      return { ...state, currSongIdx: action.currSongIdx };
    case 'SET_SHUFFLE_SONGS':
      return { ...state, shuffleSongs: action.shuffleSongs };
    case 'SET_SHUFFLE':
      return { ...state, isShuffle: action.isShuffle };
    case 'SET_SONG_OBJECT':
      return { ...state, songDetails: action.songDetails };
    default:
      return state;
  }
}
