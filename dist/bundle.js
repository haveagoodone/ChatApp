/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

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

	    return data;
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

	    $messageList[0].scrollTop = $messageList[0].scrollHeight;
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



/***/ }
/******/ ]);