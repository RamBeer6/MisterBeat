import React from 'react'
import { youtubeService } from '../services/youtube.service'

export class SongSearch extends React.Component {
  state = {
    txt: '',
    songs: []
  }

  loadSongs = async () => {
    try {
        const criteria = this.state.txt
        const songs = await youtubeService.query(criteria)
        this.setState({ songs })
    } catch (err) {
        
    }
  }

  debouncedSongSearch = youtubeService.debounce(this.loadSongs, 1000)

  handleChange = (ev) => {
    const { value } = ev.target;
    this.setState({...this.state, txt: value }, () => {
        this.debouncedSongSearch()
    })
  }

  cleanForm = () => {
    this.setState({ txt: '' })
  }

  render() {
    const { txt } = this.state

    return (
      <section className="song-search">
        <form>
          <input
            name="txt"
            value={txt}
            type="text"
            placeholder="Add songs or podcasts to playlist..."
            autoComplete="off"
            onChange={this.handleChange}
          />
          <a
            // href="javascript:void(0);"
            className="search-button"
            onClick={this.cleanForm}
          >
            <div className="icon" />
          </a>
        </form>
      </section>
    )
  }
}
