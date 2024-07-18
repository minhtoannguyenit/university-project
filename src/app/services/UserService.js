import axios from 'axios';

const API_URL = 'http://localhost:8080';

class UserService {
  async create(obj) {
    try {
      const headers = {
        'Authorization': 'Bearer ' + sessionStorage.getItem('user_token')
      };
      const response = await axios.post(`${API_URL}/api/v1/users/search`, obj, { headers: headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async list() {
    try {
      const headers = {
        'Authorization': 'Bearer ' + sessionStorage.getItem('user_token')
      };
      const response = await axios.get(`${API_URL}/api/v1/users/search`, { headers: headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getId(id) {
    try {
      const headers = {
        'Authorization': 'Bearer ' + sessionStorage.getItem('user_token')
      };
      const response = await axios.get(`${API_URL}/api/v1/users/${id}`, { headers: headers});
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async edit(id, obj) {
    try {
      const headers = {
        'Authorization': 'Bearer ' + sessionStorage.getItem('user_token')
      };
      const response = await axios.put(`${API_URL}/api/v1/users/${id}`, obj, { headers: headers});
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const headers = {
        'Authorization': 'Bearer ' + sessionStorage.getItem('user_token')
      };
      const response = await axios.delete(`${API_URL}/api/v1/users/${id}`, { headers: headers});
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();