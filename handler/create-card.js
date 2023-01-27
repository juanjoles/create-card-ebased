const {commandMapper} = require ('ebased/handler')

const inputMode = require('ebased/handler/input/eventTopic');
const outputMode = require('ebased/handler/output/batchEventConfirmation');

const createCard = require('../domain/createCard');

module.exports.handler = async (command, context) => {
    return commandMapper(
        {command, context},
        inputMode,
        createCard,
        outputMode
    );
};