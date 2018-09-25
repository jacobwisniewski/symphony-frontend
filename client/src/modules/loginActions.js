export const FETCH_URL_BEGIN = "FETCH_URL_BEGIN";
export const FETCH_URL_SUCCESS = "FETCH_URL_SUCCESS";

export const fetchUrlBegin = () => ({
  type: FETCH_URL_BEGIN
});

export const fetchUrlSucess = url => ({
  type: FETCH_URL_SUCCESS,
  payload: { url }
});

export function fetchUrl() {
  return dispatch => {
    dispatch(fetchUrlBegin());
    fetch(url)
      .then(response => response.json())
      .then(data => {
          dispatch(fetchUrlSucess(data.url))
      });
  };
}
