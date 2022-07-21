import * as C from '@chakra-ui/react';
import { createStandaloneToast, extendTheme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import NavBar from './components/nav-bar/NavBar';

import EquipmentListingPage from './pages/EquipmentListingPage';
import EquipmentItemPage from './pages/EquipmentItemPage';

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
        <NavBar>
          <C.Button variant="verticalNav" as={NavLink} end to="/">
            Equipment list
          </C.Button>
          <C.Button variant="verticalNav" as={NavLink} end to="/equipment/new">
            Add equipment
          </C.Button>
        </NavBar>
        <Routes>
          <Route path="/" element={<EquipmentListingPage />}></Route>
          <Route path="/equipment/:code" element={<EquipmentItemPage />}></Route>
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
