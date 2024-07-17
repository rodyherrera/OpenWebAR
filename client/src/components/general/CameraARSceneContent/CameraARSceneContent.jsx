import React from 'react';
import ContainedText from '@components/aframe/ContainedText';
import RoundedImage from '@components/aframe/RoundedImage'
import RoundedBox from '@components/aframe/RoundedBox';
import Text from '@components/aframe/Text';

const ARSceneContent = () => (
    <a-entity
        look-at='[gps-new-camera]'
        gps-new-entity-place='latitude: 51.05; longitude: -0.723'
        scale='50 50 50'
    >
        <RoundedImage src='/Walmart.png' position='0 .65 1' />

        <ContainedText
            width='1.7'
            height='.3' 
            fontPosition='0 0.25 1'
            position='0 .33 0'
            align='center'
            value='Walmart Chile S.A' />

        <RoundedBox width='2.5' height='1.3' position='0 -0.55 0' />
        
        <Text position='-1.08 -0.045 0.1' value='Café Volcan Grano Molido Fuerte, 250 gr' />
        <Text position='0.6 -0.045 0.1' value='$9.990 CLP' />
        <Text position='-1.08 -0.4 0.1' value='Peferido por los amantes de las sensaciones perdurables. Ideal para disfrutar en la preparación de un espresso. Aroma muy pronunciado y aromático, acidez baja, cuerpo alto.' />
            
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

        <RoundedImage 
            rotation='-20 0 0'
            position='0 -2.5 1'
            src='/juan-valdez-logo.png' 
            width='1' />
    </a-entity>
);

export default ARSceneContent;
