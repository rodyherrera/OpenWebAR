import React from 'react';
import ContainedText from '@components/aframe/ContainedText';

const ARSceneContent = () => (
    <a-entity
        look-at='[gps-new-camera]'
        gps-new-entity-place='latitude: 51.05; longitude: -0.723'
        scale='50 50 50'
    >
        <a-rounded-image
            src='/Walmart.png'
            radius='0.1'
            width='0.5'
            height='0.5'
            position='0 .65 1' />

        <ContainedText
            width='1.7'
            height='.3' 
            fontPosition='0 0.25 1'
            position='0 .33 0'
            align='center'
            value='Walmart Chile S.A' />

        <a-rounded-box
            width='2.5'
            height='1.3'
            color='#FFFFFF'
            opacity='.8'
            radius='.15'
            position='0 -0.55 0'
            rotation='0 0 0'
            depth='0' />
        
        <a-text
            color='#333333'
            position='-1.08 -0.045 0.1'
            width='2'
            value='Café Volcan Grano Molido Fuerte, 250 gr'
            rotation='0 0 0' />

        <a-text
            color='#333333' 
            width='2'
            position='0.6 -0.045 0.1'
            value='$9.990 CLP' />
            
        <a-text
            color='#333333'
            width='2'
            position='-1.08 -0.4 0.1'
            value='Peferido por los amantes de las sensaciones perdurables. Ideal para disfrutar en la preparación de un espresso. Aroma muy pronunciado y aromático, acidez baja, cuerpo alto.  ' />
        
        <ContainedText
            backgroundColor='#0071DC'
            width='2'
            height='.3'
            color='#FFFFFF'
            fontPosition='-0.32 -0.76 0.6'
            position='0 -0.85 .3'
            value='Agregar al carrito'
        />

        <a-rounded-video
            src='/jv-add.mp4'
            autoplay='true'
            width='1.8'
            height='1'
            radius='.05'
            loop='true'
            rotation='-20 0 0'
            position='0 -1.45 1' />

        <a-rounded-image
            src='/juan-valdez-logo.png'
            radius='0.1'
            width='1'
            height='.5'
            rotation='-20 0 0'
            position='0 -2.5 1' />
    </a-entity>
);

export default ARSceneContent;
