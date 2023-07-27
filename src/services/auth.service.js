import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
  },
});

class AuthService {
  BASE_URL = process.env.REACT_APP_BASE_URL;

  async register(firstName, lastName, username, password) {
    let data = JSON.stringify({
      firstName,
      lastName,
      username,
      password,
    });

    return await instance.post(`${this.BASE_URL}register`, data);
  }

  async login(username, password) {
    let data = JSON.stringify({
      username,
      password,
    });

    return await instance.post(`${this.BASE_URL}login`, data);
  }
}

export default AuthService;
