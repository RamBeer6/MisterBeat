import { Droppable } from 'react-beautiful-dnd';
import { SongPreview } from './SongPreview';
import React, { useState, useEffect, useRef } from 'react';
import { setPlayerSongs } from '../store/actions/music.player.action';
import { connect } from 'react-redux';

export function _SongList({
  stationId = 'likedSongs',
  songs,
  onRemoveSong,
  fromLikedSong = false,
  setPlayerSongs,
}) {
  useEffect(() => {
    // console.log('useEffect in songlist songs', songs);
    setPlayerSongs(songs);
  });

  return (
    <Droppable droppableId={stationId}>
      {(provided) => (
        <section className='song-list' {...provided.droppableProps} ref={provided.innerRef}>
          <div className='song-list-head'>
            <h3>#</h3>
            <h3>Title</h3>
            <h3>Album</h3>
            <h3>Duration</h3>
            <h3>Actions</h3>
          </div>
          {songs?.map((song, idx) => {
            return (
              <SongPreview
                key={song.id}
                song={song}
                idx={idx}
                onRemoveSong={onRemoveSong}
                fromLikedSong={fromLikedSong}
              />
            );
          })}
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  );
}

function mapStateToProps(state) {
  return {
    currSongs: state.musicPlayerModule.currSongs,
  };
}

const mapDispatchToProps = {
  setPlayerSongs,
};

export const SongList = connect(mapStateToProps, mapDispatchToProps)(_SongList);
