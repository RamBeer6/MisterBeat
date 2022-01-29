import { activitylogService } from '../../services/activitylog.service'
import { userService } from '../../services/user.service'
import { socketService } from '../../services/socket.service'

export function likeSongActivity(song, user) {
  return async (dispatch) => {
    try {
      const addedActivitylog = await activitylogService.addActivitylog('like song', user, song.title, {} )
      socketService.emit('addActivity', addedActivitylog);
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
      const addedActivitylog = await activitylogService.addActivitylog('add playlist', user, '', station )
      socketService.emit('addActivity', addedActivitylog);
      // dispatch({
      //   type: 'ADD_ACTIVITY_LOG',
      //   activitylog: addedActivitylog,
      // })
    } catch (err) {
        throw err
    }
  }
}

export function getActivities() {
  return async (dispatch) => {
    try {
      const loggedinUser = await userService.getLoggedinUser()
      const activitieslog = await activitylogService.query({userId: loggedinUser._id, followers: [...loggedinUser.followUsers]})
      console.log('loggedinUser' ,loggedinUser);
      console.log('activitieslog' ,activitieslog);
      // const otherUsersActivities = activitieslog.filter(activity => {
      //   return (activity.createdBy._id !== loggedinUser._id )
      //   && loggedinUser.followUsers.includes(activity.createdBy._id)
      // })
        
      console.log('otherUsersActivities' , activitieslog);
      dispatch({
        type: 'SET_ACTIVITY_LOG',
        activitylog: activitieslog
      })
      return activitieslog
    } catch (err) {
        throw err
    }
 }
}
