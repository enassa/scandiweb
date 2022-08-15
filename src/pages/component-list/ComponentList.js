import React, { Component } from "react";
import ProductCard from "../../components/ProductCard";
import styled from "@emotion/styled";
import { FlexGrid, GridView } from "../../components/styled/layoutComponents";
import ItemAdderCard from "../../components/ItemAdderCard";
import ProductInfoCard from "../../components/ProductInfoCard";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100%;
`;
export default class ComponentList extends Component {
  render() {
    return (
      <Wrapper>
        {/* <Navbar /> */}
        <GridView>
          <Button> ORDER </Button>
          {/* <ProductInfoCard/> */}
          <ItemAdderCard />
        </GridView>
      </Wrapper>
    );
  }
}
