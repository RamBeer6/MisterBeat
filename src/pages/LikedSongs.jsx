import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'

import { SongList } from '../cmps/SongList'
import { updateLikedSongs } from '../store/actions/user.action'
import React, { useEffect, useState } from 'react'

function _LikedSongs({ user, updateLikedSongs }) {
  // console.log('user.likedSongs:' , user.likedSongs)
  // const [likedSongs, setLikedSongs] = useState(user.likedSongs)

  const onDragEnd = async (result) => {
    const { destination, source } = result
    if (!destination) return

    // same place
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) return

    const songs = user.likedSongs
    
    const newSongs = songs.slice()
    const [ song ] = newSongs.splice(source.index, 1)
    newSongs.splice(destination.index, 0, song)
    // setLikedSongs(likedSongs)
    await updateLikedSongs(newSongs)
  }

  if(Object.keys(user).length !== 0) 
  return (
    <section className='liked-songs-page'>
      <div className='header-container'>
        <div className='header-img'>
          <div className='img'>
            <img src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' alt='' />
          </div>
        </div>
        <div className='header-info'>
          <span>PLAYLIST</span>
          <h1>Liked Songs</h1>
          {/* <span>{user.userName} <span className="gray">∙ {likedSongs.length} songs</span></span> */}
          <span>{user.userName} <span className="gray">∙ {user.likedSongs?.length} songs</span></span>
        </div>
      </div>

      <div className="actions">
        <button className="play-btn" title='play'>
          <svg height='28' role='img' width='28' viewBox='0 0 24 24' aria-hidden='true'>
            <polygon points='21.57 12 5.98 3 5.98 21 21.57 12' fill='currentColor'></polygon>
          </svg>
        </button>
      </div>

      <div className="liked-songs-list-container">
        <DragDropContext onDragEnd={onDragEnd}>
          {/* <SongList songs={likedSongs} fromLikedSong={true} /> */}
          <SongList songs={user?.likedSongs} fromLikedSong={true} />
        </DragDropContext>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user
  }
}
const mapDispatchToProps = {
  updateLikedSongs
}

export const LikedSongs = connect(mapStateToProps, mapDispatchToProps)(_LikedSongs)
