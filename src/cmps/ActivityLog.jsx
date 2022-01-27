import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getActivities } from "../store/actions/activity.log.action";

function _ActivityLog({ getActivities, activities }) {
    // const [activities, setActivities] = useState([])
    const [isScroll, setIsScroll] = useState(false);

    useEffect(() => {
        loadActivityLog();
    }, []);

    useEffect(() => {
        console.log(activities);
    }, [activities]);

    const loadActivityLog = async () => {
        try {
            await getActivities();
        } catch (err) {
            console.log(err);
        }
    };

    if(!activities || !activities.length) return <span className="lg-menu">No activites</span>

    return (
        <section className="activity-log lg-menu">
            <ul>
                {activities.map((activity, idx) => (
                    <li key={activity._id}>
                        {/* <span >{activity._id}</span> */}
                        {/* <span >{activity.createdBy.userName}</span> | */}
                        <span>{activity.songTitle.substring(0, 20)}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function mapStateToProps(state) {
    return {
        activities: state.activitylogModule.activities,
    };
}

const mapDispatchToProps = {
    getActivities,
};

export const ActivityLog = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ActivityLog);
