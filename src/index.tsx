import React from 'react';
import ReactDOM from 'react-dom/client'; // Update this import
import App from './App';
import './styles/common.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router } from 'react-router-dom';

// Get the root DOM element
const rootElement = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Create a root
  root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
}
