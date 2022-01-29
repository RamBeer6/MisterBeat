import React, { useState } from "react";

export function StationActions({
  onToggleSongSearch,
  isLikedStation,
  onSetLikedStation,
  onGetSongs,
  onRemoveStation,
  stationId,
}) {
  // console.log('isLikedStation' , isLikedStation);
  const [isStationPlaying, setStationPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false)

  return (
    <section className="station-actions" onMouseEnter={() => setIsHover(true)}
       onMouseLeave={() => setIsHover(false)}>
      <button
        className="play-btn"
        title="play"
        onClick={() => {
          setStationPlaying(!isStationPlaying);
          onGetSongs(!isStationPlaying);
        }}
      >
        {!isStationPlaying ? (
          <svg
            height="28"
            role="img"
            width="28"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <polygon
              points="21.57 12 5.98 3 5.98 21 21.57 12"
              fill="currentColor"
            ></polygon>
          </svg>
        ) : (
          <svg
            height="22"
            role="img"
            width="22"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect x="5" y="3" width="4" height="18" fill="currentColor"></rect>
            <rect x="15" y="3" width="4" height="18" fill="currentColor"></rect>
          </svg>
        )}
      </button>
      {isLikedStation ? (
        <button
          className="like-btn"
          title="remove from likes"
          onClick={() => onSetLikedStation(false)}
        >
          <svg
            className="liked"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
          </svg>
        </button>
      ) : (
        <button
          className="like-btn"
          title="add to likes"
          onClick={() => onSetLikedStation(true)}
        >
          <svg
            className="unliked"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path style={{stroke: '#ffffffb3', strokeWidth: 1.2}} d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
          </svg>
        </button>
      )}
      <button
        className="open-search"
        onClick={onToggleSongSearch}
        title="add song"
      >
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path
           style={{stroke: '#ffffffb3', strokeWidth: 2}}
            fill="currentColor"
            d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z"
          />
        </svg>
      </button>
      {isHover ? 
        <button
        style={{
          background: "transparent",
          border: "none",
          marginLeft: "19px",
        }}
        className="remove-btn"
        onClick={() => onRemoveStation(stationId)}
        title="Delete playlist"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="remove"
        >
          <path
            fill={"rgba(255, 255, 255, 0.7)"}
            d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
          />
        </svg>
      </button> : ''
      }
    </section>
  );
}

// function mapStateToProps(state) {
//   return {
//     isPlaying: state.stationModule.isPlaying,
//   };
// }
