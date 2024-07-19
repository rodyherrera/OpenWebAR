AFRAME.registerComponent('gesture-handler', {
    schema: {
        enabled: { default: true },
        rotationFactor: { default: 5 },
        minScale: { default: 0.3 },
        maxScale: { default: 8 }
    },
    
    init(){
        this.handleScale = this.handleScale.bind(this);
        this.handleRotation = this.handleRotation.bind(this);
        this.initialScale = this.el.object3D.scale.clone();
        this.scaleFactor = 1;
    },

    update(){
        if(this.data.enabled){
            this.el.sceneEl.addEventListener('onefingermove', this.handleRotation);
            this.el.sceneEl.addEventListener('twofingermove', this.handleScale);
            return;
        }
        this.el.sceneEl.removeEventListener('onefingermove', this.handleRotation);
        this.el.sceneEl.removeEventListener('twofingermove', this.handleScale);
    },

    remove(){
        this.el.sceneEl.removeEventListener('onefingermove', this.handleRotation);
        this.el.sceneEl.removeEventListener('twofingermove', this.handleScale);
    },

    handleRotation(e){
        this.el.object3D.rotation.y += e.detail.positionChange.x * this.data.rotationFactor;
        this.el.object3D.rotation.x += e.detail.positionChange.y * this.data.rotationFactor;
    },

    handleScale(e){
        this.scaleFactor *= 1 + e.detail.spreadChange / e.detail.startSpread;
        this.scaleFactor = Math.min(Math.max(this.scaleFactor, this.data.minScale), this.data.maxScale);
        this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
        this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
        this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
    }
});

AFRAME.registerComponent('gesture-detector', {
    schema: {
        element: { default: '' }
    },

    init(){
        this.targetElement = this.data.element && document.querySelector(this.data.element);
        if(!this.targetElement) this.targetElement = this.el;
        this.internalState = { previousState: null };
        this.emitGestureEvent = this.emitGestureEvent.bind(this);
        this.targetElement.addEventListener('touchstart', this.emitGestureEvent);
        this.targetElement.addEventListener('touchend', this.emitGestureEvent);
        this.targetElement.addEventListener('touchmove', this.emitGestureEvent);
    },

    remove(){
        this.targetElement.removeEventListener('touchstart', this.emitGestureEvent);
        this.targetElement.removeEventListener('touchend', this.emitGestureEvent);
        this.targetElement.removeEventListener('touchmove', this.emitGestureEvent);
    },

    emitGestureEvent(e){
        if(this.el.sceneEl.getAttribute('is-dragging')){
            return;
        }
        const currentState = this.getTouchState(e);
        const previousState = this.internalState.previousState;
        const gestureContinues = previousState && currentState && currentState.touchCount == previousState.touchCount;
        const gestureEnded = previousState && !gestureContinues;
        const gestureStarted = currentState && !gestureContinues;
        if(gestureEnded){
            const eventName = this.getEventPrefix(previousState.touchCount) + 'fingerend';
            this.el.emit(eventName, previousState);
            this.internalState.previousState = null;
        }
        if(gestureStarted){
            currentState.startTime = performance.now();
            currentState.startPosition = currentState.position;
            currentState.startSpread = currentState.spread;
            const eventName = this.getEventPrefix(currentState.touchCount) + 'fingerstart';
            this.el.emit(eventName, currentState);
            this.internalState.previousState = currentState;
        }
        if(gestureContinues){
            const eventDetail = {
                positionChange: {
                    x: currentState.position.x - previousState.position.x,
                    y: currentState.position.y - previousState.position.y
                }
            };
            if(currentState.spread){
                eventDetail.spreadChange = currentState.spread - previousState.spread;
            }
            Object.assign(previousState, currentState);
            Object.assign(eventDetail, previousState);
            const eventName = this.getEventPrefix(currentState.touchCount) + 'fingermove';
            this.el.emit(eventName, eventDetail);
        }
    },

    getTouchState(e){
        if(e.touches.length === 0) return null;
        const touchList = Array.from(e.touches);
        const touchState = { touchCount: touchList.length };
        const centerPositionRawX = touchList.reduce((sum, touch) => sum + touch.clientX, 0) / touchList.length;
        const centerPositionRawY = touchList.reduce((sum, touch) => sum + touch.clientY, 0) / touchList.length;
        touchState.positionRaw = { x: centerPositionRawX, y: centerPositionRawY };
        const screenScale = 2 / (window.innerWidth + window.innerHeight);
        touchState.position = {
            x: centerPositionRawX * screenScale,
            y: centerPositionRawY * screenScale
        };
        if(touchList.length >= 2){
            const spread = touchList.reduce((sum, touch) => {
                return (
                    sum + Math.sqrt(Math.pow(centerPositionRawX - touch.clientX, 2) + 
                                    Math.pow(centerPositionRawY - touch.clientY, 2))
                );
            }, 0) / touchList.length;
            touchState.spread = spread * screenScale;
        }
        return touchState;
    },

    getEventPrefix(touchCount){
        const numberNames = ['one', 'two', 'three', 'many'];
        return numberNames[Math.min(touchCount, 4) - 1];
    }
});