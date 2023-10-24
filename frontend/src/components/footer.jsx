import { Link } from 'react-router-dom';

import logo from '../assets/frog.png';
import classes from '../styles/footer.module.css';


function Footer() {
    return (
        <>
        <footer>
            <div className={classes.footerContent}>
                <div className={classes.footerImg}>
                    <p>&copy; 2023 Copyright, <span>LeapSign</span></p>
                    <img src={logo} alt={'appname'} className={classes.logoJump} />
                </div>
                <Link to='/about' className={classes.aboutLink}>
                    <p className={classes.info}>&#8505;</p>
                    <p className={classes.aboutText}>About <span>LeapSign</span></p>
                </Link>
            </div>
        </footer>
        </>
    )
}

export default Footer;