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
    case 'UPDATE  _SONGS':
      return {
        ...state,
        songs: action.songs,
        currStationId: action.currStationId,
      }
    default:
      return state
  }
}
