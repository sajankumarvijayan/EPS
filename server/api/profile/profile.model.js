/**
 * Created by sajankumar on 10/10/15.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    profileId : {type:String, required:true},
    profileDetails : {type:Array, required:true, default:[]},
    date:{type:Date,default:Date.now()}
});

module.exports = mongoose.model('Profile', ProfileSchema);
