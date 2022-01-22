export function StationActions({ onToggleSongSearch }) {
    return (
        <section className="station-actions">
            <button>Play</button>
            <div className="statiom-icons">
                <span>❤ &nbsp;</span>
                <span>&#8942; &nbsp;</span>
                <span onClick={onToggleSongSearch}>+</span>
            </div>
        </section>
    )
}