const {DownstreamEvent} = require('ebased/schema/downstreamEvent');

class CardCreatedEvent extends DownstreamEvent {
    constructor(payload, meta){
        super({
            type:'CLIENT.CREATED',
            specversion:'v1.0.0',
            payload,
            meta,
            schema:{
               dbParams:{type: Object, required:true},
               status:{type:String, required: true}
            },
        })
    }
}

module.exports = {CardCreatedEvent}