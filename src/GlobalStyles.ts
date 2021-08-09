import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(55deg, #5f5ea9 25%, transparent 25%),
      linear-gradient(125deg, #5f5ea9 25%, transparent 25%),
      linear-gradient(235deg, #5f5ea9 25%, transparent 25%),
      linear-gradient(305deg, #5f5ea9 25%, transparent 25%);
    background-size: 20px 30px;
    background-color: #504f98;
    position: relative;
  }
`;
