import config from "../config.json";

const URL = config.Backend_URL;

interface adress {
  id: string;
  num: string;
  rue: string;
  cp: string;
  com: string;
};

interface evaluation {
  distance: number;
  lat: number;
  lon: number;
  score: number;
};

interface guess {
  id: string;
  lat: number;
  lon: number;
}

export const getRandomAdress = (coms: string): Promise<adress> => {
  const url = URL+'/get_random_adress';

  const headerData = new Headers();
  headerData.append('coms', coms);

  return fetch(url, {
    method:'get',
    headers: headerData
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export const getEvaluation = (guess: guess): Promise<evaluation> => {
  const url = URL+'/get_evaluation';

  const headerData = new Headers();
  headerData.append('ID', guess.id);
  headerData.append('lat', guess.lat.toString());
  headerData.append('lon', guess.lon.toString());

  return fetch(url, {
    method:'get',
    headers: headerData
  })
    .then(response => response.json())
    .catch(error => console.error(error))
}