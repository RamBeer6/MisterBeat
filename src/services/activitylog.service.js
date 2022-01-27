import { httpService } from './http.service'
import { userService } from './user.service'

export const activitylogService = {
  addActivitylog,
  query
}

async function addActivitylog(type, user, songTitle, stationInfo) {
  // const user = userService.getLoggedinUser()
  try {
    const activitylog = {
      type,
      createdBy: {
        _id: user._id,
        userName: user.userName,
        imgUrl: user.imgUrl,
      },
      stationInfo,
      createdAt: Date.now(),
      songTitle,
    }
    return await httpService.post('activitylog', activitylog)
  } catch (err) {
    throw err
  }
}

async function query() {
  try {
    const activitieslog = await httpService.get('activitylog')
    return activitieslog.slice(activitieslog.lengh - 10, activitieslog.lengh)
  } catch (err) {
    throw err
  }
}
