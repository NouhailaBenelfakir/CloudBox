import React from 'react';
import './Home.css'; // Import the updated CSS file
import backgroundImage from '../images/background.jpg'; 
import Navbar from './Navbar';


function Home({ setCurrentView }) { // Accept setCurrentView as a prop

    return (
        <div>
            <Navbar></Navbar>
        <div className="home-container">
            <div className="main-content">
                <div className="slogan">Your Secure Cloud Storage Solution</div>
                <p className="description">
                    Cloudbox is a modern web app for storing, managing, and sharing your files in the cloud.
                </p>
                <div className="about">
                    {/* Updated Login button structure */}
                    <button className="login-button" onClick={() => setCurrentView('login')}>Login</button>
                    <button className="login-button" onClick={() => setCurrentView('signup')}>Sign Up</button>
                </div>
            </div>

            {/* Image and description at the bottom left */}
            <div className="bottom-left-container">
                <img src={backgroundImage} alt="Background" className="background-image" />
                <div className="advantages-box">
                    <p className="advantage-description">
                        Upload, download, and delete files effortlessly.<br />
                        Secure and reliable cloud storage.<br />
                        Share files with generated links.<br />
                        Easy profile management.
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Home;
