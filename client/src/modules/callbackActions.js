export const pushCode = (code) => dispatch => {
    dispatch({
        type: 'PUSH_CODE',
        payload: code
    })
}