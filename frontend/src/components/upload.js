import React from 'react';
import * as firebase from 'firebase';
import ImageService from '../services/images';

// import config from '../firebase'

//   // Initialize Firebase
//   const config = {
//     apiKey: "AIzaSyDgSemVyxE4L9MjZPHpL-zBIYu__dWw1s4",
//     authDomain: "snapshopper-4cbb4.firebaseapp.com",
//     databaseURL: "https://snapshopper-4cbb4.firebaseio.com",
//     projectId: "snapshopper-4cbb4",
//     storageBucket: "snapshopper-4cbb4.appspot.com",
//     messagingSenderId: "460830477176",
//     appId: "1:460830477176:web:4af433240e6eaaf4"
// };
// firebase.initializeApp(config);

class Upload extends React.Component {

  saveImage = (url) => {
    const date = Date();

    ImageService.saveImage(url, date);
  }

  handleFileInput = async (e) => {
    const firstFile = e.target.files[0];

    const root = firebase.storage().ref()
    const newImage = root.child(firstFile.name);

    try {
      const snapshot = await newImage.put(firstFile);
      const url = await snapshot.ref.getDownloadURL();
      this.saveImage(url);
    }
    catch (err) {
      console.log(err);
    }

  }

  render() {
    return (
      <div className='container'>
        <div className="input-group mb-3">
          <div className="custom-file">
            <input type="file" className="custom-file-input" onChange={this.handleFileInput} />
            <label className="custom-file-label">Upload Image</label>
          </div>
        </div>
      </div>
    )
  }
}
export default Upload;