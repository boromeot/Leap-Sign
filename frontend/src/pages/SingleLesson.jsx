import React from 'react';
import classes from '../styles/SingleLesson.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import FrogAnimation from './FrogAnimation';


export default function lesson() {
  const navigate = useNavigate();
  
  const { lessonId } = useParams();
  console.log("lessonId in singleLesson: ", lessonId);

  // const [checked, setChecked] = React.useState(false);
  // const [animate, setAnimate] = React.useState(false);

  // const handleChange = (event) => {
  //     setChecked(event.target.checked);
  // };

  // const handleClick = async () => {
  //   // navigateTo("/lessons?animate=true");
  //   navigateTo("/lessons");
  // }

  const navigateBackToLessons = () => {
    navigate('/lessons', { state: { animate: true, unlock: true } });

}

return (
    <>

    {/* <FormControlLabel
      control={<Checkbox checked={checked} onChange={handleChange} onClick={handleClick} />}
      label="Mark as completed"
    /> */}

    <div>
      <button onClick={navigateBackToLessons}>
        Continue
      </button>
    </div>

    </>
)

}
