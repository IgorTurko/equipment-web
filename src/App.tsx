import * as C from '@chakra-ui/react';
import { createStandaloneToast, extendTheme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import EquipmentListingPage from './components/equipment/EquipmentListingPage';

const theme = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
};

const extendedTheme = extendTheme(theme);

export function MainContainer() {
  const { ToastContainer } = createStandaloneToast({ theme: extendedTheme });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EquipmentListingPage />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <C.ChakraProvider theme={extendedTheme}>
      <MainContainer />
    </C.ChakraProvider>
  );
}

export default App;
