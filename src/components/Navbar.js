import React, { Component } from "react";
import styled from "@emotion/styled";
import expandLess from "../assets/images/expand-less.png";
import expandMore from "../assets/images/expand-more.png";
import kartIcon from "../assets/icons/kart-icon-black.png";
import { connect } from "react-redux";
import {
  getAllProductsSync,
  getCategoriesSync,
  getCurrenciesSync,
  setActiveCategory,
  setActiveCurrency,
} from "../services/redux/ProductsSlice";
import { Navigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 73px;
  min-height: 75px;
  margin-bottom: 16px;
  cursor: pointer;
  // padding: 0px 50px;
  // overflow:hidden;
`;
const MenuContainer = styled.div`
  display: flex;
  height: 100%;
  margin: 0px;
  padding: 0px;
  font-size: 18px;
  font-weight: 250px;
`;
const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 3px solid
    ${(props) => (props.selected ? "#5ECE7B" : "transparent")};
  color: ${(props) => (props.selected ? "#5ECE7B" : "")};
  margin-right: 20px;
  height: 100%;
  width: 81px;
  min-width: 114px;
  font-size: 18px;
  font-weight: 250px;
`;
const KartArea = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 20px;
  font-weight: 250px;
`;
const CurrencySelector = styled.strong`
  display: flex;
  width: 100px;
  position: relative;
  > span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 20px;
    span {
      margin-right: 10px;
    }
  }
`;
const CurrencyPopUp = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: white;
  box-shadow: 0px 4px 35px 0px #a8acb030;
  padding: 10px 0px;
  min-width: 117px;
  width: 117px;
  height: auto;
  cursor: pointer;
  font-size: 14px;
  position: absolute;
  right: 20px;
  top: 30px;
  overflow: hidden;
  z-index: 4;
`;
const CurrencyItem = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  padding: 13px;
  padding-left: 18px;
  height: 24px;
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  background-color: ${(props) => (props.selected ? "#EEEEEE" : "")};
`;
const Kart = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-size: 14px;
`;

const ExpandStateIcon = styled.img`
  height: 20%;
  transform: ${(props) =>
    props.expandedState ? "rotateZ(180deg)" : "rotateZ(0deg)"};
  transition: 0.2s linear;
`;

const KartIcon = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    width: 100%;
    align-items: start;
    cursor: pointer;
    font-size: 14px;
    strong {
        margin-bottom:6px;
        font-weight:bolder
        font-size:18px;
    }
`;

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: "",
      selectedCurrency: "USD",
      currencyPopUpState: false,
    };
  }
  sendSelection = (color, size) => {
    this.props.getSelection && this.props.getSelection(color, size);
  };
  changeCategory = (categoryName) => {
    const { products, changeActiveCategory, getProducts } = this.props;
    if (products[categoryName] !== undefined) {
      changeActiveCategory(categoryName);
    } else {
      getProducts(categoryName);
    }
  };
  ejectCategoryList = () => {
    const { activeCategory } = this.props;
    return this.props.categories.map((category, index) => {
      return (
        <MenuItem
          key={index}
          selected={activeCategory === category.name}
          onClick={() => {
            this.changeCategory(category.name);
          }}
        >
          <span> {category.name.toUpperCase()} </span>
        </MenuItem>
      );
    });
  };

  ejectCurrencyList = () => {
    const { activeCurrency, currencies, setActiveCurrency } = this.props;
    return currencies.map((currency, index) => {
      return (
        <CurrencyItem
          key={index}
          selected={activeCurrency.label === currency.label}
          onClick={() => {
            setActiveCurrency(currency);
          }}
        >
          <span>{currency.symbol}</span>
          &nbsp;
          <span>{currency.label}</span>
        </CurrencyItem>
      );
    });
  };

  componentDidMount() {
    this.props.getCategories();
    this.props.getCurrencies();
  }
  render() {
    const { currencyPopUpState } = this.state;
    return (
      <Wrapper>
        <MenuContainer>{this.ejectCategoryList()}</MenuContainer>
        <KartArea>
          <CurrencySelector>
            <span>
              <span>$</span>
              <ExpandStateIcon
                expandedState={currencyPopUpState}
                onClick={() => {
                  this.setState({ currencyPopUpState: !currencyPopUpState });
                }}
                alt="close currency list"
                src={expandMore}
              />
            </span>
            <img
              onClick={() => {
                alert("");
              }}
              alt="kart icon"
              src={kartIcon}
            />
            {this.state.currencyPopUpState ? (
              <CurrencyPopUp>{this.ejectCurrencyList()}</CurrencyPopUp>
            ) : null}
          </CurrencySelector>
          <KartIcon
            onClick={() => {
              alert("hii");
            }}
          />
        </KartArea>
      </Wrapper>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategoriesSync()),
    changeActiveCategory: (categoryName) =>
      dispatch(setActiveCategory(categoryName)),
    getProducts: (categoryName) => dispatch(getAllProductsSync(categoryName)),
    getCurrencies: (categoryName) => dispatch(getCurrenciesSync(categoryName)),
    setActiveCurrency: (categoryName) =>
      dispatch(setActiveCurrency(categoryName)),
  };
};
const mapStateToProps = (state) => {
  return {
    categories: state.products.categories,
    activeCategory: state.products.activeCategory,
    products: state.products.products,
    currencies: state.products.currencies,
    activeCurrency: state.products.activeCurrency,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
