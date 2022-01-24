import { useState } from 'react'
import { connect } from 'react-redux'
import { User } from './User'
// import add_img from "../assets/imgs/add-img.png"
import { EditStationHero } from '../cmps/EditStationHero'
import { stationService } from '../services/station.service'


function _StationHero({ user, station = {}, onAddStation }) {
  const [isEdit, setIsEdit] = useState(false)

//   const saveStationInfo = async (data) => {
    // onAddStation(data)
    // try {
    //     await stationService.addNewStation(data)
    // } catch (err) {
    //     console.log(err);
    // }
//   }

  return (
    <section className="station-hero">
      <div className="station-hero__info" onClick={() => setIsEdit(!isEdit)}>
        <div className="station-hero__img" />
        {/* <img src={add_img} alt="image" /> */}
        <div className="station-hero__text">
          <strong className="label">Playlist</strong>
          <h2>{station?.name ? station.name: 'My Playlist #1'}</h2>
          <div className="total-durtion-user">
            <p className="duration__nums"></p>
            <p className="duration__desc">{station?.desc}</p>
            <p>{user.userName}</p>
          </div>
        </div>
      </div>

      {isEdit && <EditStationHero onAddStation={onAddStation} />}
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

export const StationHero = connect(
  mapStateToProps,
  mapDispatchToProps
)(_StationHero)
