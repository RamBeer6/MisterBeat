import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { stationService } from '../services/station.service'

import NavBarOptions from './NavBarOptions'
import { Logo } from './Logo';
import { ActivityLog } from './ActivityLog'

function _NavBar({ setIsWelcome, setIsLogin, user }) {
  const navigate = useNavigate();
  const [likedStations, setLikedStations] = useState([])

  useEffect(() => {
    loadLikedStations()
  }, [])

  const loadLikedStations = async () => {
    try {
      const userLikedStations = await stationService.getLikedStations(user.likedStations)
      setLikedStations(userLikedStations)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <nav className="nav-bar">
      <div className="logo">
        <Logo />
      </div>

      <ul className="nav-bar-list">
        <NavLink to="/" className="active-option">
          <li>
            <div className="symbol fas fa-home" />
            <NavBarOptions title="Home" />
          </li>
        </NavLink>

        <NavLink to="/search" className="active-option">
          <li>
            <div className="symbol fas fa-search" />
            <NavBarOptions title="Search" />
          </li>
        </NavLink>

        <NavLink to="/library" className="active-option">
          <li>
            <div className="symbol fas fa-compact-disc" />
            <NavBarOptions title="Your Library" />
          </li>
        </NavLink>

        <NavLink to="/station/create" className="active-option">
          <li>
            <div className="symbol fas fa-plus-square" />
            <NavBarOptions title="Create Playlist" />
          </li>
        </NavLink>

        <NavLink to="/likedSongs" className="active-option">
          <li className="liked">
            <div className="symbol fas fa-thumbs-up" />
            <NavBarOptions title="Liked Songs" />
          </li>
        </NavLink>
      </ul>

      <strong className="nav-bar__title lg-menu">Liked Playlists</strong>
      <hr />

      {likedStations.map((station) => {
        return (
          <NavLink
            to={`/station/${station._id}`}
            key={station._id}
            className="active-option lg-menu"
          >
            <li>
              <NavBarOptions title={station.name} />
            </li>
          </NavLink>
        )
      })}

      <strong className="nav-bar__title lg-menu">Activity</strong>
      <hr className="lg-menu" />
      <ActivityLog className="lg-menu" />
    </nav>
  )
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
  }
}

const mapDispatchToProps = {}

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(_NavBar)
