import axios from 'axios';

const API_URL = 'http://localhost:8080';

class SurveyService {
  async create(obj) {
    try {
      const headers = {
        'Authorization': 'Bearer ' + sessionStorage.getItem('user_token')
      };
      const response = await axios.post(`${API_URL}/api/v1/surveys`, obj, { headers: headers });
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
      const response = await axios.get(`${API_URL}/api/v1/surveys`, { headers: headers });
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
      const response = await axios.get(`${API_URL}/api/v1/surveys/${id}`, { headers: headers});
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async edit(id) {
    try {
      const headers = {
        'Authorization': 'Bearer ' + sessionStorage.getItem('user_token')
      };
      const response = await axios.post(`${API_URL}/api/v1/surveys/${id}`, { headers: headers});
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
      const response = await axios.delete(`${API_URL}/api/v1/surveys/${id}`, { headers: headers});
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new SurveyService();