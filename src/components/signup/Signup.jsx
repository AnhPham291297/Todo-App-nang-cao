import React from "react";
import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  // const values = {
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string()
        .required("Required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Password must be 7-19 characters and contain at least one letter, one number and a special character"
        ),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      // console.log(values);
      navigate("/login", {
        replace: true,
        state: values,
      });
    },
  });

  return (
    <div className={styles.signupContainer}>
      <div className={styles.imageContainer}>
        <img
          src="https://cdn.pixabay.com/photo/2021/12/27/14/04/paper-rocket-6897262_960_720.png"
          alt=""
        />
      </div>
      <div className={styles.signup}>
        <h1 className={styles.title}>Sign Up</h1>

        <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className={styles.input}
            value={formik.values.firstName}
            placeholder="firstname"
            onChange={formik.handleChange}
          />
          {formik.errors.firstName && (
            <p className={styles.errorMsg}>{formik.errors.firstName}</p>
          )}

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className={styles.input}
            value={formik.values.lastName}
            placeholder="lastname"
            onChange={formik.handleChange}
          />
          {formik.errors.lastName && (
            <p className={styles.errorMsg}>{formik.errors.lastName}</p>
          )}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            value={formik.values.email}
            placeholder="name@gmail.com"
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <p className={styles.errorMsg}>{formik.errors.email}</p>
          )}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="text"
            className={styles.input}
            value={formik.values.password}
            placeholder="6+ Characters, 1 Capital letter"
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <p className={styles.errorMsg}>{formik.errors.password}</p>
          )}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="text"
            className={styles.input}
            value={formik.values.confirmPassword}
            placeholder="Comfirm your password"
            onChange={formik.handleChange}
          />
          {formik.errors.confirmPassword && (
            <p className={styles.errorMsg}>{formik.errors.confirmPassword}</p>
          )}

          <button type="submit">Create an account</button>
        </form>

        <p className={styles.text}>
          Already a member? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
