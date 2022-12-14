import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

/* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

      :root{
    --color-white: #ffffff;
    /* --color-green: #157f1f; */
    --color-green: #4cb963;
    --color-red: #E85F5C;
    --color-yellow: #f7b32b;
    --color-yello2: #F9C254;
    --color-orange: #f06543;
    --color-light-blue: #3c91e6;
    --color-dark-blue: #414288;
    --color-black: #311e10;
    --font-heading: 'Rubik Mono One', sans-serif;
    --font-body: 'Rubik', sans-serif;
    --padding-page: 24px;
      }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b,u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
      color: black;
  }
  
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }

  body {
      line-height: 1;
      height: 100vh;
  }

  ol, ul {
      list-style: none;
  }

  blockquote, q {
      quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

h1,
h2,
h3,
label,
button {
  color: white;
  font-family: var(--font-heading);
  text-align: center;
}
p {
  font-family:'Rubik', sans-serif;
  font-weight: 100;
  font-size: 16px;
}
a,
li,
blockquote,
input {
  font-family: 'Rubik', sans-serif;;
  font-weight: 100;
  text-decoration: none;
  color: var(--color-light-blue)
}
  #root{
    height: 100vh;
  }
  .font-link {
    font-family: 'Rubik', sans-serif;
    text-decoration: none;
}
`;
