import React, { Component, Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { URLS } from "./utils/routes";
import ProductList from "./pages/product-list/ProductList";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/apollo/Apollo";
import KartDetailsjs from "./pages/kart-details/KartDetails";
import ComponentList from "./pages/component-list/ComponentList";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Fragment>
          <Routes>
            <Route path={URLS.home.route} element={<Home />}>
              <Route path={URLS.listProducts.route} element={<ProductList />} />
              <Route
                path={URLS.showDetails.route}
                element={<KartDetailsjs />}
              />
              <Route
                path={URLS.allComponents.route}
                element={<ComponentList />}
              />
            </Route>
          </Routes>
        </Fragment>
      </ApolloProvider>
    );
  }
}
