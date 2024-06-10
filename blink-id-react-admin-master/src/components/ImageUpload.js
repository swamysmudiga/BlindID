import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';
//fileSize in MB's default
const ImageUpload = ({ name, onChange, width = "100px", height = "100px", fileSize = 2, className = "", defaultUrl = "" }) => {
  const [imageUrl, setImageUrl] = useState(defaultUrl);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUploadChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }
    
    // Check if file size is within fileSize limit
    if (file.size > fileSize * 1024 * 1024) {
      alert(`Image size must be less than ${fileSize}MB`);
    } else {
      setUploading(true);
      handleUpload(file);
    }
  };

  const handleUpload = (image) => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            setProgress(0);
            setUploading(false);
            // Pass the image URL to the parent component using onChange
            onChange(downloadURL);
          });
        }
      );
    }
  };

  return (
    <div>
      <input
        type="file"
        name={name}
        onChange={(e) => handleUploadChange(e)}
      />
      
      {uploading && <FaSpinner className="loading-icon" />}
      {progress > 0 && <progress value={progress} max="100" />}
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded" width={width} height={height} className={className} style={{ borderRadius: '50%' }} />
      ) : (
        <img src={defaultUrl} alt="Default" width={width} height={height} className={className} style={{ borderRadius: '50%' }} />
      )}
    </div>
  );
};

export default ImageUpload;
