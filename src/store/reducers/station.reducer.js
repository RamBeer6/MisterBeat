const initialState = {
  currStationId: '',
  songs: [],
}

export function stationReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_SONGS':
      return {
        ...state,
        songs: action.songs,
        currStationId: action.currStationId,
      }
    case 'UPDATE_SONGS':
      return {
        ...state,
        songs: action.songs,
        currStationId: action.currStationId,
      }
    case 'REMOVE_SONG':
      return { ...state, songs: state.songs.filter(song => song.id !== action.songId) }
    case 'ADD_SONG':
      return { ...state, songs: [...state.songs, action.song] }
    case 'ADD_STATION':
      return { ...state, currStationId: action.currStationId }
    case 'UPDATE_STATION':
      return { ...state, currStationId: action.currStationId }
    case 'REMOVE_STATION':
      return { ...state, currStationId: action.currStationId }
    default:
      return state
  }
}
