import React, { useState, useEffect } from 'react';
import { uploadFile, deleteFile } from '../S3Service';
import AWS from 'aws-sdk';
import { AWS_COGNITO, AWS_S3 } from '../config';
import './FileUpload.css'; // Make sure to link the CSS file
import Navbar from './Navbar';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Configure AWS SDK with Cognito credentials
  useEffect(() => {
    AWS.config.update({
      region: AWS_S3.region,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: AWS_COGNITO.IdentityPoolId,
      }),
    });
  }, []); // Only run once when the component mounts

  const handleUpload = async () => {
    if (!file) return;

    try {
      const result = await uploadFile(file);
      // Assuming the result has the Key property for the uploaded file
      setUploadedFiles([...uploadedFiles, result.Key]);
      setFile(null); // Clear the file input after upload
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleDelete = async (fileName) => {
    try {
      await deleteFile(fileName);
      setUploadedFiles(uploadedFiles.filter(f => f !== fileName));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div>
    <Navbar></Navbar>
    <div className="file-upload-container">
      <h2>Upload a file</h2>
      <div className="upload-form">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="*/*" // Allow all file types
          className="file-input"
        />
        <button onClick={handleUpload} className="upload-button">Upload</button>
      </div>

      <h3>Uploaded Files:</h3>
      <ul className="uploaded-files-list">
        {uploadedFiles.map((fileName) => (
          <li key={fileName} className="uploaded-file-item">
            {fileName} <button onClick={() => handleDelete(fileName)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default FileUpload;
