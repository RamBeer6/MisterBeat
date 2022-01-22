import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'user'

export const userService = {
  getLoggedinUser,
  updateUser,
}

function getLoggedinUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
    if (user) return user
    else { 
       const guest = { _id: 'u101' ,userName: "Guest", likedSongs: [], likedStations: [] ,imgUrl: 'https://pbs.twimg.com/profile_images/746460305396371456/4QYRblQD.jpg' }
       sessionStorage.setItem(STORAGE_KEY, JSON.stringify(guest))
       return guest
    }
}

async function updateUser(user) {
  try {
    // const updatedUser = await httpService.put(`user`, user)
    // sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser))
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    // return updatedUser
    return user
  } catch (err) {
    throw err
  }
}
