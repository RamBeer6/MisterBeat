export function playSong(songId, songIdx) {
  return (dispatch) => {
    dispatch({
      type: 'SET_SONG',
      currSongId: songId,
    })
  }
}

export function pauseSong() {
  return (dispatch) => {
    dispatch({
      type: 'SET_SONG',
      currSongId: '',
    })
  }
}

export function setPlayer(player) {
  return (dispatch) => {
    dispatch({
      type: 'SET_PLAYER',
      player,
    })
  }
}

// export function playSong(songIdx) {
//   console.log('action songIdx:' , songIdx);
//   return (dispatch) => {
//     dispatch({
//       type: 'SET_SONG',
//       currSongIdx: songIdx
//     })
//   }
// }

// export function setSongIdx(idx) {
//   return (dispatch) => {
//     dispatch({
//       type: 'SET_SONG',
//       currSongIdx: idx,
//     })
//   }
// }

// export function loadSongsToPlayer(songs) {
//   return (dispatch) => {
//     dispatch({
//       type: 'SET_SONGS_TO_PLAYER',
//       songs,
//     })
//   }
// }

// export function onTogglePlay(isPlaying) {
//   console.log('ACTION - is PLAYING', isPlaying)
//   return (dispatch) => {
//     dispatch({
//       type: 'TOGGLE_ISPLAYING',
//       isPlaying,
//     })
//   }
// }
