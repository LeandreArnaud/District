const initialState = {token: null}

function tokenReducer(state = initialState, action){
    let nextState

    switch (action.type) {
        case 'REFRESH_TOKEN':
            nextState = {
                ...state,
                token: action.value
            }
            return nextState
        case 'REFRESH__REFRESHTOKEN':
            nextState = {
                ...state,
                refreshToken: action.value
            }
            return nextState
        default:
            return state
    }
}

export default tokenReducer