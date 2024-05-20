const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const propertySchema = new mongoose.Schema({
    place:{
        type : String,
        required : true,
    },
    Area:{
        type : String,
        required : true,
    },
    bedroom: {
        type: Number,
        required : true,
    },
    bathroom: {
        type: Number,
        required : true,
    },
    Nearby: {
        type: [String],
        enum: ['Hospital', 'College'],
        required: true,
    },
    seller_id :
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            Listed_At: {
                type: Date,
                default: Date.now()
            }
        },
    likes:[
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            LikedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    likeCount: {
        type: Number,
        default: 0
    }
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
