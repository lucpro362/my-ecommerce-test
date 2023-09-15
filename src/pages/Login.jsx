import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./stylepage.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

const Login = ({ onLogin }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const history = useHistory();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        const user = {
          email: "tranluc@gmail.com",
          password: "Qaz123@@",
          role: "admin",
        };

        localStorage.setItem("user", JSON.stringify(user));
        onLogin(user);

        history.push("/");
      } else {
        console.error("Lỗi đăng nhập");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
    setSubmitting(false);
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h1 className="text-center">Đăng nhập</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form as={BootstrapForm}>
              <BootstrapForm.Group controlId="email">
                <BootstrapForm.Label>Email</BootstrapForm.Label>
                <Field
                  type="email"
                  name="email"
                  as={BootstrapForm.Control}
                  placeholder="Nhập email"
                  className="mb-2"
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <div className="text-danger">{msg}</div>
                  )}
                </ErrorMessage>
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="password">
                <BootstrapForm.Label>Mật khẩu</BootstrapForm.Label>
                <Field
                  type="password"
                  name="password"
                  as={BootstrapForm.Control}
                  placeholder="Nhập mật khẩu"
                  className="mb-2"
                />
                <ErrorMessage name="password">
                  {(msg) => (
                    <div className="text-danger">{msg}</div>
                  )}
                </ErrorMessage>
              </BootstrapForm.Group>

              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Đăng nhập
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
