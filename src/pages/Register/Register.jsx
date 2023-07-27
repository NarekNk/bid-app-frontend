import React, { useState } from "react";
import css from "./Register.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { getFormData } from "../../utils/helpers";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const authService = new AuthService();

const Register = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = (formData) => {
    let hasErrors = false;
    if (formData.firstName.length === 0) {
      errors.firstName = "First name is required.";
      hasErrors = true;
    } else {
      errors.firstName = "";
    }
    if (formData.lastName.length === 0) {
      errors.lastName = "Last name is required.";
      hasErrors = true;
    } else {
      errors.lastName = "";
    }
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = getFormData(e);

    const hasErrors = validateFields(formData);

    if (!hasErrors) {
      const res = await authService.register(
        formData.firstName,
        formData.lastName,
        formData.username,
        formData.password
      );

      if (res.status === 200) {
        navigate(ROUTES.LOGIN);
      }
    }
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Register</h2>

      <form className={css.form} onSubmit={onSubmit}>
        <Input
          type="text"
          label="First Name"
          fieldName="firstName"
          error={errors.firstName}
        />
        <Input
          type="text"
          label="Last Name"
          fieldName="lastName"
          error={errors.lastName}
        />
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
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
