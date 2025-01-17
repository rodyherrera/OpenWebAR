class RoundedElement{
    constructor(el, data){
        this.el = el;
        this.data = data;
        this.mesh = null;
    }

    createGeometry(){
        const shape = new THREE.Shape();
        const { width, height, radius } = this.data;
        const adjustedRadius = height <= 0.2 ? Math.min(width / 2, height / 2) : radius;
        shape.moveTo(-width / 2 + adjustedRadius, height / 2);
        shape.lineTo(width / 2 - adjustedRadius, height / 2);
        shape.quadraticCurveTo(width / 2, height / 2, width / 2, height / 2 - adjustedRadius);
        shape.lineTo(width / 2, -height / 2 + adjustedRadius);
        shape.quadraticCurveTo(width / 2, -height / 2, width / 2 - adjustedRadius, -height / 2);
        shape.lineTo(-width / 2 + adjustedRadius, -height / 2);
        shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2, -height / 2 + adjustedRadius);
        shape.lineTo(-width / 2, height / 2 - adjustedRadius);
        shape.quadraticCurveTo(-width / 2, height / 2, -width / 2 + adjustedRadius, height / 2);
        const geometry = new THREE.ShapeBufferGeometry(shape);
        const positions = geometry.attributes.position.array;
        const uvs = new Float32Array(positions.length * 2 / 3);
        for(let i = 0; i < positions.length; i += 3){
            const x = positions[i];
            const y = positions[i + 1];
            uvs[i / 3 * 2] = (x / width) + 0.5;
            uvs[i / 3 * 2 + 1] = (y / height) + 0.5;
        }
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        return geometry;
    }

    createMesh(material){
        const geometry = this.createGeometry();
        this.mesh = new THREE.Mesh(geometry, material);
        this.el.setObject3D('mesh', this.mesh);
    }

    updateVisibility(){
        if(!this.data.enabled){
            if (this.mesh) this.mesh.visible = false;
            return false;
        }
        if(!this.mesh) return false;
        this.mesh.visible = true;
        return true;
    }

    updateGeometry(){
        if(this.mesh) this.mesh.geometry = this.createGeometry();
    }

    updateOpacity() {
        if(this.mesh) this.mesh.material.opacity = this.data.opacity;
    }

    remove() {
        if(this.mesh) this.el.removeObject3D('mesh');
    }
}

export default RoundedElement;
