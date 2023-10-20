import React, { useRef } from 'react';
import Webcam from "react-webcam"
import * as tf from '@tensorflow/tfjs'
import * as mp_holistic from '@mediapipe/holistic';
import { drawFace, drawHands, drawPose } from '../utils/draw';


const Camera = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  
  const loadModel = async () => {
    const config = {locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@` +
             `${mp_holistic.VERSION}/${file}`;
    }};
    const holistic = new mp_holistic.Holistic(config);
    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    const canvasCtx = canvasRef.current.getContext('2d');
    setInterval(() => {
      detect(holistic, canvasCtx)
    }, 100)
  }

  const detect = async (model, canvasCtx) => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video dimensions
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas dimensions
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const _ = await model.send({image: video });
      model.onResults((detections) => {
        /* faceLandmarks length 478 poseLandmarks length 33 leftHandLandmarks length 21*/
        drawFace(detections, canvasCtx);
        drawHands(detections, canvasCtx);
        drawPose(detections, canvasCtx);
      });
    } else {
      console.log('detect function failed')
    }
  }

  
  return (
    <>
      <Webcam ref={webcamRef} onUserMedia={loadModel} style={
        {
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          width: 640,
          height: 480,
        }
      }/>
      <canvas ref={canvasRef} style={
        {
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          width: 640,
          height: 480
        }
      }/>
    </>
  );
}

export default Camera;