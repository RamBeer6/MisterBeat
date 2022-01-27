import { useNavigate } from "react-router";

export function LibraryList({ countLikedSongs, userStations }) {
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
                <span>{countLikedSongs} liked songs</span>
            </section>

            {userStations?.map((station) => {
                return (
                    <section key={station._id} className="card liked-station" onClick={() => {
                        navigate(`/station/${station._id}`);
                    }}>
                        liked stations
                    </section>
                );
            })}
        </section>
    );
}
