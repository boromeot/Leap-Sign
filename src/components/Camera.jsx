import React, { useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam"
import * as tf from '@tensorflow/tfjs'
import * as mp_holistic from '@mediapipe/holistic';
import { drawFace, drawHands, drawPose } from '../utils/draw';

const Camera = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [net, setNet] = useState(null);

  useEffect(() => {
    if (net !== null) {
      const canvasCtx = canvasRef.current.getContext('2d');
      const intervalId = setInterval(() => {
        detect(net, canvasCtx)
      }, 100)
      return () => {
        clearInterval(intervalId);
      }
    }
  }, [net])

  const loadModel = async () => {
    try {
      const config = {locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@` +
               `${mp_holistic.VERSION}/${file}`;
      }};
      const holistic = await new mp_holistic.Holistic(config);
      await holistic.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
        refineFaceLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });
      setNet(holistic);
      // setConfigSet(true);
    } catch (error) {
      console.error('Error loading the model:', error);
    }
  }

  const detect = async (model, canvasCtx) => {
    if (!webcamRef.current || webcamRef.current.video.readyState !== 4) {
      console.log('detect function failed');
      return;
    }

    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    await model.send({image: video });
    model.onResults((detections) => {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
      drawFace(detections, canvasCtx);
      drawHands(detections, canvasCtx);
      drawPose(detections, canvasCtx);
    });
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
