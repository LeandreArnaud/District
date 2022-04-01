import AsyncStorage from '@react-native-async-storage/async-storage';

type districts = {
    shortname: string,
    cities: {
        name: string,
        CP: string,
    }[]
}[]

export const storeDistricts = async (value: districts) => {
    try {
      await AsyncStorage.setItem('Districts', JSON.stringify(value))
    } catch (e) {
      console.log('error when saving district to local storage');
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
  }
  