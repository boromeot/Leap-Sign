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