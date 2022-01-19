import React from 'react'
import { youtubeService } from '../services/youtube.service'

import { SearchBar } from '../cmps/SearchBar'

export class SearchPage extends React.Component {
  state = {
    filterBy: {
      txt: '',
    },
  }
  componentDidMount() {
    // this.loadMusic()
  }

  loadMusic = async () => {
    try {
      const criteria = this.state.filterBy.txt  
      const music = await youtubeService.query(criteria)
      console.log('search page' , music);
    } catch (err) {
      console.log('ERROR load music:', err)
    }
  }

  onSetFilter = (txt) => {
    this.setState({ filterBy: { txt } }, () => {
    //   console.log('set filter:', this.state.filterBy.txt)
      // this.loadMusic()
    })
  }

  render() {
    return (
      <section className="search-page">
        SEARCH PAGE
        <SearchBar onSetFilter={this.onSetFilter} />
      </section>
    )
  }
}
