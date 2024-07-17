import RoundedElement from '@components/aframe/roundedElement';

AFRAME.registerComponent('rounded', {
    schema: {
        enabled: {default: true},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        radius: {type: 'number', default: 0.15},
        topLeftRadius: {type: 'number', default: -1},
        topRightRadius: {type: 'number', default: -1},
        bottomLeftRadius: {type: 'number', default: -1},
        bottomRightRadius: {type: 'number', default: -1},
        color: {type: 'color', default: '#FFFFFF'},
        opacity: {type: 'number', default: 0.8}
    },
  
    init(){
        this.roundedElement = new RoundedElement(this.el, this.data);
        this.createMesh();
    },
    
    update(oldData){
        if(!this.roundedElement.updateVisibility()) return;
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
        this.mesh.material.color = new THREE.Color(this.data.color);
    },
    
    createMesh(){
        const geometry = this.roundedElement.createGeometry();
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(this.data.color),
            side: THREE.DoubleSide,
            emissive: new THREE.Color('#1c1c1c'),
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: this.data.opacity,
            shininess: 100
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.el.setObject3D('mesh', this.mesh);
    },
    
    remove(){
        this.roundedElement.remove();
    },
    
    pause(){},
    play(){}
});

AFRAME.registerPrimitive('a-rounded-box', {
    defaultComponents: {
        rounded: {}
    },
    mappings: {
        enabled: 'rounded.enabled',
        width: 'rounded.width',
        height: 'rounded.height',
        radius: 'rounded.radius',
        'top-left-radius': 'rounded.topLeftRadius',
        'top-right-radius': 'rounded.topRightRadius',
        'bottom-left-radius': 'rounded.bottomLeftRadius',
        'bottom-right-radius': 'rounded.bottomRightRadius',
        color: 'rounded.color',
        opacity: 'rounded.opacity',
        'look-at': 'look-at',
        'gps-new-entity-place': 'gps-new-entity-place',
        scale: 'scale'
    }
});