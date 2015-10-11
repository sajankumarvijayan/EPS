/**
 * Created by sajankumar on 10/10/15.
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UsersSchema = new Schema({
    name: {type:String, required:true},
    email: {type:String, required:true,index: { unique: true }},
    password: {type:String, required:true},
    role:{type:String, default:'admin'},
    isLogged:{type:Boolean, default:false, required:true},
    date : {type:Date, default:Date.now()}
});

module.exports = mongoose.model('Users', UsersSchema);
