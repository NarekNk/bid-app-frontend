import React, { useEffect, useState } from "react";
import css from "./Profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../../services/user.service";
import {
  setFirstName,
  setLastName,
  setUuid,
} from "../../features/User/userSlice";
import JobService from "../../services/job.service";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { getFormData } from "../../utils/helpers";
import { ROUTES } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

const userService = new UserService();
const jobService = new JobService();

const Profile = () => {
  const [userJobs, setUserJobs] = useState([]);
  const { username, firstName, lastName, uuid } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = getFormData(e);

    jobService.postJob(formData.title, formData.description, uuid).then(() => {
      jobService.getJobsByUser(username).then((res) => {
        setUserJobs(res.data);
      });
    });
  };

  useEffect(() => {
    if (username) {
      userService.getUser(username).then((res) => {
        dispatch(setFirstName(res.data.firstName));
        dispatch(setLastName(res.data.lastName));
        dispatch(setUuid(res.data.uuid));
      });

      jobService.getJobsByUser(username).then((res) => {
        setUserJobs(res.data);
      });
    }
  }, [username, dispatch]);

  return (
    <div className={css.wrapper}>
      <div className={css.profileTop}>
        <div className={css.profilePic}></div>
        <div>
          <p>@{username}</p>
          <p>
            {firstName} {lastName}
          </p>
        </div>
      </div>
      <div>
        <form className={css.jobForm} onSubmit={onSubmit}>
          <Input label="Job Title" fieldName="title" />
          <div className={css.textarea}>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" rows="10"></textarea>
          </div>
          <Button type="submit">Add Job</Button>
        </form>
      </div>
      <div className={css.jobsContainer}>
        {userJobs.map((job, index) => {
          return (
            <div
              className={css.job}
              key={`${job.title}-${index}`}
              onClick={() => navigate(`${ROUTES.JOBS}/${job.id}`)}
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

export default Profile;
