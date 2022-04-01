const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');


router.get('/', function (req, res) {
    controller.getMessages()
    .then((messageList) => {
        response.success(req, res, messageList, 200);
    })
    .catch(e => {
        response.error(req, res, 'Unexpected Error', 500);
    })
});

router.post('/', function (req, res) {
    
    controller.addMessage(req.body.user, req.body.message)
    .then( (fullMessage) => {
        response.success(req, res, fullMessage, 201);
    })
    .catch(e => {
        response.error(req, res, "Información inválida.", 400);
    });
    
});

router.delete('/movie', function (req, res) {
    res.status(201).send(
        {
            "respuesta": "Movie deleted."
        }
    )
});

module.exports = router;