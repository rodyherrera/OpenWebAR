import React, { useRef, useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { CgClose } from 'react-icons/cg';
import axios from 'axios';
import './Camera.css';

const deviceMotion = {
    lastCheckedTime: 0,
    delayTime: 500,
    movementThreshold: 0.5
};

const Camera = () => {
    const videoRef = useRef(null);
    const cameraContainerRef = useRef(null);
    const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    
    const animateParticle = (particleNode) => {
        const duration = 3000 + Math.random() * 3000;
        particleNode.animate([
            { background: 'transparent' },
            { background: '#F5F5F5' }
        ], { duration: 250 });
        const movementKeyframes = [
            { transform: 'translate(0, 0)' },
            { transform: `translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px)` },
            { transform: 'translate(0, 0)' }
        ];
        particleNode.animate(movementKeyframes, {
            duration: duration,
            iterations: Infinity,
            easeing: 'ease-in-out'
        });
    }

    const createParticle = () => {
        const particleNode = document.createElement('div');
        particleNode.className = 'Camera-Particle-Entity';
        const centerX = 50;
        const centerY = 50;
        const radius = 40;
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * radius;
        const x = centerX + distance * Math.cos(angle);
        const y = centerY + distance * Math.sin(angle);
        particleNode.style.left = `${x}%`;
        particleNode.style.top = `${y}%`;
        cameraContainerRef.current.appendChild(particleNode);
        animateParticle(particleNode);
    }

    const requestCameraPermission = async () => {
        try{
            const constraints = {
                video: {
                    facingMode: 'environment',
                    width: { ideal: 3840 },
                    height: { ideal: 2160 }
                }
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if(videoRef.current) videoRef.current.srcObject = stream;
        }catch(err){
            setCameraPermissionDenied(true);
        }
    }

    const takePhotoAndSend = () => {
        if(isSending || !videoRef.current) return;
        setIsSending(true);
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append('image', blob, 'frame.jpg');
            try{
                axios.post('https://bar.rodyherrera.com/compare/', formData);
            }catch(err){
                console.log('Error sending photo:', err);
            }finally{
                setIsSending(false);
            }
        });
    }

    const handleMotion = (e) => {
        const { acceleration } = e;
        const { movementThreshold } = deviceMotion;
        const particles = cameraContainerRef.current.querySelectorAll('.Camera-Particle-Entity');
        const particlesLen = particles.length;
        const x = Math.abs(acceleration.x);
        const y = Math.abs(acceleration.y);
        const z = Math.abs(acceleration.z);
        if(acceleration && particlesLen > 0 && (x > movementThreshold || y > movementThreshold || z > movementThreshold)){
            particles.forEach((particle) => {
                particle.style.transition = 'background 0.3s ease-out';
                particle.style.background = 'transparent';
                setTimeout(() => particle.remove(), 270);
            });
        }else{
            if(particlesLen === 0 && cameraContainerRef.current){
                for(let i = 0; i < 100; i++) createParticle();
            }
        }
        setTimeout(() => {
            deviceMotion.lastCheckedTime = Date.now();
        }, deviceMotion.delayTime);
    };

    const requestDeviceMotionPermission = async () => {
        if(typeof(DeviceMotionEvent) === 'undefined' && typeof(DeviceMotionEvent.requestPermission) !== 'function') return;
        const response = await DeviceMotionEvent.requestPermission();
        if(response !== 'granted') return;
        window.addEventListener('devicemotion', (e) => {
            const currentTime = Date.now();
            if((currentTime - deviceMotion.lastCheckedTime) >= deviceMotion.delayTime){
                handleMotion(e)
            }
        });
    };

    useEffect(() => {
        requestCameraPermission();
        const requestPermissionsBtn = document.getElementById('requestPermissionsBtn');
        requestPermissionsBtn.addEventListener('click', requestDeviceMotionPermission);
        return () => {
            if(videoRef.current && videoRef.current.srcObject){
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return (false) ? (
        <p>Permission denied. Please allow camera access.</p>
    ) : (
        <div className='Camera-Container' ref={cameraContainerRef}>
            <div className='Prompt-Container'>
                <div className='Prompt-Header-Title-Container'>
                    <i className='Prompt-Header-Icon-Container'>
                        <CgClose />
                    </i>
                    <h3 className='Prompt-Header-Title'>Your inmersive web experience</h3>
                    <p className='Prompt-Header-Description'>We need you to interactively provide us with permissions to use your device's sensors. It will only be once, your privacy will not be affected.</p>
                </div>
                <div className='Prompt-Footer-Container'>
                    <div className='Prompt-Option-Container' id='requestPermissionsBtn'>
                        <p className='Prompt-Option-Text'>Continue</p>
                    </div>
                </div>
            </div>

            <div className='Camera-Header-Container'>
                <div className='Camera-Header-Left-Container'>
                    <i className='Camera-Header-Back-Icon-Container'>
                        <FaArrowLeftLong className='Camera-Header-Back-Icon' />
                    </i>
                </div>
                <div className='Camera-Header-Title-Container'>
                    <h1 className='Camera-Header-Title'>Look around</h1>
                    <p className='Camera-Header-Subtitle'>What Pandora's box do we open today?</p>
                </div>
                <div>
                </div>
            </div>
            <video 
                className='Camera-Video'
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted />
            <div className='Camera-Footer-Container'>
                <div className='Camera-Footer-Left-Container'>
                </div>
                <div className='Camera-Footer-Center-Container'>
                    <div 
                        className='Camera-Trigger-Container'
                    >
                        <div className='Camera-Trigger-Button' />
                    </div>
                </div>
                <div className='Camera-Footer-Right-Container'>
                </div>
            </div>
        </div>
    );
};

export default Camera;