const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {type: String, index: true}, 
    ut: {type: Date, default: Date.now}, 
    pos: {
        lat: {type: Number, default: 37.1}, 
        lng: {type: Number, default: 127.1}, 
    }, 
    type: {type: Number, default: 0}, 
    rmk: {type: String, default: '신규'}, 
    gr_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}], 
});

module.exports = mongoose.model('Campany', companySchema);
