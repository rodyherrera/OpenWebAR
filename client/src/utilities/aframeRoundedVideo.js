import RoundedElement from '@utilities/roundedElement';

AFRAME.registerComponent('rounded-video', {
    schema: {
        enabled: {default: true},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        radius: {type: 'number', default: 0.15},
        topLeftRadius: {type: 'number', default: -1},
        topRightRadius: {type: 'number', default: -1},
        bottomLeftRadius: {type: 'number', default: -1},
        bottomRightRadius: {type: 'number', default: -1},
        src: {type: 'string', default: ''},
        opacity: {type: 'number', default: 1},
        autoplay: {type: 'boolean', default: true},
        loop: {type: 'boolean', default: true}
    },
    
    init(){
        this.roundedElement = new RoundedElement(this.el, this.data);
        this.videoEl = document.createElement('video');
        this.videoEl.setAttribute('crossorigin', 'anonymous');
        this.videoEl.setAttribute('playsinline', '');
        this.createMesh();
    },
    
    update(oldData){
        if(!this.roundedElement.updateVisibility()) return;
        if(this.data.src !== oldData.src) this.updateVideo();
        if(this.data.width !== oldData.width || 
                this.data.height !== oldData.height || 
                this.data.radius !== oldData.radius ||
                this.data.topLeftRadius !== oldData.topLeftRadius ||
                this.data.topRightRadius !== oldData.topRightRadius ||
                this.data.bottomLeftRadius !== oldData.bottomLeftRadius ||
                this.data.bottomRightRadius !== oldData.bottomRightRadius){
            this.roundedElement.updateGeometry();
        }
        this.roundedElement.updateOpacity();
        document.querySelector('body').addEventListener('touchstart', () => {
            this.videoEl.play();
        });
        if(this.data.loop !== oldData.loop) this.videoEl.loop = this.data.loop;
    },
    
    createMesh(){
        const geometry = this.roundedElement.createGeometry();
        const material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            opacity: this.data.opacity
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.el.setObject3D('mesh', this.mesh);
        this.updateVideo();
    },
    
    updateVideo(){
        const { src, autoplay, loop } = this.data;
        this.videoEl.src = src;
        this.videoEl.autoplay = autoplay;
        this.videoEl.loop = loop;
        const texture = new THREE.VideoTexture(this.videoEl);
        texture.flipY = true;
        this.mesh.material.map = texture;
        this.mesh.material.needsUpdate = true;
    },
    
    remove(){
        this.roundedElement.remove();
        if(this.videoEl){
            this.videoEl.pause();
            this.videoEl.src = '';
        }
    },
    
    pause(){
        this.videoEl.pause();
    },
    
    play(){}
});

AFRAME.registerPrimitive('a-rounded-video', {
    defaultComponents: {
        'rounded-video': {}
    },
    mappings: {
        enabled: 'rounded-video.enabled',
        width: 'rounded-video.width',
        height: 'rounded-video.height',
        radius: 'rounded-video.radius',
        'top-left-radius': 'rounded-video.topLeftRadius',
        'top-right-radius': 'rounded-video.topRightRadius',
        'bottom-left-radius': 'rounded-video.bottomLeftRadius',
        'bottom-right-radius': 'rounded-video.bottomRightRadius',
        src: 'rounded-video.src',
        opacity: 'rounded-video.opacity',
        autoplay: 'rounded-video.autoplay',
        loop: 'rounded-video.loop',
        'look-at': 'look-at',
        'gps-new-entity-place': 'gps-new-entity-place',
        scale: 'scale'
    }
});