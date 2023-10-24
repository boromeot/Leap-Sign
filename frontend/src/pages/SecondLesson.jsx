import React from 'react';
import classes from '../styles/SingleLesson.module.css';
import { useNavigate } from 'react-router-dom';
import FrogAnimation from './FrogAnimation';


export default function lesson2() {
  const navigateTo = useNavigate();

  // const [checked, setChecked] = React.useState(false);
  // const [animate, setAnimate] = React.useState(false);

  // const handleChange = (event) => {
  //     setChecked(event.target.checked);
  // };

  const handleClick = async () => {
    navigateTo("/lessons");
  }


return (
    <>

    {/* <FormControlLabel
      control={<Checkbox checked={checked} onChange={handleChange} onClick={handleClick} />}
      label="Mark as completed"
    /> */}

    <div>
      <button onClick={handleClick}>
        Continue
      </button>
    </div>

    </>
)

}
