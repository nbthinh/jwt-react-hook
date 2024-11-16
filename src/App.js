import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useContext } from 'react';

import _ from "lodash";
import AppRoutes from './routes/AppRoutes';
import { Rings } from 'react-loader-spinner'
import { UserContext } from "./context/UserContext";

function App() {
  const {user} = useContext(UserContext);
  return (
    <>
      <Router>
        {user && user.isLoading === true ?
          <div className="loading-container">
            <Rings
              visible={true}
              height="80"
              width="80"
              color="#1877f2"
              ariaLabel="rings-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <div>Loading ...</div>
          </div>
          :
          <>
            <div className="app-header">
              <NavHeader />
            </div>
            <div className="app-container">
              <AppRoutes />
            </div>
          </>
        }
        
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </>
  );
}

export default App;
