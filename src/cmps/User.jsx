import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogout } from '../store/actions/user.action';

import { userImg } from '../assets/imgs/user-img.jpg';

function _User({ onLogout, user }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false)

  const onToggleModal = () => {
    setIsOpen(!isOpen)
    // if(!isOpen) onLogout()
  }

  return (
    <section className="user-profile" onClick={onToggleModal}>
    <div className='user flex'>
      <div>
        <img
        src='https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2018/png/iconmonstr-user-circle-thin.png&r=0&g=0&b=0'
        alt='image'
        />
      </div>
      <h4>{user.userName}</h4>
      <div className='svg-down-container'>
      {isOpen ?
        <svg 
          role="img" 
          height="16" 
          width="16" 
          className="Svg-sc-1bi12j5-0 hDgDGI eAXFT6yvz37fvS1lmt6k" 
          viewBox="0 0 16 16">
          <path d="M13 10L8 4.206 3 10z"></path>
        </svg> : 
        <svg //arrow down
          role='img'
          height='16'
          width='16'
          className='svg-down'
          viewBox='0 0 16 16'>
          <path d='M3 6l5 5.794L13 6z'></path>
        </svg>
        }
      </div>
      </div>
      {isOpen && 
        <ul className="user-options-container">
          {user?._id ? <li onClick={onLogout}>Logout</li> : <li>Login</li>}
          <li onClick={() => {
            setIsOpen(!isOpen)
            navigate('/friends')
          }}>Friends</li>
        </ul>
      }
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
