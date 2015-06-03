window.onload = function () {

    var socket = io();
    var $messageList = $('#message__list');
    var $messageInput = $('#message__input');
    var $usernameInput = $('#username__input');

    /*
     * Key events
     */
    $(document).on('keydown', function (event) {

        // send new message after user presses enter
        if (event.which === 13) {
            newChatMessage();
            $messageInput.val('');
        }
    });


    /*
     * New Message
     */
    function newChatMessage() {
        var data = {
            message: $messageInput.val(),
            username: $usernameInput.val()
        };

        if (!data.username) {
            data.username = 'Gast_' + Math.floor((Math.random() * 100) + 1);
            $usernameInput.focus();
            $usernameInput.val(data.username);
            $messageInput.focus();
        }

        socket.emit('new:chat:message', data);

        addChatMessage(data);
    }


    /*
     * Add Chat Message
     */
    socket.on('add:chat:message', function (data) {
        addChatMessage(data);
    });

    function addChatMessage(data) {
        var $message = _buildHtml('span', {'class': 'message'} , data.message);
        var $username = _buildHtml('span', {'class': 'username'} , data.username);
        var $content = $($username).add($message);
        var $listItem = _buildHtml('li', {'class': 'listitem'}, $content);

        $messageList.append($listItem);
    }


    /*
     * Helper functions
     */
    function _buildHtml(tagName, attributes, content) {
        var el = document.createElement(tagName);
        if (attributes) $(el).attr(attributes);
        if (content) $(el).html(content);
        return el;
    }

};