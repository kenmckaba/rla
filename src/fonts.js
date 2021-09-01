import { Global } from '@emotion/react'
const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Proxima Nova';
        font-style: normal;
        font-display: swap;
        src: url('./fonts/ProximaNova-Regular.otf') format('opentype'),
        url('./fonts/ProximaNova-Bold.otf') format('opentype'),
        url('./fonts/ProximaNova-Semibold.otf') format('opentype');
      }
      `}
  />
)
export default Fonts
