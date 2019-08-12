import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

*{
  margin: 0px;
  padding: 0px;
  outline: 0;
  box-sizing: border-box
}

html, body, #root{
 height: 100%;
}

body{
  background: #f5f5f5;
  -webkit-font-smoothing: antialiased !important;
}

body,button,input{
  font-family: Arial, Helvetica, sans-serif
}

button {
  cursor: pointer
}

`;
