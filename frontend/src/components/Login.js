import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import visibleEye from "../Assets/visible-eye.png";
import unVisibleEye from "../Assets/unvisible-eye.png";

import { API_URL } from "../utils/urls";
import { user } from "../reducers/user";
import { Button } from "../styledComponents/globalStyles";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [switchMode, setSwitchMode] = useState("login");
  const [isPanelActive, setIsPanelActive] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const onToggleClick = () => {
    setErrorMessage("");
    setUsername("");
    setPassword("");
    setPasswordShown(false);
    if (switchMode === "login") {
      setSwitchMode("signup");
      setIsPanelActive(true);
    } else {
      setSwitchMode("login");
      setIsPanelActive(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL(switchMode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          setErrorMessage(data.response);
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };

  return (
    <SectionContainer>
      <div className={`container ${isPanelActive ? "right-panel-active" : ""}`}>
        <div className="signup-container sign-up-container">
          <FormContainer onSubmit={onFormSubmit}>
            <MobileContainer>
              <FormPMobile>Have an account already?</FormPMobile>
              <ButtonMobile
                type="button"
                onClick={onToggleClick}
                id="login"
                Mode
              >
                Login
              </ButtonMobile>
            </MobileContainer>
            <h1>Create account</h1>
            <FormP>Welcome!</FormP>
            <div className="input-container">
              <input
                className="input"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="user-label" htmlFor="username">
                Username
              </label>
            </div>
            <div className="input-container">
              <input
                className="input"
                id="password"
                type={!passwordShown ? "password" : "text"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="user-label" htmlFor="password">
                Password
              </label>
              <ShowPassword>
                <EyeButton type="button" onClick={togglePassword}>
                  <EyeSymbol src={passwordShown ? unVisibleEye : visibleEye} />
                </EyeButton>
              </ShowPassword>
            </div>
            <Button type="submit" Mode>
              Submit
            </Button>
            <ErrorMessageContainer>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </ErrorMessageContainer>
          </FormContainer>
        </div>
        <div className="signup-container login-container">
          <FormContainer onSubmit={onFormSubmit}>
            <MobileContainer>
              <FormPMobile>Create a new account?</FormPMobile>
              <ButtonMobile
                type="button"
                onClick={onToggleClick}
                id="signup"
                Mode
              >
                Signup
              </ButtonMobile>
            </MobileContainer>
            <h1>Log in</h1>
            <FormP>Welcome Back!</FormP>
            <div className="input-container">
              <input
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="user-label" htmlFor="username">
                Username
              </label>
            </div>
            <div className="input-container">
              <input
                className="input"
                type={passwordShown ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="user-label" htmlFor="password">
                Password
              </label>
              <ShowPassword>
                <EyeButton type="button" onClick={togglePassword}>
                  <EyeSymbol src={passwordShown ? unVisibleEye : visibleEye} />
                </EyeButton>
              </ShowPassword>
            </div>
            <Button type="submit" Mode>
              Login
            </Button>
            <ErrorMessageContainer>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </ErrorMessageContainer>
          </FormContainer>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="panel panel-left">
              <h2>Already a user?</h2>
              <InfoP>Please go to login page</InfoP>
              <Button type="button" onClick={onToggleClick} id="login">
                Login
              </Button>
            </div>
            <div className="panel panel-right">
              <h2>Create a new account?</h2>
              <InfoP>Click signup to create one</InfoP>
              <Button type="button" onClick={onToggleClick} id="signup">
                signup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export const SectionContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: -20px 0 50px;
`;

export const FormContainer = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const MobileContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 20px;
  }
`;

export const ButtonMobile = styled.button`
  display: none;
  cursor: pointer;
  color: #4b5b7c;
  font-size: 12px;
  border: none;
  background-color: #fff;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

export const FormPMobile = styled.p`
  color: #a7a7a7;
  font-size: 14px;
`;

export const FormP = styled.p`
  color: #a7a7a7;
  margin: 16px 0;
`;

export const InfoP = styled.p`
  color: #fff;
  margin: 16px 0;
`;

export const ErrorMessageContainer = styled.div`
  position: absolute;
  bottom: 40px;
  padding: 20px;

  @media (max-width: 768px) {
    bottom: 30px;
    padding: 0;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  align-self: center;
`;

export const ShowPassword = styled.div`
  position: absolute;
  left: 200px;
  top: -40;
  top: 8px;
`;

export const EyeButton = styled.button`
  border: none;
  background-color: #fff;
  cursor: pointer;
`;

export const EyeSymbol = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: -5px;
  left: -22px;
  opacity: 0.5;

  &:active,
  &:hover {
    opacity: 1;
  }
`;
