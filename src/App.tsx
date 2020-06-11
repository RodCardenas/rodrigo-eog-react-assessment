import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as UrqlProvider } from 'urql';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import Dashboard from './components/Dashboard';
/*eslint-disable @typescript-eslint/no-unused-vars*/
import { client, subscriptionClient } from './clients';
/*eslint-enable @typescript-eslint/no-unused-vars*/

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <UrqlProvider value={client}>
          <Header />
          <Dashboard />
          <ToastContainer />
        </UrqlProvider>
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
