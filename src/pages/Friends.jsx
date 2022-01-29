import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socket.service'
import { loadUsers, addFollow } from '../store/actions/user.action'

import { UserPreview } from '../cmps/UserPreview'

function _Friends({ user, users, loadUsers, addFollow }) {

  useEffect(() => {
    loadUsers()
  }, [])

  const onAddFollow = async (userId) => {
    console.log('add follow:' , userId);
    await addFollow(userId)
    socketService.emit('addFollow', user._id)
  }

  return (
    <section className="friends">
        {users?.map(user => {
            return <UserPreview key={user._id} user={user} onAddFollow={onAddFollow} />
        })}
    </section>)
}

const mapStateToProps = (state) => {
  return {
    user: state.userModule.user,
    users: state.userModule.users,
  }
}

const mapDispatchToProps = {
  loadUsers,
  addFollow
}

export const Friends = connect(mapStateToProps, mapDispatchToProps )(_Friends)
