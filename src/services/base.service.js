import axios from "axios";

class BaseService {
  api = axios.create({
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  BASE_URL = process.env.REACT_APP_BASE_URL;

  async get(url, config) {
    const response = await this.api.get(url, config);
    return response;
  }

  async post(url, data, config) {
    const response = await this.api.post(url, data, config);
    return response;
  }

  async patch(url, data, config) {
    const response = await this.api.patch(url, data, config);
    return response;
  }

  async delete(url, config) {
    const response = await this.api.delete(url, config);
    return response;
  }
}

export default BaseService;
