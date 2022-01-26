import { httpService } from './http.service.js'
import avatar from '../assets/imgs/avatar.jpg'

const STORAGE_KEY = 'loggedinUser'

export const userService = {
  getLoggedinUser,
  updateUser,
  updateLikedSongs,
  signup,
  login,
  logout,
}

function getLoggedinUser() {
  const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
  if (user) return user
  else {
    const guest = {
      // _id: 'u101',
      userName: 'Guest',
      imgUrl: {avatar},
      likedSongs: [],
      likedStations: [],
    }
    _setLoggedinUser(guest)
    return guest
  }
}

async function updateUser(user) {
  try {
    const updatedUser = await httpService.put(`user/${user._id}`, user)
    _setLoggedinUser(updatedUser)
    return updatedUser
  } catch (err) {
    throw err
  }
}

async function updateLikedSongs(songs) {
  try {
    const loggedinUser = getLoggedinUser()
    loggedinUser.likedSongs = songs
    return updateUser(loggedinUser)
  } catch (err) {
    throw err
  }
}

async function login(userCred) {
  try {
    const user = await httpService.post('auth/login', userCred)
    _setLoggedinUser(user)
    return user
  } catch (err) {
    throw err
  }
}

async function signup(userInfo) {
  try {
    if (!userInfo.imgUrl) userInfo.imgUrl = { avatar }
    const user = await httpService.post('auth/signup', userInfo)
    _setLoggedinUser(user)
    return user
  } catch (err) {
    throw err
  }
}

async function logout() {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
    return await httpService.post('auth/logout')
  } catch (err) {
    throw err
  }
}

function _setLoggedinUser(user) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}
