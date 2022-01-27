import React, { useEffect, useState } from 'react';
import { youtubeService } from '../services/youtube.service';

import { SuggestedSongList } from '../cmps/SuggestedSongList';
import useDebounce from '../cmps/UseDebounce';
import { LoaderDots } from '../cmps/LoaderDots';

export function SongSearch({ stationId, onAddSong }) {
  const [txt, setTxt] = useState('');
  const [songs, setSongs] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // const debouncedSearchTerm = useDebounce(txt, 1000);

  // useEffect(() => {
  //   loadSongs();
  // }, [txt]);

  // useEffect(() => {
  //   if (debouncedSearchTerm) {
  //     setIsSearching(true);
  //     loadSongs(debouncedSearchTerm).then((songs) => {
  //       setIsSearching(false);
  //       setSongs(songs.slice(0, 10));
  //     });
  //   } else {
  //     setSongs([]);
  //   }
  // }, [debouncedSearchTerm]);

  const loadSongs = async (searchTxt) => {
    try {
      if (!searchTxt) return;
      return await youtubeService.query(searchTxt);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (ev) => {
    const { value } = ev.target;
    setTxt(value);
  };

  const cleanForm = () => {
    setTxt('');
  };

  const onSearch = (ev) => {
    ev.preventDefault();
    loadSongs(txt).then((songs) => {
      setIsSearching(false);
      setSongs(songs.slice(0, 10));
    });
  };

  console.log(' SONG SEARCH - songs', songs);

  return (
    <section className='song-search'>
      <form onSubmit={onSearch}>
        <input
          name='txt'
          value={txt}
          type='text'
          placeholder='Add songs or podcasts to playlist...'
          autoComplete='off'
          onChange={handleChange}
        />
        <a className='search-button' onClick={cleanForm}>
          <div className='icon' />
        </a>
        <button>Search</button>
      </form>

      {/* {isSearching && <div>Searching ...</div>} */}
      {isSearching && <LoaderDots />}
      {txt && <SuggestedSongList songs={songs} onAddSong={onAddSong} />}
    </section>
  );
}
