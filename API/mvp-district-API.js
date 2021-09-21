import config from "../config.json"

const URL = config.Backend_URL



export function get_token (email, passsword) {
  const url = URL+'token'

  // Build formData object.
  let formData = new FormData();
  formData.append('email', email);
  formData.append('password', passsword);

  return fetch(url, {
    method: 'post',
    body: formData
  })
}

export function refresh_token (refresh_token) {
  const url = URL+'token'

  // Build formData object.
  let formData = new FormData();
  formData.append('refreshToken', refresh_token);

  return fetch(url, {
    method: 'post',
    body: formData
  })
}


export function signUp (email, passsword) {
  const url = URL+'signup'

  // Build formData object.
  let formData = new FormData();
  formData.append('email', email);
  formData.append('password', passsword);

  return fetch(url, {
    method: 'post',
    body: formData
  })
}



export function get_random_adress (token) {
  const url = URL+'get_random_adress'

  let headerData = new Headers()
  headerData.append('authorization', token)

  return fetch(url, {
    method:'get',
    headers: headerData
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}



export function get_evaluation (token, id, lat, lon) {
    const url = URL+'get_evaluation'

    let headerData = new Headers()
    headerData.append('authorization', token)
    headerData.append('ID', id)
    headerData.append('lat', lat)
    headerData.append('lon', lon)

    return fetch(url, {
      method:'get',
      headers: headerData
    })
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }


export function get_account_info (token) {
  const url = URL+'account_info'

  let headerData = new Headers()
  headerData.append('authorization', token)

  return fetch(url, {
    method:'get',
    headers: headerData
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}


