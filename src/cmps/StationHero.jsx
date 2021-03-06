import { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { EditStationHero } from "../cmps/EditStationHero";
import defaultImg from "../assets/imgs/default-img.png";

function _StationHero({ user, station = {}, onSaveStation }) {
  const [isEdit, setIsEdit] = useState(false)

  const onCloseEdit = (value) => {
    setIsEdit(value);
  };

  const calcDuration = (station) => {
    if (station && station.songs?.length) {
      const durations = station.songs.map((song) => {
        if (song.duration.length === 5) song.duration = `00:${song.duration}`;
        return { duration: song.duration };
      });
      const totalDurations = durations.slice(1).reduce((prev, cur) => {
        return prev.add(cur.duration);
      }, moment.duration(durations[0].duration));

      return `${moment.utc(totalDurations.asMilliseconds()).format("HH")} hr
              ${moment.utc(totalDurations.asMilliseconds()).format("mm")} min`;
    }
  };
  const { stationId } = station;

  return (
    <section className="station-hero" >
      <div className="linear-hero" style={{background: `linear-gradient(${station?.bcgColor} 70%, #16351d)`}}>
        <div className="station-hero__info" onClick={() => setIsEdit(!isEdit)}>
          <img
            src={
              station.imgUrl?.length
                ? station.imgUrl
                : "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2014/png/iconmonstr-disc-5.png&r=122&g=122&b=122"
            }
            className="station-hero__img"
          />
          <div className="station-hero__text">
            <strong className="label">Playlist</strong>
            <h2>{station?.name ? station.name : "My Playlist #1"}</h2>
            <div className="total-durtion-user">
              <p className="duration__desc">{station?.desc}</p>
              <p className="duration__nums">
                <span className="user-info">{station?.createdBy?.userName}</span> • {station.likedByUsers?.length ? station.likedByUsers.length : "0"} likes • {" "}
                {calcDuration(station)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {isEdit && (
        <EditStationHero
          station={station}
          onSaveStation={onSaveStation}
          onCloseEdit={onCloseEdit}
        />
      )}
    </section>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {};

export const StationHero = connect(
  mapStateToProps,
  mapDispatchToProps
)(_StationHero);
