const extractKeypoints = (detections) => {
  /* 
    Extracts the keypoints for face, pose, left hand, and right hand
    Takes of their keypoints from :
    [
      x: 0.1312,
      y: 0.21314,
      z: 0.6123
    ], etc...
    format and concats them all into a single array of length 1662
  */

  if (!detections) return new Array(33*4 + 468*3 + 21*3 + 21*3).fill(0);

  let pose, face, lh, rh;

  if (detections.poseLandmarks) pose = detections.poseLandmarks.reduce((res, obj) => res.concat(Object.values(obj)), []);
  else pose = new Array(33 * 4).fill(0);

  if (detections.faceLandmarks) face = detections.faceLandmarks.reduce((res, obj) => res.concat(Object.values(obj)), []);
  else face = new Array(468 * 3).fill(0);

  if (detections.leftHandLandmarks)lh = detections.leftHandLandmarks.reduce((res, obj) => res.concat(Object.values(obj)), []);
  else lh = new Array(21 * 3).fill(0);

  if (detections.rightHandLandmarks) rh = detections.rightHandLandmarks.reduce((res, obj) => res.concat(Object.values(obj)), []);
  else rh = new Array(21 * 3).fill(0);

  return [...pose, ...face, ...lh, ...rh]; // Shape [1662,]
}

export default extractKeypoints;