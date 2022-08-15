import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { store } from './services/redux/store/store';

const container = document.getElementById('root');
const root = createRoot(container);
const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Raleway&family=Roboto&display=swap');
html{
  width: 100%;
  height:100%;
  display: flex;
  justify-content: start;
  overflow-x: hidden;
}
body {
  display:flex;
  width:100%;
  height:100%;
  margin: 0;
  padding: 0;
  flex-family:Raleway;
  font-family: 'Raleway', Roboto, sans-serif;
  overflow-x: hidden;
}
#root{
  display:flex;
  width:100%;
  height:100%;
}
`;
root.render(
  <React.StrictMode>
     <BrowserRouter>
      <Provider store={store}>
      <GlobalStyles/>
        <App />
      </Provider>
     </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
