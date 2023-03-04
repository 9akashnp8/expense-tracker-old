import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';

import BaseDrawer from '@/components/BaseDrawer';

export default function App({ Component, pageProps }) {
  return (
    <CssBaseline>
      <BaseDrawer>
        <Component {...pageProps} />
      </BaseDrawer>
    </CssBaseline>
  )
}
