import React, { useState, useEffect } from 'react'
import { TagList } from '../cmps/TagList'
import { youtubeService } from '../services/youtube.service'

import { SearchBar } from '../cmps/SearchBar'
import useDebounce from '../cmps/UseDebounce'
import { LoaderDots } from '../cmps/LoaderDots'
import { SearchedSongList } from '../cmps/SearchedSongList'


export function SearchPage() {
  const [txt, setTxt] = useState('')
  const [songs, setSongs] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const debouncedSearchTerm = useDebounce(txt, 1000)

  useEffect(() => {
    if(debouncedSearchTerm) {
      setIsSearching(true)
      loadSongs(debouncedSearchTerm).then(songs => {
        setIsSearching(false)
        setSongs(songs.slice(0, 10))
        console.log('search page:' , songs.slice(0,10))
      })
    } else {
      setSongs([])
    }
  }, [debouncedSearchTerm])
  
  // componentDidMount() {
  //   this.loadMusic()
  // }

  // loadMusic = async () => {
  //   try {
  //     const criteria = this.state.filterBy.txt;
  //     const music = await youtubeService.query(criteria);
  //   } catch (err) {
  //     console.log("ERROR load music:", err);
  //   }
  // }

  const loadSongs = async (searchTxt) => {
    try {
      if (!searchTxt) return
      return await youtubeService.query(searchTxt)
    } catch (err) {
      console.log(err)
    }
  }

  // onSetFilter = (txt) => {
  //   this.setState({ filterBy: { txt } }, () => {
  //     console.log('set filter:', this.state.filterBy.txt)
  //     this.loadMusic()
  //   });
  // };

  const onSetFilter = (txt) => {
    // this.setState({ filterBy: { txt } }, () => {
    //   console.log('set filter:', this.state.filterBy.txt)
    //   this.loadMusic()
    // })
    setTxt(txt)
  }

    return (
      <section className="search-page">
        <SearchBar onSetFilter={onSetFilter} />
        {isSearching && <LoaderDots />}
        {!txt && <TagList />}
        {txt && songs?.length && (
          <SearchedSongList songs={songs} />
        )}
      </section>
    )
}
