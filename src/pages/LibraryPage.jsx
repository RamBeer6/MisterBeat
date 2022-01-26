import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { stationService } from '../services/station.service'
import { LibraryList } from '../cmps/LibraryList'

function _LibraryPage({ user }) {
  console.log('library user likedStations:' , user.likedStations)
  console.log('library user likedSongs:' , user.likedSongs)

  const [ userStations, setUserStations ] = useState([])

  useEffect(() => {
    loadUserStations()
  }, [])

  const loadUserStations = async () => {
    try {
        const userLikedStations = await stationService.getLikedStations(user.likedStations)
        // console.log('userLikedStations:' , userLikedStations )
        setUserStations(userLikedStations)
        // const userCreatedStations = await stationService.getCreatedStations(user._id)
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
}

export const LibraryPage = connect(mapStateToProps, mapDispatchToProps )(_LibraryPage)
