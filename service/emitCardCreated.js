const config = require('ebased/util/config');
const dynamo = require('ebased/service/storage/dynamo');

const TABLE_NAME = config.get('Clients')

const emitCreateCard = async (item) => dynamo.putItem({TableName:TABLE_NAME, Item:item})

 module.exports = {emitCreateCard};