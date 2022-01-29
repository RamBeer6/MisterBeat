import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { SvgLoader } from './SvgLoader';
import { Droppable } from 'react-beautiful-dnd';
import { socketService } from '../services/socket.service';

import { setPlayerSongs } from '../store/actions/music.player.action';
import { likeSongActivity } from '../store/actions/activity.log.action';
import { SongPreview } from './SongPreview';

function _SongList({
  stationId = 'no_id',
  songs,
  onRemoveSong,
  fromLikedSong = false,
  setPlayerSongs,
  likeSongActivity,
}) {
  useEffect(() => {
    socketService.off('songChanged', socketDemo);
    socketService.on('songChanged', socketDemo);
    setPlayerSongs(songs);
  }, []);

  const socketDemo = async ({ song, user }) => {
    console.log('data from socket', song, user);
    try {
      await likeSongActivity(song, user);
    } catch (err) {
      console.log(err);
    }
  };

  const onSongActivity = (song, user) => {
    console.log('onSongActivity from');
    socketService.emit('changeSong', { song, user });
  };

  if (!songs || !songs.length) return <React.Fragment></React.Fragment>;

  if (!songs.length) return <SvgLoader />;
  return (
    <Droppable droppableId={stationId}>
      {(provided) => (
        <section className='song-list' {...provided.droppableProps} ref={provided.innerRef}>
          <div className='song-list-head'>
            <h3>#</h3>
            <h3>Title</h3>
            <h3 className='hide-mobile-songlist'>Album</h3>
            <h3 style={{ textAlign: 'center' }} className='hide-mobile-songlist'>
              Duration
            </h3>
            {/* <h3>Actions</h3> */}
          </div>
          {songs?.map((song, idx) => {
            return (
              <SongPreview
                key={song.id}
                song={song}
                idx={idx}
                onRemoveSong={onRemoveSong}
                fromLikedSong={fromLikedSong}
                onSongActivity={onSongActivity}
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
  likeSongActivity,
};

export const SongList = connect(mapStateToProps, mapDispatchToProps)(_SongList);
