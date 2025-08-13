import { axiosInstance as axios } from './axiosInstance'

// Verify Sign up
export const signup = async (data) => {
  try {
    const response = await axios.post('/user/register' , data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Sign up failed!!!';
  }
};

// Verify buyer email
export const verifyEmail = async (email, otp) => {
  try {
    const response = await axios.post('/user/verify-email', { email, otp });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Email verification failed';
  }
};

export const resendEmail = async (email) => {
  try {
    const response = await axios.post('/user/resend-email', { email });
    return response?.data?.message || 'OTP is resend successfully';
  } catch (error) {
    throw error.response?.data?.error || "Failed to resend OTP. Please try again.";
  }
}
