import React from "react";
import css from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../../features/User/userSlice";

const Header = () => {
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogOut = () => {
    localStorage.removeItem("username");
    dispatch(setUsername(""));
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className={css.header}>
      <div></div>
      <nav className={css.navbar}>
        {username && username.length > 0 ? (
          <>
            <Link to={ROUTES.JOBS} className={css.link}>
              Jobs
            </Link>
            <Link to={ROUTES.PROFILE} className={css.link}>
              Profile
            </Link>
            <button type="button" onClick={onLogOut} className={css.logoutBtn}>
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <Link to={ROUTES.LOGIN} className={css.link}>
              Login
            </Link>
            <Link to={ROUTES.REGISTER} className={css.link}>
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
