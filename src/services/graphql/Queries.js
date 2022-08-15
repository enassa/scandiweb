import { gql } from "@apollo/client";
export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;
export const GET_PRODUCTS = gql`
  query CATEGORY($CategoryInput: CategoryInput) {
    category(input: $CategoryInput) {
      name
      products {
        name
        category
        inStock
        gallery
        brand
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;
export const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
