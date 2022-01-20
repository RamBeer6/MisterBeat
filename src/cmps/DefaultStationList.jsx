import { StationPreview } from '../cmps/StationPreview'

export function DefaultStationList({ stations }) {
    stations.sort((s1,s2) => s2.likedByUsers.length - s1.likedByUsers.length)

    return(
        <section className="default-station-list">
            {stations.map(station => <StationPreview  key={station._id} station={station} />)}
        </section>
    )
}