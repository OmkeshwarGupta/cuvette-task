const e = require('express');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true},
    employeeSize: { type: Number, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    token: { type: String },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    otp: { type: String , expires: 600},

});

module.exports = mongoose.model('User', UserSchema);
