import { Droppable } from 'react-beautiful-dnd';

export function LikedSongs() {
  return (
    <section className='likedSongsPage'>
      <div className='header-container'>
        <div className='header-img'>
          <div className='img'>
            <img src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' alt='' />
          </div>
        </div>
        <div className='header-info'>
          <h1>Liked Songs</h1>
          <span>(counter) songs</span>
        </div>
      </div>

      <div className='actions'>
        <button className='play-btn' title='play'>
          <svg height='28' role='img' width='28' viewBox='0 0 24 24' aria-hidden='true'>
            <polygon points='21.57 12 5.98 3 5.98 21 21.57 12' fill='currentColor'></polygon>
          </svg>
        </button>
      </div>

      <div className='likedSongs-list-container'>
        <div className='song-list-head'>
          <h3>#</h3>
          <h3>Title</h3>
          <h3>Album</h3>
          <h3>Duration</h3>
          <h3>Actions</h3>
        </div>

        {/* <button>
          <svg
            className='unliked'
            width='24'
            height='24'
            xmlns='http://www.w3.org/2000/svg'
            fill-rule='evenodd'
            clip-rule='evenodd'>
            <path d='M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181' />
          </svg>
        </button>
        <button>
          <svg
            className='liked'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'>
            <path d='M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z' />
          </svg>
        </button> */}
      </div>
    </section>
  );
}
