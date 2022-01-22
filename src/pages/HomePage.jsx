import React from 'react'
import { stationService } from '../services/station.service'
import { DefaultStationList } from '../cmps/DefaultStationList'

export class HomePage extends React.Component {
  state = {
    stations: [],
    tags: [],
  }

  componentDidMount() {
    this.loadStations()
    this.loadTags()
  }

  loadStations = async () => {
    try {
      const stations = await stationService.query()
      this.setState((prevState) => ({ ...prevState, stations }))
    } catch (err) {
      console.error('Could not get stations', err)
    }
  }

  loadTags = async () => {
    try {
      const tags = await stationService.getTags()
      this.setState((prevState) => ({ ...prevState, tags }))
    } catch (err) {
      console.error('Could not get tags', err)
    }
  }

  render() {
    const { stations, tags } = this.state
    console.log('stations:' , stations)
    // console.log('tags:' , tags)
    if (!stations.length) return <h1>No stations to show</h1>

    return (
      <section className="home-page">
        <DefaultStationList stations={stations} />
        <DefaultStationList stations={stations} />
        <DefaultStationList stations={stations} />
      </section>
    )
  }
}
