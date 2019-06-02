import React, { Component } from 'react'
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import firebase from '../firebase';
import Upload from '../components/upload';

class Camera extends Component {
    constructor(props, context) {
        super(props, context);
        this.cameraPhoto = null;
        this.videoRef = React.createRef();
        this.state = {
            dataUri: ''
        }
    }

    componentDidMount() {
        // We need to instantiate CameraPhoto inside componentDidMount because we
        // need the refs.video to get the videoElement so the component has to be
        // mounted.
        this.cameraPhoto = new CameraPhoto(this.videoRef.current);
    }

    startCamera(idealFacingMode, idealResolution) {
        this.cameraPhoto.startCamera(idealFacingMode, idealResolution)
            .then(() => {
                console.log('camera is started !');
            })
            .catch((error) => {
                console.error('Camera not started!', error);
            });
    }


    takePhoto() {
        const config = {
            sizeFactor: 1
        };

        let dataUri = this.cameraPhoto.getDataUri(config);
        console.log('dataURI is...', dataUri)
        const storageRef = firebase.storage().ref();
        const testRef = storageRef.child('<username>/test.jpg')
        testRef.putString(dataUri, 'data_url').then(function (snapshot) {
            console.log('Uploaded a data_url string!');
        });
        this.setState({ dataUri });
    }

    stopCamera() {
        this.cameraPhoto.stopCamera()
            .then(() => {
                console.log('Camera stoped!');
            })
            .catch((error) => {
                console.log('No camera to stop!:', error);
            });
    }

    showPic = () => {
        if (this.state.dataUri) {
            return <img alt="imgCamera" src={this.state.dataUri} />
        }
    }
    render() {
        console.log(this.state.dataUri)
        return (

            <div className="container camBorder">
                <div className="row" >
                    <Upload />
                </div>
                <div className="row camBorder">

                    <div className="col camBorder">
                        <button className="btn btn-primary camBorder" onClick={() => {
                            let facingMode = FACING_MODES.ENVIRONMENT;
                            let idealResolution = { width: 640, height: 480 };
                            this.startCamera(facingMode, idealResolution);
                        }}>Front Camera</button>
                    </div>

                    <div className="col camBorder">
                        <button className="btn btn-success camBorder" onClick={() => {
                            this.takePhoto();
                        }}> Take photo </button>
                    </div>

                    <div className="col camBorder">
                        <button className="btn btn-danger camBorder" onClick={() => {
                            this.stopCamera();
                        }}> Stop Camera </button>
                    </div>
                    <div className="row">
                        <div className="col">
                            <video
                                ref={this.videoRef}
                                autoPlay={true}
                            />
                        </div>
                    </div>

                    <div className="row camBorder">

                        <div className="col camBorder">
                            {this.showPic()}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Camera;