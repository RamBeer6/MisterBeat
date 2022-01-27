import { connect } from 'react-redux';
import { onLogout } from '../store/actions/user.action';

import { userImg } from '../assets/imgs/user-img.jpg';

// import user_Img from '../assets/imgs/user-img.jpg';

function _User({ onLogout, user }) {
  return (
    <section className='user flex' onClick={onLogout}>
      <img
        src='https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2018/png/iconmonstr-user-circle-thin.png&r=0&g=0&b=0'
        alt='image'
      />
      <h4>{user.userName}</h4>
      <div className='svg-down-container'>
        <svg //arrow down
          role='img'
          height='16'
          width='16'
          className='svg-down'
          viewBox='0 0 16 16'>
          <path d='M3 6l5 5.794L13 6z'></path>
        </svg>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  onLogout,
};

export const User = connect(mapStateToProps, mapDispatchToProps)(_User);
