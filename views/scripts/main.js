window.onload = function () {

    var socket = io();
    var $messageContainer = $('.card-content');
    var $newMessage = $('#new__message');

    $(document).on('keydown', function (event) {

        // send new message after user presses enter
        if (event.which === 13) {
            newChatMessage();

            $newMessage.val('');
        }
    });

    /*
     * New Message
     */
    function newChatMessage() {
        var newMessage = $newMessage.val();

        socket.emit('new:chat:message', newMessage);

        addChatMessage({message: newMessage});
    }


    /*
     * Add Message
     */
    socket.on('add:chat:message', function (message) {
        addChatMessage(message);
    });

    function addChatMessage(message) {
        $messageContainer.append(message.message);
    }

};