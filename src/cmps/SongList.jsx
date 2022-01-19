import { SongPreview } from './SongPreview'

export function SongList({ stationId, songs }) {
    return (
        <section className="song-list">
            {/* <StationHero /> */}
            {/* <StationActions /> */}
            {songs.map((song, idx) => {
                return  <SongPreview key={song.id} song={song} idx={idx} />
            })}
        </section>
    )  
}