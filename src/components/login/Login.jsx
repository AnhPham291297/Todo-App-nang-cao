import React, { useState } from "react";
import styles from "./login.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();

  const [email, setEmail] = useState(location?.state?.email);
  const [password, setPassword] = useState(location?.state?.password);

  const validate = Yup.object({
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
  });

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainer}>
        <img
          src="https://cdn.pixabay.com/photo/2021/12/27/14/04/paper-rocket-6897262_960_720.png"
          alt=""
        />
      </div>
      <div className={styles.login}>
        <h1 className={styles.title}>Log In</h1>

        <Formik
          initialValues={{ email, password }}
          validationSchema={validate}
          onSubmit={(values, actions) => {
            console.log(values);
            alert("Logged in successfully");
            navigate("/", { replace: true, state: values });
          }}
          // enableReinitialize
        >
          {(props) => (
            <form
              className={styles.formContainer}
              onSubmit={props.handleSubmit}
            >
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                className={styles.input}
                placeholder="name@gmail.com"
                value={props.values.email || ""}
                onChange={props.handleChange}
              />
              {props.errors.email && (
                <p className={styles.errorMsg}>{props.errors.email}</p>
              )}

              <label>Password</label>
              <input
                id="password"
                name="password"
                type="text"
                className={styles.input}
                placeholder="6+ Characters, 1 Capital letter"
                value={props.values.password || ""}
                onChange={props.handleChange}
              />
              {props.errors.password && (
                <p className={styles.errorMsg}>{props.errors.password}</p>
              )}

              <button type="submit">Create an account</button>
            </form>
          )}
        </Formik>

        <p className={styles.text}>
          New User? <Link to="/signup">Sign up now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
