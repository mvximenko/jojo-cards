import { createGlobalStyle } from 'styled-components';

const palettes = (palette: number) => {
  const palettes = [
    ['#1f4599', '#1b3e91'],
    ['#5f5ea9', '#504f98'],
    ['#b9a967', '#aa9a56'],
    ['#863087', '#7f2a7f'],
    ['#2c766b', '#266f63'],
    ['#cf99c4', '#c08ab3'],
  ];
  return `
    background: linear-gradient(55deg, ${palettes[palette][0]} 25%, transparent 25%),
    linear-gradient(125deg, ${palettes[palette][0]} 25%, transparent 25%),
    linear-gradient(235deg, ${palettes[palette][0]} 25%, transparent 25%),
    linear-gradient(305deg, ${palettes[palette][0]} 25%, transparent 25%);
    background-size: 20px 30px;
    background-color: ${palettes[palette][1]};
    `;
};

export const GlobalStyle = createGlobalStyle<{ palette: number }>`
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
    position: relative;    
    ${({ palette }) => palettes(palette)}
  }

  a {
    color: #fff;
    text-decoration: none;
  }
`;
