import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { stationService } from '../services/station.service'
import { LibraryList } from '../cmps/LibraryList'

import { loadStations, getLikedStations } from '../store/actions/station.action'

function _LibraryPage({ user, getLikedStations, loadStations }) {

  const [ userStations, setUserStations ] = useState([])

  useEffect(() => {
    loadUserStations()
  }, [])

  const loadUserStations = async () => {
    try {
        // const userLikedStations = await stationService.getLikedStations(user.likedStations)
        const userLikedStations = await getLikedStations(user.likedStations)
        const userCreatedStations = await loadStations({userId: user._id})
        let allStations = [...userLikedStations, ...userCreatedStations]
        // remove duplicate from allstations
        allStations = allStations.filter((station,idx,arrStations)=> arrStations.findIndex(subStation=>(subStation._id === station._id))=== idx)
        setUserStations(allStations)
    } catch (err) {
        console.log(err)
    }
  }

  return (
    <section className="library-page">
      <LibraryList countLikedSongs={user.likedSongs.length} userStations={userStations} />
    </section>
  )
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
  }
}
const mapDispatchToProps = {
  getLikedStations,
  loadStations
}

export const LibraryPage = connect(mapStateToProps, mapDispatchToProps )(_LibraryPage)
