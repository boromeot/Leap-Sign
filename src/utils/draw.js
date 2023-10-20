import * as mp_drawing from '@mediapipe/drawing_utils';
import * as mp_holistic from '@mediapipe/holistic';

export const drawHands = (detections, canvasCtx) => {
  if (!detections) return;
  if (detections.rightHandLandmarks) {
    // Draw right hand
    mp_drawing.drawConnectors(
        canvasCtx, detections.rightHandLandmarks, mp_holistic.HAND_CONNECTIONS,
        {color: 'white'});
    mp_drawing.drawLandmarks(canvasCtx, detections.rightHandLandmarks, {
      color: 'white',
      fillColor: 'rgb(0,217,231)',
      lineWidth: 2,
      radius: (data) => {
        return mp_drawing.lerp(data.from.z, -0.15, .1, 10, 1);
      }
    });
  }
  if (detections.leftHandLandmarks) {
    // Draw left hand
    mp_drawing.drawConnectors(
        canvasCtx, detections.leftHandLandmarks, mp_holistic.HAND_CONNECTIONS,
        {color: 'white'});
    mp_drawing.drawLandmarks(canvasCtx, detections.leftHandLandmarks, {
      color: 'white',
      fillColor: 'rgb(0,217,231)',
      lineWidth: 2,
      radius: (data) => {
        return mp_drawing.lerp(data.from.z, -0.15, .1, 10, 1);
      }
    });
  }
}

export const drawPose = (detections, canvasCtx) => {
  if (detections.poseLandmarks) {
    // Draw pose
    mp_drawing.drawConnectors(
      canvasCtx, detections.poseLandmarks, mp_holistic.POSE_CONNECTIONS,
      {color: 'white'});
    mp_drawing.drawLandmarks(
      canvasCtx,
      Object.values(mp_holistic.POSE_LANDMARKS_LEFT)
          .map(index => detections.poseLandmarks[index]),
      {visibilityMin: 0.65, color: 'white', fillColor: 'rgb(255,138,0)'});
    mp_drawing.drawLandmarks(
      canvasCtx,
      Object.values(mp_holistic.POSE_LANDMARKS_RIGHT)
          .map(index => detections.poseLandmarks[index]),
      {visibilityMin: 0.65, color: 'white', fillColor: 'rgb(255,138,0)'});
  }
}

export const drawFace = (detections, canvasCtx) => {
  if (detections.faceLandmarks) {
    // Draw face
    
    // mp_drawing.drawConnectors( CAUSES CRASHES
    //   canvasCtx, detections.faceLandmarks, mp_holistic.FACEMESH_TESSELATION,
    //   {color: '#C0C0C070', lineWidth: 1});
    mp_drawing.drawConnectors(
      canvasCtx, detections.faceLandmarks, mp_holistic.FACEMESH_RIGHT_EYE,
      {color: 'rgb(0,217,231)'});
    mp_drawing.drawConnectors(
      canvasCtx, detections.faceLandmarks, mp_holistic.FACEMESH_RIGHT_EYEBROW,
      {color: 'rgb(0,217,231)'});
    mp_drawing.drawConnectors(
      canvasCtx, detections.faceLandmarks, mp_holistic.FACEMESH_LEFT_EYE,
      {color: 'rgb(0,217,231)'});
    mp_drawing.drawConnectors(
      canvasCtx, detections.faceLandmarks, mp_holistic.FACEMESH_LEFT_EYEBROW,
      {color: 'rgb(0,217,231)'});
    mp_drawing.drawConnectors(
      canvasCtx, detections.faceLandmarks, mp_holistic.FACEMESH_FACE_OVAL,
      {color: '#E0E0E0', lineWidth: 5});
    mp_drawing.drawConnectors(
      canvasCtx, detections.faceLandmarks, mp_holistic.FACEMESH_LIPS,
      {color: '#E0E0E0', lineWidth: 5});
  }
}