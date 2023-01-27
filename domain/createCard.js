const {CreateCardValidation} = require('../schema/input/createCard');
const {CardCreatedEvent} = require('../schema/event/cardCreated');
const {emitCardCreated} = require('../service/emitCardCreated')

module.exports = async (eventPayload, commandMeta) => {
    new CreateCardValidation (eventPayload,commandMeta);
    let type = eventPayload.age > 65 ? 'Gold' : 'Classic'
    const dbParams = {
        ExpressionAttributeNames: {
          "#C": "creditCard",
        },
        ExpressionAttributeValues: {
          ":c": {
            M: {
              "number": {
                S: creditCardNumber,
              },
              "expiration": {
                S: expirationDate,
              },
              "ccv": {
                S: securityCode,
              },
              "type":{
                S: type
              }
            },
          },
        },
        Key: {
          dni: {
            S: body.dni,
          },
        },
        ReturnValues: "ALL_NEW",
        TableName: "clients",
        UpdateExpression: "SET #C = :c",
      };
    const result = {dbParams, status : 'Card created'}
    await emitCardCreated(new CardCreatedEvent(result, commandMeta))
    return {body: result};
};

