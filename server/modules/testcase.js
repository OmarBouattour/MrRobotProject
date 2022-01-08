const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testcaseSchema = new Schema({
    name: {type : String, required : true , unique : true},
    upload: String,
    run: String,
    modify: String,
    delete: String,
    step1: String,
    step2: String,
    step3: String,
    step4: String,
    step5: String,
    step6: String,
    step7: String,
    checked: { type: Boolean, default: false }

    
    });
module.exports = mongoose.model('testcase', testcaseSchema, 'testcases');
