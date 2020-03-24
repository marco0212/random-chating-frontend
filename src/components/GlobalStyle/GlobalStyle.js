import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    font-size: 16px;
    line-height: 1.5;
  }
  #root {
    display: flex;
    flex-direction: column;
  }
`;
