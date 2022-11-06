import React from "react";
import "./LoginPage.css";
import "./App.css";
import { Formik, setNestedObjectValues } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function SignUp() {
  // Creating schema
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    username: Yup.string().required("username is a required field"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });

  const navigate = useNavigate();
  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          console.log("here entered");

          console.log("values", values);
          const uniqid = new Date().getTime();

          if (localStorage.getItem("user") === null) {
            localStorage.setItem(
              "user",
              JSON.stringify([{ ...values, id: uniqid }])
            );
          } else {
            console.log("here");
            const userData = JSON.parse(localStorage.getItem("user"));
            userData.push({ ...values, id: uniqid });
            localStorage.setItem("user", JSON.stringify(userData));
          }
          if (values) {
            navigate("/login");
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
                <span>Sign Up</span>
                <input
                  type="username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  placeholder="Enter username"
                  className="form-control inp_text"
                  id="username"
                />
                <p className="error">
                  {errors.username && touched.username && errors.username}
                </p>

                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email id"
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
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default SignUp;
