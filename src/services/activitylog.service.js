import { httpService } from './http.service';
import { userService } from './user.service';

export const activitylogService = {
  addActivitylog,
  query,
};

async function addActivitylog(type, user, songTitle, stationInfo) {
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
    };
    return await httpService.post('activitylog', activitylog);
  } catch (err) {
    throw err;
  }
}

async function query(filterBy) {
  try {
    const activitieslog = await httpService.get('activitylog', filterBy);
    return activitieslog.slice(activitieslog.length - 10, activitieslog.length);
  } catch (err) {
    throw err;
  }
}
