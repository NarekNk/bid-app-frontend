import React, { useState } from "react";
import css from "./Login.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { getFormData } from "../../utils/helpers";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useDispatch } from "react-redux";
import { setUsername } from "../../features/User/userSlice";

const authService = new AuthService();

const Login = () => {
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateFields = (formData) => {
    let hasErrors = false;

    if (formData.username.length === 0) {
      errors.username = "Username is required.";
      hasErrors = true;
    } else {
      errors.username = "";
    }
    if (formData.password.length === 0) {
      errors.password = "Password is required.";
      hasErrors = true;
    } else {
      errors.password = "";
    }

    setErrors({ ...errors });

    return hasErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = getFormData(e);

    const hasErrors = validateFields(formData);

    if (!hasErrors) {
      authService
        .login(formData.username, formData.password)
        .then((res) => {
          const { accessToken, refreshToken } = res.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("username", formData.username);

          dispatch(setUsername(formData.username));

          navigate(ROUTES.PROFILE);
          setError("");
        })
        .catch((err) => {
          setError("Username or password is incorrect.");
          console.log(err);
        });
    }
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Login</h2>

      {error.length > 0 && <p className={css.error}>{error}</p>}
      <form className={css.form} onSubmit={onSubmit}>
        <Input
          type="text"
          label="Username"
          fieldName="username"
          error={errors.username}
        />
        <Input
          type="password"
          label="Password"
          fieldName="password"
          error={errors.password}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
