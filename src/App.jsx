import './CSS/App.css';
import { responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes } from 'react-router-dom';
import { theme } from './helpers/theme'
import DashboardRoutes from './Routes/DashboardRoutes';
import AuthRoutes from './Routes/AuthRoutes';
import { DialogsProvider } from '@toolpad/core/useDialogs';

function App() {
  const myTheme = responsiveFontSizes(theme());
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={myTheme}>
          <DialogsProvider>

            <Routes>
              {AuthRoutes()}
              {DashboardRoutes()}
            </Routes>

          </DialogsProvider>
        </ThemeProvider>
      </BrowserRouter>

    </div>

  );
}

export default App;
