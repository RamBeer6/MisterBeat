const initialState = {
    activities: [],
}

export function activitylogReducer(state = initialState, action) {
    let activities;

    switch (action.type) {
        case 'ADD_ACTIVITY_LOG':
            activities = [action.activitylog, ...state.activities]
            return { ...state, activities }
        case 'SET_ACTIVITY_LOG':
            activities = action.activitylog
            return { ...state, activities }
        default:
            return state;
    }
}