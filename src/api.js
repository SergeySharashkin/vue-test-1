import axios from 'axios';
export const loadUser = async () => {
  try {
    const response = await axios.get("https://random-data-api.com/api/users/random_user");
    return  response.data;
  } catch (error) {
    console.log(error.message);
    
  
  }
}
export const loadBeer = async () => {
  try {
    const response = await axios.get("https://random-data-api.com/api/beer/random_beer");
    return  response.data;
  } catch (error) {
    console.log(error.message);
    
  
  }
}
