export default class Chat {
    constructor(config) {
        this.websocket = new WebSocket('ws://fep-app.herokuapp.com');
        console.log(this.websocket)

        this.onmymsg = config.onMessage;
        // this.name = config.name;

        // console.log(this.name)

        this.onmessage();
        this.onopen();
    }

    send(name, type, message) {
        this.websocket.send(JSON.stringify({
            name,
            type,
            message
        }))
    }

    message(name, message){
        this.send(name,'message', message);
    }

    onopen(name) {
        this.websocket.onopen = () => {
            this.send(name, 'connected', 'connected')
        }
    }

    onmessage() {
        let data;
        this.websocket.onmessage = e => {
            data = JSON.parse(e.data);
            this.onmymsg(data)
        }

    }


}