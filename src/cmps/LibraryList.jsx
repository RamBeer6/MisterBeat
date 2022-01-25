// import { useEffect, useState } from "react";
import { stationService } from "../services/station.service";

export function LibraryList() {
    return (
        <section className="library-list">
            <section className="card liked-songs">liked songs</section>
            <section className="card liked-station">liked stations</section>
            <section className="card liked-station">liked stations</section>
            <section className="card liked-station">liked stations</section>
            <section className="card liked-station">liked stations</section>
            <section className="card liked-station">liked stations</section>
            <section className="card liked-station">liked stations</section>
            <section className="card createdby-station">createdby station</section>
            <section className="card createdby-station">createdby station</section>
            <section className="card createdby-station">createdby station</section>
            <section className="card createdby-station">createdby station</section>
            <section className="card createdby-station">createdby station</section>
        </section>
    );
}
