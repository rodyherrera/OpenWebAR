AFRAME.registerComponent('rounded', {
    schema: {
        enabled: { default: true },
        width: { type: 'number', default: 1 },
        height: { type: 'number', default: 1 },
        radius: { type: 'number', default: 0.15 },
        topLeftRadius: { type: 'number', default: -1 },
        topRightRadius: { type: 'number', default: -1 },
        bottomLeftRadius: { type: 'number', default: -1 },
        bottomRightRadius: { type: 'number', default: -1 },
        color: { type: 'color', default: '#FFFFFF' },
        opacity: { type: 'number', default: 0.8 }
    },

    init: function(){
        this.rounded = new THREE.Mesh(this.draw(), new THREE.MeshPhongMaterial({
            color: new THREE.Color(this.data.color),
            side: THREE.DoubleSide,
            emissive: new THREE.Color('#1c1c1c'),
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: this.data.opacity,
            shininess: 100
        }));
        this.el.setObject3D('mesh', this.rounded);
    },

    update: function () {
        if(!this.data.enabled){
            this.rounded.visible = false;
            return;
        }
        if(!this.rounded) return;
        this.rounded.visible = true;
        this.rounded.geometry = this.draw();
        this.rounded.material.color = new THREE.Color(this.data.color);
        this.rounded.material.opacity = this.data.opacity;
    },

    draw: function () {
        const roundedRectShape = new THREE.Shape();
        const roundedRect = (ctx, x, y, width, height, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius) => {
            if(!topLeftRadius) topLeftRadius = 0.00001;
            if(!topRightRadius) topRightRadius = 0.00001;
            if(!bottomLeftRadius) bottomLeftRadius = 0.00001;
            if(!bottomRightRadius) bottomRightRadius = 0.00001;
            ctx.moveTo(x - width / 2, y - height / 2 + topLeftRadius);
            ctx.lineTo(x - width / 2, y - height / 2 + height - topLeftRadius);
            ctx.quadraticCurveTo(x - width / 2, y - height / 2 + height, x - width / 2 + topLeftRadius, y - height / 2 + height);
            ctx.lineTo(x - width / 2 + width - topRightRadius, y - height / 2 + height);
            ctx.quadraticCurveTo(x - width / 2 + width, y - height / 2 + height, x - width / 2 + width, y - height / 2 + height - topRightRadius);
            ctx.lineTo(x - width / 2 + width, y - height / 2 + bottomRightRadius);
            ctx.quadraticCurveTo(x - width / 2 + width, y - height / 2, x - width / 2 + width - bottomRightRadius, y - height / 2);
            ctx.lineTo(x - width / 2 + bottomLeftRadius, y - height / 2);
            ctx.quadraticCurveTo(x - width / 2, y - height / 2, x - width / 2, y - height / 2 + bottomLeftRadius);
        };
        const corners = [this.data.radius, this.data.radius, this.data.radius, this.data.radius];
        if(this.data.topLeftRadius != -1) corners[0] = this.data.topLeftRadius;
        if(this.data.topRightRadius != -1) corners[1] = this.data.topRightRadius;
        if(this.data.bottomLeftRadius != -1) corners[2] = this.data.bottomLeftRadius;
        if(this.data.bottomRightRadius != -1) corners[3] = this.data.bottomRightRadius;
        roundedRect(roundedRectShape, 0, 0, this.data.width, this.data.height, corners[0], corners[1], corners[2], corners[3]);
        return new THREE.ShapeBufferGeometry(roundedRectShape);
    },

    pause: function () { },
    play: function () { }
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