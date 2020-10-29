import { createGlobalStyle } from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  :root {
    --black: #121214;
    --gray: #8f8f91;
    --grayBg: #202024;
    --white: #fff;
    --primary: #0086ff;
    --secondary: #961ed9;
    --red: #da1869;
  }

  body {
    background: var(--black);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body, input, button {
    font: 16px Arial, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
