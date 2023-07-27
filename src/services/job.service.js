import ProtectedService from "./protected.service";

class JobService extends ProtectedService {
  BASE_URL = process.env.REACT_APP_BASE_URL;

  async getAllJobs() {
    return await this.get(`${this.BASE_URL}jobs/get_all_jobs`);
  }

  async getJobsByUser(username) {
    return await this.get(`${this.BASE_URL}jobs/get_all_jobs_by_user`, {
      params: {
        username,
      },
    });
  }

  async getJobById(id) {
    return await this.get(`${this.BASE_URL}jobs/get_Job_by_id`, {
      params: {
        id,
      },
    });
  }

  async postJob(title, description, uuid) {
    const data = JSON.stringify({
      title,
      description,
      userId: uuid,
    });

    return await this.post(`${this.BASE_URL}jobs/create`, data);
  }
}

export default JobService;
