const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },  
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }],
   recommendationsReceived: [
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property'
    },
    recommendedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    recommendedAt: {
      type: Date,
      default: Date.now
    }
  }
]
}, {
    timestamps: true,
},
 { 
  collection: 'users'
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};



module.exports = mongoose.model('User', userSchema);