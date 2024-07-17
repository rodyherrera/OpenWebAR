import RoundedElement from '@components/aframe/roundedElement';

AFRAME.registerComponent('rounded-image', {
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
        opacity: {type: 'number', default: 1}
    },
    
    init(){
        this.roundedElement = new RoundedElement(this.el, this.data);
        this.createMesh();
    },
    
    update(oldData){
        if(!this.roundedElement.updateVisibility()) return;
        if(this.data.src !== oldData.src) this.updateTexture();
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
        this.updateTexture();
    },
    
    updateTexture(){
        const texture = new THREE.TextureLoader().load(this.data.src);
        texture.flipY = true;
        this.mesh.material.map = texture;
        this.mesh.material.needsUpdate = true;
    },
    
    remove(){
        this.roundedElement.remove();
    }
});
    
    
AFRAME.registerPrimitive('a-rounded-image', {
    defaultComponents: {
        'rounded-image': {}
    },
    mappings: {
        enabled: 'rounded-image.enabled',
        width: 'rounded-image.width',
        height: 'rounded-image.height',
        radius: 'rounded-image.radius',
        'top-left-radius': 'rounded-image.topLeftRadius',
        'top-right-radius': 'rounded-image.topRightRadius',
        'bottom-left-radius': 'rounded-image.bottomLeftRadius',
        'bottom-right-radius': 'rounded-image.bottomRightRadius',
        src: 'rounded-image.src',
        opacity: 'rounded-image.opacity',
        'look-at': 'look-at',
        'gps-new-entity-place': 'gps-new-entity-place',
        scale: 'scale'
    }
});