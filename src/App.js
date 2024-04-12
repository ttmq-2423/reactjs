import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // State để lưu trữ URL của ảnh đã được tải lên
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  // Hàm xử lý sự kiện khi người dùng chọn file ảnh

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
    setUploadedImageUrl(reader.result); 

    
    const formData = new FormData();

    formData.append('imageFile', file);

    fetch('http://127.0.0.1:8000/api/upload_image', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
          document.getElementById('predictionText').textContent = data.predicted_class_name;
      })
      .catch(error => {
          console.error('Error:', error);
      });
  
    // Gửi yêu cầu POST đến Django API
    //axios.post('http://127.0.0.1:8000/api/upload_image', formData)
    //  .then(Response => {
     //     const data = axios.Response.data; // Lấy dữ liệu từ phản hồi
//
  //        // Xử lý dữ liệu
    //      const predictedClassName = data.;
      //    document.getElementById('predictionText').textContent = data.prediction.predicted_class_name;
      //})
 // .catch(error => {
//    console.error('Error:', error);
 // });
};
 };

  return (
    <div className="App">
      <header className="App-header">
        <h1> Image Classification </h1>
      </header>

      <body>
        {/* Form tải ảnh lên */}
        <form className="App-UploadImage" id="uploadForm" method="post" encType="multipart/form-data">
          <input type="file" name="imageFile" id="imageFile" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
          <label htmlFor="imageFile" id="uploadButton">Upload image</label>
        </form>
        
        {/* Hiển thị ảnh đã được tải lên */}
        {uploadedImageUrl && (
          <div id="imagePreview">
            <img className="App-image-frame" src={uploadedImageUrl} alt="Uploaded" />
          </div>
        )}
        <div id="predictionResult">
              <h2>Result:</h2>
              <p id="predictionText"> </p>
          </div>
      </body>
    </div>
  );
}

export default App;
