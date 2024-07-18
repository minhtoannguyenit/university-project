import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Replace with your actual API URL

class AuthService {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/sign-in`, { email, password });
      if (response.data.access_token) {
        sessionStorage.setItem('user_token', response.data.access_token);
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async me() {
    try {
      const token = sessionStorage.getItem('user_token');
      const response = await axios.get(`${API_URL}/api/v1/users/me`, { headers: { 'Authorization': 'Bearer ' + token }});
      if (response.data.id) {
        sessionStorage.setItem('current_user', JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
