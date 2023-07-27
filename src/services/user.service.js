import ProtectedService from "./protected.service";

class UserService extends ProtectedService {
  BASE_URL = process.env.REACT_APP_BASE_URL;

  async getUser(username) {
    return await this.get(`${this.BASE_URL}users/${username}`);
  }
}

export default UserService;
