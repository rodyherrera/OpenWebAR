import React from 'react';

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

        <a-rounded-box
            width='1.2'
            height='.3'
            color='#FFFFFF'
            opacity='.8'
            radius='.15'
            position='0 .33 0'
        >
            <a-text 
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#000000'
                negate={false}
                position='0 -0.08 1'
                width='1.2'
                align='center'
                value={`Walmart Chile S.A`}
            />
        </a-rounded-box>

        <a-rounded-box
            width='2'
            height='2'
            color='#0071dc'
            opacity='.8'
            radius='.15'
            rotation='0 -40 0'
            position='2.6 -0.55 0'
        >
            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#FFFFFF'
                negate={false}
                width='1.8'
                position='-0.8 0.5 0.1'
                value='Descripción' />

            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#FFFFFF'
                negate={false}
                width='1.8'
                position='-0.3 0.5 0.1'
                value='Café Volcan Grano Molido Fuerte' />    

            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#FFFFFF'
                negate={false}
                width='1.8'
                position='-0.8 0.3 0.1'
                value='Marca' />

            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#FFFFFF'
                negate={false}
                width='1.8'
                position='0.4 0.3 0.1'
                value='Juan Valdez' />    

            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#FFFFFF'
                negate={false}
                width='1.8'
                position='-0.8 0.1 0.1'
                value='Tipo de producto' />

            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#FFFFFF'
                negate={false}
                width='1.8'
                position='0.65 0.1 0.1'
                value='Café' />   

            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#FFFFFF'
                negate={false}
                width='1.8'
                position='-0.8 -0.1 0.1'
                value='Páis de origen' />

            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#FFFFFF'
                negate={false}
                width='1.8'
                position='0.7 -0.1 0.1'
                value='CL' />

            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#FFFFFF'
                negate={false}
                width='1.8'
                position='-0.8 -0.3 0.1'
                value='Desc. Técnica' />

            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#FFFFFF'
                negate={false}
                width='1.8'
                position='0.1 -0.3 0.1'
                value='Ideal para Espresso' />     

            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#FFFFFF'
                negate={false}
                width='1.8'
                position='-0.8 -0.5 0.1'
                value='Condición Alimentaria' />

            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#FFFFFF'
                negate={false}
                width='1.8'
                position='0.24 -0.5 0.1'
                value='Libre de Lactosa' />   

            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#FFFFFF'
                negate={false}
                width='1.8'
                position='-0.8 -0.7 0.1'
                value='Contenido neto' />

            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#FFFFFF'
                negate={false}
                width='1.8'
                position='0.6 -0.7 0.1'
                value='250 g' />  
        </a-rounded-box>

        <a-rounded-box
            width='2.5'
            height='1.3'
            color='#FFFFFF'
            opacity='.8'
            radius='.15'
            position='0 -0.55 0'
        >
            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#121212'
                negate={false}
                width='1.8'
                position='-1.06 0.5 0.1'
                value='Café Volcan Grano Molido Fuerte, 250 gr' />

            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#121212'
                negate={false}
                width='1.8'
                position='-1.06 0.2 0.1'
                value='Peferido por los amantes de las sensaciones perdurables. Ideal para disfrutar en la preparación de un espresso. Aroma muy pronunciado y aromático, acidez baja, cuerpo alto.  ' />
            
            <a-text
                font='/aframe-msdf.json'
                font-image='/aframe.png'
                color='#000000' 
                negate={false}
                width='1.8'
                position='0.6 0.5 0.1'
                value='$9.990 CLP' />
            
            <a-rounded-box
                width='2'
                height='.3'
                color='#0071dc'
                opacity='.8'
                radius='.15'
                position='0 -0.3 .3'
            >
                <a-text
                    font='/aframe-msdf.json'
                    font-image='/aframe.png'
                    color='#FFFFFF' 
                    negate={false}
                    width='1.8'
                    align='center'
                    position='0 0.04 0.1'
                    value='Agregar al carrito' />
            </a-rounded-box>
        </a-rounded-box>

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
