import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    line-height: 1.5;
  }
  #root {
    display: flex;
    flex-direction: column;
  }
`;
