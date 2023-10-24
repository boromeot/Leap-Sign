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

    pose.shape = [132,]
    face.shape = [1872,]
    lefthand.shape = [63,]
    righthand.shape = [63,]

  */
  if (!detections) return new Array(33*4 + 468*3 + 21*3 + 21*3).fill(0);

  let pose, face, lh, rh;

  if (detections.poseLandmarks) pose = detections.poseLandmarks.reduce((res, obj) => {
    Object.values(obj).forEach(val => {
      if (val !== undefined) res.push(val);
    });
    return res;
  }, []);
  else pose = new Array(33 * 4).fill(0);

  if (detections.faceLandmarks) {
    face = [];
    for (const obj of detections.faceLandmarks) {
      if (face.length === 1404) break;
      face.push(obj.x, obj.y, obj.z);
    }
  }
  else face = new Array(468*3).fill(0);
  
  if (detections.leftHandLandmarks) {
    lh = [];
    for (const obj of detections.leftHandLandmarks) {
      lh.push(obj.x, obj.y, obj.z);
    }
  }
  else lh = new Array(21*3).fill(0);

  if (detections.rightHandLandmarks) rh = detections.rightHandLandmarks.reduce((res, obj) => {
    Object.values(obj).forEach(val => {
      if (val !== undefined) res.push(val);
    });
    return res;
  }, []);
  else rh = new Array(21*3).fill(0);

  return [...pose, ...face, ...lh, ...rh]; // Shape [1662,]
}

export default extractKeypoints;