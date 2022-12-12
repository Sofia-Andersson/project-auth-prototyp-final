import React from "react";
import styled from "styled-components/macro";

export const Button = styled.button`
  cursor: pointer;
  background-color: ${(props) => (props.Mode ? "rgb(126,100,63)" : "transparent")};
  color: #fff;
  border: 3px solid ${(props) => (props.Mode ? "rgb(126,100,63)" : "#fff")};
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 20px;
  transition: transform 80ms ease-in;
  padding: 12px 24px;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  .ghost {
    background-color: transparent;
    border-color: #ffffff;
  }
`;

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;