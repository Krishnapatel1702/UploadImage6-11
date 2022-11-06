import React, { useState } from "react";
import "./LoginPage.css";
import "./App.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [flag, setFlag] = useState(false);
  // Creating schema
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });

  const navigate = useNavigate();

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          const data = JSON.parse(localStorage.getItem("user"));

          const { email, password } = values;

          const matched = data.find(
            (val) => val.email === email && val.password === password
          );

          console.log("data", data, matched);
          if (matched) {
            localStorage.setItem("email", email);
            navigate("/home");
          } else {
            setFlag(!flag);
            console.log("username or password is wrong found");
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div className="form">
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email id / username"
                  className="form-control inp_text"
                  id="email"
                />
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                <button type="submit">Login</button>
                {flag ? (
                  <p className="unf">username or password is wrong!!!</p>
                ) : (
                  <></>
                )}
                <p>
                  Don't you have account?
                  <a
                    href=""
                    className="sign_up"
                    onClick={() => navigate("/signup")}
                  >
                    {" "}
                    Sign up here
                  </a>
                </p>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default LoginPage;
