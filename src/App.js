import React, { useState } from 'react';
import Home from './components/Home'; // Import the Home component
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import SignUp from './components/SignUp';

function App() {
  const [token, setToken] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false); // State to toggle between login and signup
  const [currentView, setCurrentView] = useState('home'); // State to track the current view

  return (
    <div className="App">
      {currentView === 'home' ? ( // Render Home first
        <Home setCurrentView={setCurrentView} />
      ) : !token ? (
        isSigningUp ? ( // Render SignUp if isSigningUp is true
          <SignUp setIsSigningUp={setIsSigningUp} setCurrentView={setCurrentView} />
        ) : ( // Render Login if isSigningUp is false
          <Login setToken={setToken} setIsSigningUp={setIsSigningUp} setCurrentView={setCurrentView} />
        )
      ) : (
        <FileUpload token={token} />
      )}
    </div>
  );
}

export default App;
