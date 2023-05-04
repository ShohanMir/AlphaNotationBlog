import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import Link from "next/link";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "tanmoy",
    email: "tanmoysumon@gmail.com",
    password: "1234567",
    loading: false,
    error: "",
    message: "",
    showForm: "",
  });
  const { name, email, password, error, loading, message, showForm } = values;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ name, email, password, error, loading, message, showForm });
    ////
  };
  const handleChange = (input) => (e) => {
    setValues({ ...values, error: false, [input]: e.target.value });
  };
  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <MDBIcon
                  fas
                  icon="cubes fa-3x me-3"
                  style={{ color: "#ff6219" }}
                />
                <span className="h1 fw-bold mb-0">
                  Welcome to Alpha Notation Blog
                </span>
              </div>

              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Please Sign Up to explore
              </h5>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  value={name}
                  onChange={handleChange("name")}
                  wrapperClass="mb-4"
                  label="Enter Your Name"
                  id="formControlLg"
                  type="name"
                  size="lg"
                />

                <MDBInput
                  value={email}
                  onChange={handleChange("email")}
                  wrapperClass="mb-4"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                />
                <MDBInput
                  value={password}
                  onChange={handleChange("password")}
                  wrapperClass="mb-4"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                />
                <MDBBtn className="mb-4 px-5" color="dark" size="lg">
                  Sign Up
                </MDBBtn>
              </form>

              <a className="small text-muted" href="#!">
                Forgot password?
              </a>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Already have an account?{" "}
                <Link href="/signin" style={{ color: "#393f81" }}>
                  Login here
                </Link>
              </p>

              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignupComponent;
