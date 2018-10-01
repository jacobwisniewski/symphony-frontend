export const logout = () => dispatch => {
    dispatch({
        type: 'USER_LOGOUT'
    })
}