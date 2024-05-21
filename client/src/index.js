import React from 'react';
//import ReactDOM from 'react-dom/client';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
    
  //   </BrowserRouter>
  // </Provider>




// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//    <Provider store={store}>
//   <React.StrictMode>
//     <BrowserRouter>
  
//       <App />
    
//     </BrowserRouter>
//   </React.StrictMode>
//   </Provider>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
