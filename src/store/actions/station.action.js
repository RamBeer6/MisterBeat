import { stationService } from '../../services/station.service'

export function loadSongs(stationId, filterBy) {
    return async (dispatch) => {
        try {
            let songs;
            // console.log('action:' , stationId);
            if (!stationId) songs = []
            else songs = await stationService.loadSongs(stationId, filterBy)
            dispatch({
                type: 'SET_SONGS',
                songs,
                currStationId: stationId
            })
        } catch (err) {
            throw err
        }
    }
}