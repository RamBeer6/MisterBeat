import { StationHero } from "./StationHero";
import { SongSearch } from "./SongSearch";

export function CreatePlaylist() {
    return (
        <section className="create-playlist">
            <StationHero />
            <div className="add-song-container">
                <h4 className="song-search-header"> Let's find something for your playlist</h4>
                <SongSearch />
            </div>
        </section>
    );
}
