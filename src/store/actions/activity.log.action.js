import { activitylogService } from '../../services/activitylog.service'
import { userService } from '../../services/user.service'
import { socketService } from '../../services/socket.service'

export function likeSongActivity(song, user) {
  return async (dispatch) => {
    try {
      const addedActivitylog = await activitylogService.addActivitylog(
        'liked song',
        user,
        song.title,
        {}
      )
      socketService.emit('addActivity', addedActivitylog)
      // dispatch({
      //   type: 'ADD_ACTIVITY_LOG',
      //   activitylog: addedActivitylog,
      // })
    } catch (err) {
      throw err
    }
  }
}

export function addPlaylistActivity(station, user) {
  return async (dispatch) => {
    try {
      const addedActivitylog = await activitylogService.addActivitylog(
        'added playlist',
        user,
        '',
        station
      )
      socketService.emit('addActivity', addedActivitylog)
      // dispatch({
      //   type: 'ADD_ACTIVITY_LOG',
      //   activitylog: addedActivitylog,
      // })
    } catch (err) {
      throw err
    }
  }
}

// frontend - action
export function getActivities() {
  return async (dispatch) => {
    try {
      const loggedinUser = await userService.getLoggedinUser()
      const activitieslog = await activitylogService.query({
        userId: loggedinUser._id,
        followers: [...loggedinUser.followUsers],
      })
      dispatch({
        type: 'SET_ACTIVITY_LOG',
        activitylog: activitieslog,
      })
      return activitieslog
    } catch (err) {
      throw err
    }
  }
}
