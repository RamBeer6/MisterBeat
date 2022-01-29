import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socket.service'
import { loadUsers, addFollow, onSetMsg } from '../store/actions/user.action'

import { UserPreview } from '../cmps/UserPreview'

function _Friends({ user, users, loadUsers, addFollow, onSetMsg }) {
  useEffect(() => {
    loadUsers()
  }, [])

  const onAddFollow = async (followUser) => {
    try {
      await addFollow(followUser._id)
      socketService.emit('addFollow', user._id)
      onSetMsg('success', `Start following after ${followUser.userName}`)
    } catch (err) {
      onSetMsg('error', 'Something went wrong, please try again')
    }
  }

  return (
    <section className="friends">
      {users?.map((user) => {
        return (
          <UserPreview key={user._id} user={user} onAddFollow={onAddFollow} />
        )
      })}
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userModule.user,
    users: state.userModule.users,
  }
}

const mapDispatchToProps = {
  loadUsers,
  addFollow,
  onSetMsg,
}

export const Friends = connect(mapStateToProps, mapDispatchToProps)(_Friends)
