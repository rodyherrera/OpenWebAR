const deviceMotion = {
    lastCheckedTime: 0,
    delayTime: 500,
    movementThreshold: 0.5
};

const useParticles = (cameraContainerRef) => {
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

    return { requestDeviceMotionPermission };
};

export default useParticles;