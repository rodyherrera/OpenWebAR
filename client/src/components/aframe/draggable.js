AFRAME.registerComponent('draggable', {
    init(){
        this.touch = new THREE.Vector2();
        this.lastTouchTime = 0;
        this.doubleTapThreshold = 200;
        this.el.sceneEl.addEventListener('touchmove', this.touchMoveHandler.bind(this));
        this.el.sceneEl.addEventListener('touchstart', this.touchStartHandler.bind(this));
        this.el.sceneEl.addEventListener('touchend', this.touchEndHandler.bind(this));
    },

    touchMoveHandler(e){
        if(!this.el.sceneEl.getAttribute('is-dragging')) return;
        this.updateTouchPosition(e.touches[0]);
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(this.touch, this.el.sceneEl.camera);
        const distance = this.el.object3D.position.distanceTo(this.el.sceneEl.camera.position);
        const point = raycaster.ray.direction.multiplyScalar(distance);
        this.el.setAttribute('position', `${point.x} ${point.y} ${point.z + 3}`);
    },

    touchStartHandler(e){
        this.updateTouchPosition(e.touches[0]);
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(this.touch, this.el.sceneEl.camera);
        const intersected = raycaster.intersectObject(this.el.object3D, true);
        if(!intersected.length) return;
        const currentTime = Date.now();
        if(currentTime - this.lastTouchTime <= this.doubleTapThreshold){
            this.el.sceneEl.setAttribute('is-dragging', true);
        }
        this.lastTouchTime = currentTime;
    },

    touchEndHandler(){
        this.el.sceneEl.removeAttribute('is-dragging');
    },

    updateTouchPosition(touch){
        this.touch.x = (touch.clientX / this.el.sceneEl.canvas.offsetWidth) * 2 - 1;
        this.touch.y = -(touch.clientY / this.el.sceneEl.canvas.offsetHeight) * 2 + 1;
    }
});
