const {CreateCardValidation} = require('../schema/input/createCard');
const {CardCreatedEvent} = require('../schema/event/cardCreated');
const {emitCardCreated} = require('../service/emitCardCreated')

module.exports = async (eventPayload, commandMeta) => {
    new CreateCardValidation (eventPayload,commandMeta);
    const creditCardNumber = `${randomNumber(0000,9999)}-${randomNumber(0000,9999)}-${randomNumber(0000,9999)}-${randomNumber(0000,9999)}`
    const expirationDate = `${randomNumber(01,12)}/${randomNumber(21,35)}`
    const securityCode = `${randomNumber(000,999)}`
    let type = eventPayload.age > 45 ? 'Gold' : 'Classic'
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

