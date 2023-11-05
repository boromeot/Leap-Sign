import React, { useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam"
import { drawFace, drawHands, drawPose } from '../utils/draw';
import { loadCNN, loadLSTM } from '../utils/loadModel';
import { Camera } from '@mediapipe/camera_utils';
import extractKeypoints from '../utils/extract';
import * as tf from '@tensorflow/tfjs';

const CameraComponent = ({ word, threshold, matchFunction }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [CNN, setCNN] = useState(null);
  const [LSTM, setLSTM] = useState(null);
  const map = ['nothing','again','thankyou','no','yes', 'understand','your','slow'];

  function getMaxIndex(arr) {
    let index = -1;
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
        index = i;
      }
    }
    return index;
  }

  useEffect(() => {
    if (CNN !== null && LSTM !== null) {

      setCanvasAndVideoDimensions();

      const canvasCtx = canvasRef.current.getContext('2d');
      // const intervalId = setInterval(() => {
      //   detect(CNN, canvasCtx)
      // }, 75);

      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null
      ) {
        if (!webcamRef.current?.video) return
        const camera = new Camera(webcamRef.current.video, {
          onFrame: async () => {
            if (!webcamRef.current?.video) return
            await CNN.send({image: webcamRef.current.video});
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }

      let sequence = [];

      CNN.onResults((detections) => {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, webcamRef.current.video.videoWidth, webcamRef.current.video.videoHeight);
        drawFace(detections, canvasCtx);
        drawHands(detections, canvasCtx);
        drawPose(detections, canvasCtx);

        const keypoints = extractKeypoints(detections);
        sequence.push(keypoints);
        if (sequence.length === 30) {
          tf.tidy(() => {
            const flat = sequence.flat();
            const tensor = tf.tensor3d(flat, [1, 30, 1662]);
            const predictionTensor = LSTM.predict(tensor);
            const predicitonData = predictionTensor.dataSync();
            const gussedWord = map[getMaxIndex(predicitonData)];
            const confidence = predicitonData[getMaxIndex(predicitonData)];
            if (gussedWord === word && confidence > threshold) {
              console.log(gussedWord, word, confidence);
              matchFunction();
            }
            sequence.shift();
          })
        }
      });
      return () => {
      }
    }
  }, [CNN, LSTM, word])

  const loadModels = async () => {
    try {
      setCNN(await loadCNN());
    } catch (error) {
      console.error('Error loading CNN:', error);
    }
    
    try {
      setLSTM(await loadLSTM('/model.json'));
    } catch (error) {
      console.error('Error loading LSTM', error);
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
          // marginLeft: 'auto',
          // marginRight: 'auto',
          width: 640,
          height: 480,
          borderRadius: "10px",
          zIndex: 3,
        }
      }/>
      <canvas ref={canvasRef} style={
        {
          position: 'absolute',
          // marginLeft: 'auto',
          // marginRight: 'auto',
          width: 640,
          height: 480,
          zIndex: 3,
          borderRadius: "10px",
        }
      }/>
      <button onClick={() => CNN.close()}>close CNN</button>
    </>
  );
}

export default CameraComponent;