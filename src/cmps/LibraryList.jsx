// import { useEffect, useState } from "react";
import { stationService } from "../services/station.service";

export function LibraryList({ countLikedSongs, userStations }) {
    return (
        <section className="library-list">
            <section className="card liked-songs">
                <h2>Liked Songs</h2>
                <span>{countLikedSongs} liked songs</span>
            </section>
            {userStations?.map(station => {
                return <section key={station._id} className="card liked-station">liked stations</section>
            })
            }
            {/* <section className="card liked-station">liked stations</section>
            <section className="card liked-station">liked stations</section>
            <section className="card liked-station">liked stations</section>
            <section className="card liked-station">liked stations</section>
            <section className="card liked-station">liked stations</section>
            <section className="card liked-station">liked stations</section>
            <section className="card createdby-station">createdby station</section>
            <section className="card createdby-station">createdby station</section>
            <section className="card createdby-station">createdby station</section>
            <section className="card createdby-station">createdby station</section>
            <section className="card createdby-station">createdby station</section> */}
        </section>
    );
}
