import React from "react";
import { Link } from "react-router-dom";

import ErrorImg from "../Assets/404-page.jpg";
import { Button } from "../styledComponents/globalStyles";
import { Main } from "styledComponents/globalStyles";

export const NotFound = () => {
  return (
    <Main>
      <Container>
        <Title>404</Title>
        <SubTitle>Sorry, we could not find this page</SubTitle>
        <Link to="/">
          <Button>Go back to start</Button>
        </Link>
        <Img src={ErrorImg} />
      </Container>
    </Main>
  );
};

import styled from "styled-components/macro";

export const Title = styled.h1`
  font-size: 80px;
  color: #fff;
  padding-top: 16px;
`;

export const SubTitle = styled.h2`
  font-size: 20px;
  color: #fff;
  margin-bottom: 8px;
`;

export const Img = styled.img`
  width: 500px;
  border-radius: 30px;
  margin-top: 10px;

  @media screen and (max-width: 668px) {
    width: 350px;
  }
`;

export const Container = styled.section`
  display: flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
