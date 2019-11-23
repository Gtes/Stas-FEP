import Chat from "./Chats";
import $ from 'jquery';


const talk= new Chat({
    onMessage: addLog,
})


const $log = $('#log');
const $input = $('#message');
const name = 'Boris';


$('#sendBtn').on('click', sendMessage);


function addLog(message) {
    $log.append(
        `<div class="${message.type}">${message.name}: ${message.message}</div>`
    );
}

function sendMessage() {
    const message = $input.val();
    // talk.send(name, 'message', message);
    talk.message(name, message )
}

talk.onopen(name);
