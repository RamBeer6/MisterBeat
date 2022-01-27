import { activitylogService } from '../../services/activitylog.service'
import { userService } from '../../services/user.service'

export function likeSongActivity(song, user) {
  return async (dispatch) => {
    try {
      const addedActivitylog = await activitylogService.addActivitylog('like song', user, song.title, {} )
      dispatch({
        type: 'ADD_ACTIVITY_LOG',
        activitylog: addedActivitylog,
      })
    } catch (err) {
        throw err
    }
  }
}

export function getActivities() {
  return async (dispatch) => {
    try {
      const loggedinUser = userService.getLoggedinUser()
      const activitieslog = await activitylogService.query()
      const otherUsersActivities = activitieslog.filter(activity => activity.createdBy._id !== loggedinUser._id)
      console.log('otherUsersActivities', otherUsersActivities);
      dispatch({
        type: 'SET_ACTIVITY_LOG',
        activitylog: otherUsersActivities
      })
    } catch (err) {
        throw err
    }
 }
}
