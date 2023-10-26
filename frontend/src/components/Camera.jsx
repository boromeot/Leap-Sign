import React, { useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam"
import { drawFace, drawHands, drawPose } from '../utils/draw';
import { loadCNN, loadLSTM } from '../utils/loadModel';
import extractKeypoints from '../utils/extract';
import * as tf from '@tensorflow/tfjs';

const Camera = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [CNN, setCNN] = useState(null);
  const [LSTM, setLSTM] = useState(null);

  useEffect(() => {
    if (CNN !== null && LSTM !== null) {

      setCanvasAndVideoDimensions();

      const canvasCtx = canvasRef.current.getContext('2d');
      const intervalId = setInterval(() => {
        detect(CNN, canvasCtx)
      }, 75);

      let x = [];
      let i = 0;

      CNN.onResults((detections) => {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, webcamRef.current.video.videoWidth, webcamRef.current.video.videoHeight);
        drawFace(detections, canvasCtx);
        drawHands(detections, canvasCtx);
        drawPose(detections, canvasCtx);

        const keypoints = extractKeypoints(detections);
        x = x.concat(keypoints);
        i++;

        if (i % 30 === 0) {
          const tensor = tf.tensor3d(x, [1, 30, 1662]);
          console.log('lstm');
          LSTM.predict(tensor).print();
          tensor.dispose();
          x = [];
        }
      });
      return () => {
        clearInterval(intervalId);
      }
    }
  }, [CNN, LSTM])

  const loadModels = async () => {
    try {
      setCNN(await loadCNN());
      setLSTM(await loadLSTM('src/models/crispy_creme/model.json'));
    } catch (error) {
      console.error('Error loading the models:', error);
    }
  }

  const setCanvasAndVideoDimensions = () => {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
  }

  const detect = async (model) => {
    if (!webcamRef.current || webcamRef.current.video.readyState !== 4) {
      console.log('detect function failed');
      return;
    }
    const video = webcamRef.current.video;
    await model.send({image: video });
  }

  return (
    <>
      <Webcam ref={webcamRef} onUserMedia={loadModels} style={
        {
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          width: 640,
          height: 480,
          zIndex: 3,
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