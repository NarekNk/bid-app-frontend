import ProtectedService from "./protected.service";

class BidService extends ProtectedService {
  BASE_URL = process.env.REACT_APP_BASE_URL;

  async getJobBids(jobId) {
    return await this.get(`${this.BASE_URL}bids/get_all_job_bids`, {
      params: {
        jobId,
      },
    });
  }

  async makeBid(amount, jobId, userId) {
    const data = JSON.stringify({
      amount,
      jobId,
      userId,
    });

    return await this.post(`${this.BASE_URL}bids/create`, data);
  }
}

export default BidService;
