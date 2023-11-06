import {Holistic} from '@mediapipe/holistic';
import * as tf from '@tensorflow/tfjs'

export const loadCNN = async () => {
  try {
    const CNN = await new Holistic({locateFile: (file) => {
      return `/holistic/${file}`;
    }});
    // const CNN = await new mp_holistic.Holistic({locateFile: (file) => {
    //   return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@` +
    //          `${mp_holistic.VERSION}/${file}`;
    // }});
    await CNN.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    return CNN;
  } catch (error) {
    console.error('Error loading the CNN model', error);
    return null;
  }
}

export const loadLSTM = async (path) => {
  try {
    const LSTM = await tf.loadLayersModel(path);
    return LSTM;
  } catch (error) {
    console.error('Error loading the LSTM model', error);
    return null;
  }
}