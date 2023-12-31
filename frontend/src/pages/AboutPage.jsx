import { useState } from 'react';
import classes from '../styles/AboutPage.module.css';
import devImg from '../assets/devfrog.png';
import lilypad from '../assets/lilypad.png'

const developers = [
    {firstname: 'Michael', lastname: 'Faust', url: 'https://www.linkedin.com/in/michael-foust-671224a3/'},
    {firstname: 'Tyler', lastname: 'Boromeo', url: 'https://www.linkedin.com/in/kekoa-boromeo/'},
    {firstname: 'PJ', lastname: 'Singh', url: 'https://www.linkedin.com/in/prabhjot-singh-software-developer/'},
    {firstname: 'Shana', lastname: 'Edouard', url: 'https://www.linkedin.com/in/shana-edouard/'},
    {firstname: 'Thenu', lastname: 'Nachiyappan', url: 'https://www.linkedin.com/in/thenammai-nachiyappan-56bbaa1a2/'},
    {firstname: 'Leslie', lastname: 'Chou', url: 'https://www.linkedin.com/in/lesliechou921/'},
];

function AboutPage() {
    const [sayHi, setSayHi] = useState({});

    function showSayHiHandler(developerName) {
        setSayHi((prevGreetings) => ({
            ...prevGreetings,
            [developerName]: true,
        }));
    }
    function hideSayHiHandler(developerName) {
        setSayHi((prevGreetings) => ({
            ...prevGreetings,
            [developerName]: false,
        }));
    }



    return (
        <>
            {/* <div className={classes.aboutPageContainer}> */}
                <div className={classes.aboutPageText}>
                    <h1>About <span>LeapSign</span></h1>
                    <div className={classes.aboutText}>
                    <img src={lilypad} alt="app name" className={classes.lilyImg}/> 
                    <p><span>LeapSign</span>  is an educational project that has the potential to enrich the lives of families and strengthen bonds between parents and children.</p>
                    </div>
                    <div className={classes.aboutText}>
                        <img src={lilypad} alt="app name" className={classes.lilyImg}/>
                        <p><span>LeapSign</span> aims to provide an engaging and interactive platform for parents and children to learn sign language with a user-friendly application that offers interactive lessons with the power of AI to help give guided lessons through video and camera to show that the signs are being done correctly. 
                        </p>
                    </div>
                    <div className={classes.aboutText}>
                        <img src={lilypad} alt="app name" className={classes.lilyImg}/>
                        <p><span>LeapSign</span>'s vision is simple yet powerful: to empower families with the tools and resources they need to learn sign language and communicate with the Deaf and hard-of-hearing community. Sign language is a beautiful and expressive form of communication, and it should be accessible to everyone.</p>
                    </div>
                </div>
            

                <div className={classes.developersContainer}>
                    <h3>Meet the <span>LeapSign</span> team</h3>
                    <ul className={classes.developersUl}>
                        {developers.map((developer) => (
                            <li 
                            key={developer.firstname} 
                            onMouseOver={() => showSayHiHandler(developer.firstname)} 
                            onMouseLeave={() => hideSayHiHandler(developer.firstname)}
                            >
                                {sayHi[developer.firstname] && (
                                    <p className={classes.hi}>Hi, I'm {developer.firstname}!</p>
                                )}
                                <a href={developer.url} target='_blank' className={classes.frogJump}>
                                    <img className={classes.devImg} src={devImg} alt={developer.firstname} />
                                    <p>{developer.firstname} </p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            {/* </div> */}
        </>
    )
}
export default AboutPage;