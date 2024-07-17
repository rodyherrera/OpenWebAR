AFRAME.registerComponent('event-set', {
    schema: {
        default: '',
        parse(value){
            return AFRAME.utils.styleParser(value);
        }
    },

    multiple: true,

    init(){
        this.eventHandler = null;
        this.eventName = null;
    },

    update(){
        this.removeEventListener();
        this.updateEventListener();
        this.addEventListener();
    },

    remove(){
        this.removeEventListener();
    },

    pause(){
        this.removeEventListener();
    },

    play(){
        this.addEventListener();
    },

    updateEventListener(){
        const { data, el } = this;
        const event = data._event || this.id;
        const target = data._target;
        const targetEl = target ? el.sceneEl.querySelector(target) : el;
        this.eventName = event;
        const handler = () => {
            let propertyName;
            for(propertyName in data){
                if(propertyName === '_event' || propertyName === '_target') continue;
                AFRAME.utils.entity.setComponentProperty.call(this, targetEl, propertyName, data[propertyName]);
            }
        };
        if(!isNaN(data._delay)){
            this.eventHandler = () => {
                setTimeout(handler, parseFloat(data._delay));
            };
        }
        this.eventHandler = handler;
    },

    addEventListener(){
        this.el.addEventListener(this.eventName, this.eventHandler);
    },

    removeEventListener(){
        this.el.removeEventListener(this.eventName, this.eventHandler);
    }
})