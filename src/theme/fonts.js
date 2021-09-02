import { Global } from '@emotion/react'
const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Proxima Nova';
        font-style: normal;
        font-display: swap;
        font-weight: 500;
        src: url('./fonts/ProximaNova-Regular.otf') format('opentype');
      }
      /* latin */
      @font-face {
        font-family: 'Proxima Nova';
        font-style: normal;
        font-display: swap;
        font-weight: 600;
        src: url('./fonts/ProximaNova-Semibold.otf') format('opentype');
      }
      /* latin */
      @font-face {
        font-family: 'Proxima Nova';
        font-style: normal;
        font-display: swap;
        font-weight: 700;
        src: url('./fonts/ProximaNova-Bold.otf') format('opentype');
      }
      `}
  />
)
export default Fonts
