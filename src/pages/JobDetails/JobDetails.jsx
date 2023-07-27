import React, { useEffect, useState } from "react";
import css from "./JobDetails.module.scss";
import JobService from "../../services/job.service";
import { useParams } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import BidService from "../../services/bid.service";
import { useSelector } from "react-redux";

const jobService = new JobService();
const bidService = new BidService();

const JobDetails = () => {
  const { id } = useParams();
  const { uuid } = useSelector((state) => state.user);
  const [bid, setBid] = useState(0);
  const [bidError, setBidError] = useState("");
  const [job, setJob] = useState({});
  const [bidList, setBidList] = useState([]);

  const makeBid = () => {
    if (bid) {
      bidService.makeBid(bid, +id, uuid).then(() => {
        refreshBids();
      });
    } else {
      setBidError("Enter a valid amount");
    }
  };

  const refreshBids = () => {
    bidService.getJobBids(id).then((res) => {
      setBidList(res.data);
    });
  };

  useEffect(() => {
    jobService.getJobById(id).then((res) => {
      setJob(res.data);
    });
    bidService.getJobBids(id).then((res) => {
      setBidList(res.data);
    });
  }, [id]);

  return (
    <div className={css.wrapper}>
      <div className={css.jobDetails}>
        <h2 className={css.title}>{job.title}</h2>
        <p>{job.description}</p>
        <p>by @{job.user?.username}</p>

        <div className={css.makeBidContainer}>
          <h3>Make a bid!</h3>
          <Input
            value={bid}
            onChange={(e) => {
              setBid(+e.target.value);
              setBidError("");
            }}
            type="number"
            error={bidError}
          />

          <Button onClick={makeBid}>Confirm Bid</Button>
        </div>
      </div>
      <div className={css.bidListWrapper}>
        <div className={css.titleWithButton}>
          <h3>Bid List</h3>
          <Button onClick={refreshBids} variant="secondary">
            Refresh Bids
          </Button>
        </div>
        <div className={css.bidList}>
          {bidList.map((userBid) => {
            return (
              <div key={`${userBid.uuid}`} className={css.bidContainer}>
                <p>{userBid.amount}</p>
                <p>Bidder: {userBid.user?.username}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
