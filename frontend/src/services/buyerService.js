import { axiosInstance as axios } from './axiosInstance'


export const getProfile = async () => {
    try {
       const response = await axios.get('/buyer/profile');

       return response.data
    } catch (error) {
      throw error.response.data 
    }
}