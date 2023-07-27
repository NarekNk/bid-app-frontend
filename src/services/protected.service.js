import BaseService from "./base.service";

class ProtectedService extends BaseService {
  BASE_URL = process.env.REACT_APP_BASE_URL;

  getAuthHeader = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) return `Bearer ${accessToken}`;
    return null;
  };

  refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    const res = await super.post(
      `${this.BASE_URL}refresh-token`,
      JSON.stringify({
        refreshToken,
      })
    );

    const { accessToken, refreshToken: newRefreshToken } = res.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  };

  makeProtectedRequest = async (fn) => {
    try {
      const Authorization = this.getAuthHeader();

      if (!Authorization) throw new Error("No Authorization");

      const authHeaders = {
        Authorization,
      };

      const res = await fn(authHeaders);

      return res;
    } catch (e) {
      this.clearAccessToken();

      await this.refreshToken();

      const Authorization = this.getAuthHeader();

      if (!Authorization) throw new Error("No Authorization");

      const authHeaders = {
        Authorization,
      };

      return await fn(authHeaders);
    }
  };

  clearAccessToken = () => {
    localStorage.removeItem("accessToken");
  };

  get = async (url, config) =>
    this.makeProtectedRequest(async (authHeaders) =>
      super.get(url, {
        headers: {
          ...authHeaders,
        },
        ...config,
      })
    );

  post = async (url, data, config) =>
    this.makeProtectedRequest(async (authHeaders) =>
      super.post(url, data, {
        headers: {
          ...authHeaders,
        },
        ...config,
      })
    );

  patch = async (url, data, config) =>
    this.makeProtectedRequest(async (authHeaders) =>
      super.patch(url, data, {
        headers: {
          ...authHeaders,
        },
        ...config,
      })
    );

  delete = async (url, config) =>
    this.makeProtectedRequest(async (authHeaders) =>
      super.delete(url, {
        headers: {
          ...authHeaders,
        },
        ...config,
      })
    );
}

export default ProtectedService;
