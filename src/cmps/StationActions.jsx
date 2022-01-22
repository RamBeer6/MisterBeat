export function StationActions({ onToggleSongSearch, isLikedStation, onSetLikedStation }) {
    return (
        <section className="station-actions">
            <button className="play-btn" title="play"><svg height="28" role="img" width="28" viewBox="0 0 24 24" aria-hidden="true"><polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon></svg></button>
            {isLikedStation ? 
            <button className="like-btn" title="add to likes" onClick={() => onSetLikedStation(false)}><svg className='unliked' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                <path d='M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z' /></svg>
            </button> : 
            <button className="like-btn" title="remove from likes" onClick={() => onSetLikedStation(true)}><svg className='liked' width='24' height='24' xmlns='http://www.w3.org/2000/svg'  fillRule='evenodd' clipRule='evenodd'>
                <path d='M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181' /></svg>
            </button>
            }
            <button className="open-search" onClick={onToggleSongSearch} title="add song"><svg role="img" height="32" width="32" viewBox="0 0 32 32" className="Svg-sc-1bi12j5-0 hDgDGI"><path fill="currentColor" d="M5.998 13.999A2 2 0 105.999 18a2 2 0 00-.001-4zm10.001 0A2 2 0 1016 18a2 2 0 000-4zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z"></path></svg></button>
        </section>
    )
}