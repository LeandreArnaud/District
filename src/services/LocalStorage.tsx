import AsyncStorage from '@react-native-async-storage/async-storage';

interface city {
  COM: string;
  CP: string;
  COM_NORM: string;
  LAT: number;
  LON: number;
};

type district = {
  shortname: string;
  centerLat: number;
  centerLon: number;
  cities: city[];
};
type districts = district[]

export const resetDistricts = async () => {
  try {
    await AsyncStorage.removeItem('Districts')
  } catch (e) {
    console.log('error when reseting district local storage');
  }
}

const storeDistricts = async (value: districts) => {
    try {
      await AsyncStorage.setItem('Districts', JSON.stringify(value))
    } catch (e) {
      console.log('error when saving district to local storage');
    }
}

export const addDistrict = async (value: district) => {
  try {
    const currentDistrict = await getDistricts()
    if (currentDistrict){
      await storeDistricts([...currentDistrict, value])
    }
    else {
      await storeDistricts([value])
    }
  } catch (e) {
    console.log('error when adding district to local storage');
  }
}

export const getDistricts = async () => {
  try {
    const value = await AsyncStorage.getItem('Districts')
    if(value !== null) {
      return JSON.parse(value)
    }
  } catch(e) {
      console.log('error when reading district in local storage');
  }
  