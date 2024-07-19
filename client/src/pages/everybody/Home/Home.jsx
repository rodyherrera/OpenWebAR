import React from 'react';
import Camera from '@components/general/Camera';
import useWindowSize from '@hooks/useWindowSize';
import brandVrConcept from '@images/brand/vr-concept.png';
import './Home.css';

const Home = () => {
    const { width } = useWindowSize();

    if(width <= 768){
        return <Camera />
    }

    return (
        <main id='Home-Desktop-Experience-Main'>
            <section id='Home-Desktop-Experience-Header-Container'>
                <h3 id='Home-Desktop-Experience-Title'>Sorry, you can only access the AR session on mobile devices.</h3>
                <p id='Home-Desktop-Experience-Description'>Our entire WebAR ecosystem is optimized to work on mobile devices, you can access your dashboard and explore or create new entities.</p>
                <button className='Button-Container'>Go to dashboard</button>
            </section>

            <figure id='Home-Desktop-Experience-Concept-Image-Container'>
                <img src={brandVrConcept} alt='Concept Image' id='Home-Desktop-Experience-Concept-Image' />
            </figure>
        </main>
    );
};

export default Home;