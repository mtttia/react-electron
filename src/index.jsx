import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Routes,
  Route,
  HashRouter
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import store from './app/store'
import { Provider } from 'react-redux'

import PageNotFound from './routes/pageNotFound'
import Home from './routes/home'

import themeLoader from './theme/themeLoader';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MyApp />
    </Provider>    
  </React.StrictMode>,
  document.getElementById('root')
);

function MyApp() {
  const muiTheme = themeLoader('system')

  return (
    <ThemeProvider theme={muiTheme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/home" element={<Home />}></Route>
          </Route>
            <Route
              path="*"
              element={<PageNotFound />}
            />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
  
}
