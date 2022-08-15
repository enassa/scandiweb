import React, { Component } from "react";
import ProductCard from "../../components/ProductCard";
import styled from "@emotion/styled";
import { GridView } from "../../components/styled/layoutComponents";
import { GET_CATEGORIES } from "../../services/graphql/Mutations";
import { client } from "../../services/apollo/Apollo";
import { gql } from "@apollo/client";
import { connect } from "react-redux";
import { getCategoriesSync } from "../../services/redux/ProductsSlice";
import { readyForMapping } from "../../utils/functions";
import { WithRouter } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: start;
  align-items: center;
  padding: 10px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  ejectProductList = () => {
    const { selectedItem } = this.state;
    let { activeCategory, products } = this.props;
    let activeProductList = products[activeCategory];

    if (readyForMapping(activeProductList)) {
      return activeProductList.map((product, index) => {
        return (
          <ProductCard
            key={index}
            data={product}
            selected={selectedItem === product.name}
            onClick={() => {
              this.setState({ selectedItem: product.name }, () => {
                this.props.getProducts(product.name);
              });
            }}
          >
            <span> {product.name.toUpperCase()} </span>
          </ProductCard>
        );
      });
    }
  };
  componentDidMount() {
    // client
    // .query({
    //   query: GET_CATEGORIES
    // })
    // .then(result => console.log(result));
    // const { message, loading, path } =  useQuery(GET_CATEGORIES);
  }
  render() {
    return (
      <Wrapper>
        <GridView>{this.ejectProductList()}</GridView>
      </Wrapper>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: (alreadyInKart, newItem) => dispatch(getCategoriesSync()),
  };
};
const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    activeCategory: state.products.activeCategory,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
