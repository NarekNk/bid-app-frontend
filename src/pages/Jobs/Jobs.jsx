import React, { useEffect, useState } from "react";
import css from "./Jobs.module.scss";
import { useDispatch } from "react-redux";
import JobService from "../../services/job.service";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const jobService = new JobService();

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    jobService.getAllJobs().then((res) => {
      setJobs(res.data);
    });
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>All Jobs</h2>
      <div className={css.jobsContainer}>
        {jobs.map((job, index) => {
          return (
            <div
              className={css.job}
              onClick={() => navigate(`${ROUTES.JOBS}/${job.id}`)}
              key={`${job.title}-${index}`}
            >
              <p className={css.jobTitle}>{job.title}</p>
              <p className={css.jobDescription}>{job.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Jobs;
