import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import styled from "@emotion/styled";
import { Navigate, Outlet } from "react-router-dom";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  height: 100%;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-dirextion: row;
  justify-content: center;
  width: 100%;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-dirextion: row;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
export default class Home extends Component {
  render() {
    return (
      <PageWrapper>
        <NavWrapper>
          <Navbar />
        </NavWrapper>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </PageWrapper>
    );
  }
}
