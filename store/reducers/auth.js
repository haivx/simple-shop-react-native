import { LOGIN, SIGNUP } from '../actions/auth'


const initialState = {}

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                userInfo: action.userInfo
            }
        default:
            return state;
    }
}