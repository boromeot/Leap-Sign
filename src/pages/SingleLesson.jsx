import React from 'react';
import classes from '../styles/SingleLesson.module.css';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
export default function lesson() {
    const navigateTo = useNavigate();

    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
      };
      function handleClick() {
        navigateTo("/lessons");
    }
return(
    <>
    
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={handleChange}   onClick={handleClick} />}
      label="Mark as completed"
    />
    
    </>
)

}


