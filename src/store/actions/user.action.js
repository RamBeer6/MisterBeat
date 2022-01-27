import { userService } from "../../services/user.service";
import { stationService } from "../../services/station.service";
import avatar from "../../assets/imgs/avatar.jpg";

let timeoutId;

export const onSetMsg = (type, txt) => {
    return async (dispatch) => {
      try {
        const msg = { type, txt }
        dispatch({ type: 'SET_MSG', msg })
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            dispatch({ type: 'SET_MSG', msg: null })
        }, 2500)
    }catch (err) {
      throw err;
    }
  };
}



export function likeSong(song, user) {
  return async (dispatch) => {
    try {
      const updatedUser = await stationService.addSongToLiked(song, user);
      dispatch({
        type: "SET_USER",
        user: updatedUser,
      });
    } catch (err) {
      throw err;
    }
  };
}

export function unlikeSong(song, user) {
  return async (dispatch) => {
    try {
      const updatedUser = await stationService.removeSongFromLiked(song, user);
      dispatch({
        type: "SET_USER",
        user: updatedUser,
      });
    } catch (err) {
      throw err;
    }
  };
}

export function likeStation(stationId, user) {
  return async (dispatch) => {
    try {
      const updatedUser = await stationService.addStationToLiked(
        stationId,
        user
      );
      dispatch({
        type: "SET_USER",
        user: updatedUser,
      });
    } catch (err) {
      throw err;
    }
  };
}

export function unlikeStation(stationId, user) {
  return async (dispatch) => {
    try {
      const updatedUser = await stationService.removeStationFromLiked(
        stationId,
        user
      );
      dispatch({
        type: "SET_USER",
        user: updatedUser,
      });
    } catch (err) {
      throw err;
    }
  };
}

export function updateLikedSongs(songs) {
  return async (dispatch) => {
    try {
      const updatedUser = await userService.updateLikedSongs(songs);
      dispatch({
        type: "SET_USER",
        user: updatedUser,
      });
    } catch (err) {
      throw err;
    }
  };
}

export function onSignup(credentials) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(credentials);
      dispatch({
        type: "SET_USER",
        user,
      });
      return user;
    } catch (err) {
      console.log("Cannot signup", err);
    }
  };
}

export function onLogin(credentials) {
  return async (dispatch) => {
    try {
      const user = await userService.login(credentials);
      dispatch({
        type: "SET_USER",
        user,
      });
      return user;
    } catch (err) {
      console.log("Cannot login", err);
    }
  };
}

export function onLogout() {
  return async (dispatch) => {
    try {
      await userService.logout();
      dispatch({
        type: "SET_USER",
        user: {
          userName: "Guest",
          imgUrl: { avatar },
        },
      });
    } catch (err) {
      console.log("Cannot logout", err);
    }
  };
}
