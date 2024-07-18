import { useEffect, useRef } from 'react';

const deviceMotion = {
    lastCheckedTime: 0,
    delayTime: 200,
    movementThreshold: 0.5
};

const useParticles = (cameraContainerRef) => {
    const isDeviceMotionPermissionDenied = useRef(false);

    useEffect(() => {
        if(!cameraContainerRef.current) return;
        for(let i = 0; i < 35; i++) createParticle();
        const deviceMotionHandler = (e) => {
            const currentTime = Date.now();
            if((currentTime - deviceMotion.lastCheckedTime) >= deviceMotion.delayTime){
                handleMotion(e)
            }
        };
        window.addEventListener('devicemotion', deviceMotionHandler);
        return () => {
            window.removeEventListener('devicemotion', deviceMotionHandler);
            const particles = document.querySelectorAll('.Camera-Particle-Entity');
            particles.forEach((particle) => particle.remove())
        };
    }, []);

    const handleMotion = (e) => {
        const { acceleration } = e;
        const { movementThreshold } = deviceMotion;
        if(!cameraContainerRef.current) return;
        const particles = cameraContainerRef.current.querySelectorAll('.Camera-Particle-Entity');
        const x = Math.abs(acceleration.x);
        const y = Math.abs(acceleration.y);
        const z = Math.abs(acceleration.z);
        particles.forEach((particle) => {
            particle.style.transition = 'background 0.3s ease-out';
            particle.style.background = (acceleration && (x > movementThreshold || y > movementThreshold || z > movementThreshold) || !isDeviceMotionPermissionDenied.current) 
                ? 'transparent' 
                : '#f5f5f5';
        });
        setTimeout(() => {
            deviceMotion.lastCheckedTime = Date.now();
        }, deviceMotion.delayTime);
    }

    const animateParticle = (particleNode) => {
        const duration = 3000 + Math.random() * 3000;
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
        const radius = 35;
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * radius;
        const x = centerX + distance * Math.cos(angle);
        const y = centerY + distance * Math.sin(angle);
        particleNode.style.left = `${x}%`;
        particleNode.style.top = `${y}%`;
        particleNode.style.background = 'transparent';
        cameraContainerRef.current.appendChild(particleNode);
        animateParticle(particleNode);
    }

    const requestDeviceMotionPermission = async () => {
        if(typeof(DeviceMotionEvent) !== 'undefined' && typeof(DeviceMotionEvent.requestPermission) === 'function'){
            const response = await DeviceMotionEvent.requestPermission();
            isDeviceMotionPermissionDenied.current = (response === 'granted');
        };
    }

    return { requestDeviceMotionPermission };
};

export default useParticles;