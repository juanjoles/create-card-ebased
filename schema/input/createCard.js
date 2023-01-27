const {InputValidation} = require('ebased/schema/inputValidation');

class CreateCardValidation extends InputValidation {
    constructor(payload, meta) {
        super({
           type:'CREATED.CARD',
           specversion:'v1.0.0',
           source:meta.source,
           payload,
            schema:{
                id: { type: 'uuid/v4', required: true },
                dni:{type:Number, required:true},
                name:{type: String, required:true},
                lastname:{type: String, required:true},
                birth:{type:Date, required:true},
                age:{type:Number, required:true}
            },
        });
    }
}

module.exports = {CreateCardValidation}