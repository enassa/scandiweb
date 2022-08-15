import React, { Component } from "react";
import styled from "@emotion/styled";
import productImage from "../assets/images/pimage.png";
import kartIcon from "../assets/icons/kart-icon.png";
import { connect } from "react-redux";
import ProductInfoCard from "./ProductInfoCard";
import { keyframes } from "@emotion/react";

const moveRight = keyframes({
  from: {
    transform: "translateX(0px)",
    opacity: 0,
  },
  to: {
    transform: "translateX(30px)",
    opacity: 1,
  },
});
const moveLeft = keyframes({
  from: {
    transform: "translateX(0px)",
    opacity: 0,
  },
  to: {
    transform: "translateX(-30px)",
    opacity: 1,
  },
});
const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: start;
  position: relative;
  align-items: center;
  max-width: 386px;
  max-height: 444px;
  padding: 16px;
  cursor: pointer;
  &:hover > div > button {
    display: flex;
    top: -40px;
    opacity: 1;
  }
  &:hover {
    box-shadow: 0px 4px 35px 0px #a8acb030;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 374px;
  max-height: 90%;
  // position:relative;
`;
const DetailsContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 80%;
  margin-top: 16px;
  max-height: 74%;
  overflow-y: auto;
  background-color: rgb(255, 255, 255, 0.8);
`;
const ProductImage = styled.img`
  height: 100%;
  max-width: 98%;
`;
const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
  justify-content: center;
  align-items: start;
  cursor: pointer;
  margin-top: 12px;
  margin-bottom: 10px;
  font-size: 18px;
  position: relative;
`;
const KartIconContainer = styled.button`
  padding: 30px;
  background-color: #5ece7b;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#5ECE7B")};
  border-radius: 100px;
  border: 0px;
  padding: 14px;
  cursor: pointer;
  position: absolute;
  right: 30px;
  top: -20px;
  opacity: 0;
  transition: all 0.2s linear;
  box-shadow: 0px 4px 11px 0px #1d1f221a;
  opacity: ${(props) => (props.hovered ? "" : "")};
`;
const ConfirmContainers = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const ConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#5ECE7B")};
  border-radius: 0px;
  border: 0px;
  padding: 14px;
  width: 120px;
  color: white;
  cursor: pointer;
  animation: ${(props) => props.animation} 0.4s ease forwards;
  opacity: 1;
  transition: all 0.2s linear;
  box-shadow: 0px 4px 11px 0px #1d1f221a;
  opacity: ${(props) => (props.hovered ? "" : "")};
`;
const Icon = styled.img`
  width: 20px;
  height: 20px;
  background-color: #5ece7b;
`;
const PriceText = styled.strong``;
const ItemName = styled.span`
  margin-bottom: 10px;
`;
class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationState: false,
    };
  }
  getPrice = () => {
    const { data, activeCurrency } = this.props;
    let activePrice = data.prices.find(
      (price) => price.currency.label === activeCurrency.label
    );
    return `${activePrice?.currency?.symbol} ${activePrice?.amount}`;
  };
  render() {
    const { data, activeCurrency } = this.props;
    const { confirmationState } = this.state;
    console.log(data);
    return (
      <Wrapper>
        {/* <ImageContainer>
            {
              confirmationState
              ? <ProductInfoCard/>
              : <ProductImage src={
                // data?.gallery[0] 
                 productImage}/>
            }
          </ImageContainer> */}
        <ImageContainer>
          <ProductImage src={data.gallery[0]} />
        </ImageContainer>

        {confirmationState ? (
          <DetailsContainer>
            <ProductInfoCard price={this.getPrice()} data={data} />
          </DetailsContainer>
        ) : null}

        {confirmationState ? (
          <ConfirmContainers>
            <ConfirmButton
              animation={moveLeft}
              bgColor="#D4636A"
              onClick={() => {
                this.setState({ confirmationState: false });
              }}
            >
              Cancel
            </ConfirmButton>
            <ConfirmButton
              animation={moveRight}
              bgColor="#73D38A"
              onClick={() => {
                this.setState({ confirmationState: true });
              }}
            >
              Add
            </ConfirmButton>
          </ConfirmContainers>
        ) : (
          <InfoContainer>
            <PriceText>{this.getPrice()}</PriceText>
            <Button
              onClick={() => {
                this.setState({ confirmationState: true });
              }}
            >
              <Icon src={kartIcon} />
            </Button>
          </InfoContainer>
        )}
      </Wrapper>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {};
};
const mapStateToProps = (state) => {
  return {
    currencies: state.products.currencies,
    activeCurrency: state.products.activeCurrency,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
