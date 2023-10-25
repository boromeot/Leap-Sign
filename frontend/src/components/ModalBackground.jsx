import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import classes from '../styles/ModalBackground.module.css';

function ModalBackground (props) {

    // console.log('signIn: ', props.signIn);
    // console.log('signUp: ', props.signUP);

    return (
        <>
        <div className={classes.modalBackground} onClick={props.closeModal}></div>
        
            {props.signIn ? 
            <SignIn closeModal={props.closeModal} />
            : 
            <SignUp closeModal={props.closeModal} />}
        
        </>
    )
};


export default ModalBackground;