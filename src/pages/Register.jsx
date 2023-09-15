import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button, Alert } from "react-bootstrap";
import "./stylepage.css";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Vui lòng nhập tên người dùng"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận phải trùng với mật khẩu")
    .required("Vui lòng nhập mật khẩu xác nhận"),
});

const Register = ({ users, onRegister }) => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const checkUserExists = (email) => {
    return users.some((user) => user.email === email);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (checkUserExists(values.email)) {
        setRegistrationError("Email này đã được đăng ký trước đó.");
        setRegistrationSuccess(false);
      } else {
        const response = await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
            role: "customer",
          }),
        });

        if (response.ok) {
          setRegistrationSuccess(true);
          setRegistrationError(null);
          onRegister(values);
          resetForm();
        } else {
          const errorData = await response.json();
          setRegistrationError(`Lỗi đăng ký: ${errorData.message}`);
          setRegistrationSuccess(false);
        }
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      setRegistrationError("Đã xảy ra lỗi khi đăng ký.");
      setRegistrationSuccess(false);
    }
    setSubmitting(false);
  };

  return (
    <div className="register-page">
      <div className="form-container">
        <h1 className="text-center">Đăng ký</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form as={BootstrapForm}>
              {registrationSuccess && (
                <Alert variant="success">Đăng ký thành công!</Alert>
              )}
              {registrationError && (
                <Alert variant="danger">{registrationError}</Alert>
              )}

              <BootstrapForm.Group controlId="username">
                <BootstrapForm.Label>Tên người dùng</BootstrapForm.Label>
                <Field
                  type="text"
                  name="username"
                  as={BootstrapForm.Control}
                  placeholder="Nhập tên người dùng"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="email">
                <BootstrapForm.Label>Email</BootstrapForm.Label>
                <Field
                  type="email"
                  name="email"
                  as={BootstrapForm.Control}
                  placeholder="Nhập email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="password">
                <BootstrapForm.Label>Mật khẩu</BootstrapForm.Label>
                <Field
                  type="password"
                  name="password"
                  as={BootstrapForm.Control}
                  placeholder="Nhập mật khẩu"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="confirmPassword">
                <BootstrapForm.Label>Xác nhận mật khẩu</BootstrapForm.Label>
                <Field
                  type="password"
                  name="confirmPassword"
                  as={BootstrapForm.Control}
                  placeholder="Nhập lại mật khẩu"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <div className="register-button">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Đăng ký
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
