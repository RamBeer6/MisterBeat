// import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { stationService } from "../services/station.service";
import { connect } from "react-redux";
// import { NavLink } from "react-router-dom";
import demoImg from "../assets/imgs/demo-station-img.png";

export function _LibraryList({ user }) {
    const navigate = useNavigate();

    return (
        <section className="library-list">
            <section
                className="card liked-songs"
                onClick={() => {
                    navigate("/likedSongs");
                }}
            >
                <h4>liked songs</h4>
                <h5>{user.likedSongs.length} songs</h5>
            </section>

            {user.likedStations.map((stationId, idx) => {
                return (
                    <section
                        onClick={() => {
                            navigate(`/station/${stationId}`);
                        }}
                        style={{ color: "white" }}
                        className="card liked-station"
                    >
                        <img className="card-img" src={demoImg} alt="" />
                        <h5>{stationId}</h5>
                        <h5>{user.userName}</h5>
                    </section>
                );
            })}

            {/* {user.likedStations.map((stationId) => {
                return (
                    <NavLink to={`/station/${stationId}`}>
                        <section className="card liked-station">
                            <img src={user.imgUrl} alt="" />
                            <h5>{stationId}</h5>
                            <h5>{user.userName}</h5>
                        </section>
                    </NavLink>
                );
            })} */}
        </section>
    );
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        songs: state.stationModule.songs,
    };
}

const mapDispatchToProps = {};

export const LibraryList = connect(
    mapStateToProps,
    mapDispatchToProps
)(_LibraryList);
