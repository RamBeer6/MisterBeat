import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socket.service'

import { getActivities } from '../store/actions/activity.log.action'

function _ActivityLog({ getActivities, activities }) {
  // const [activities, setActivities] = useState([])
  // const [isScroll, setIsScroll] = useState(false)

  useEffect(() => {
    loadActivityLog()
    socketService.on('activityAdded', (activity) => {
      console.log('activityAdded' , activity);
      loadActivityLog()
    })
  }, [])

  const loadActivityLog = async () => {
    try {
      await getActivities()
    } catch (err) {
      console.log(err)
    }
  }

  if (!activities || !activities.length)
    return <h5 className="lg-menu" style={{display: 'block', paddingLeft: '10px'}}>No activites</h5>

  return (
    <section className="activity-log lg-menu">
      <ul className="activity-container">
        {activities.map((activity, idx) => (
          <li key={activity._id} className="activity-item">
            <div>
                <span className="activity-user">{activity.createdBy.userName} - </span>
                {activity?.stationInfo && <span><span className="activity-type">{activity.type}:</span> {activity.stationInfo.name}</span>}
                {activity.songTitle && <span>{activity.songTitle.substring(0, 20)}</span>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function mapStateToProps(state) {
  return {
    activities: state.activitylogModule.activities,
  }
}

const mapDispatchToProps = {
  getActivities,
}

export const ActivityLog = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ActivityLog)
