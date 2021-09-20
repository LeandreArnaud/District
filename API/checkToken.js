import * as SecureStore from 'expo-secure-store';


async function store_token(token){
    await SecureStore.setItemAsync('token',token);
  }
async function store_refresh_token(ref_token){
await SecureStore.setItemAsync('refresh_token',ref_token);
}

async function read_token(){
const token = await SecureStore.getItemAsync('token');
return token
}
async function read_refresh_token(){
const ref_token = await SecureStore.getItemAsync('refresh_token');
return ref_token
}