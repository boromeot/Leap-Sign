export const drawHands = (detections, canvasCtx) => {
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