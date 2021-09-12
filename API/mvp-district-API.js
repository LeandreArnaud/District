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



export function get_random_adress () {
  const url = URL+'get_random_adress/'
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}


export function get_evaluation (id, lat, lon) {
    const url = URL+'get_evaluation/'+id+'/'+lat+'/'+lon
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }