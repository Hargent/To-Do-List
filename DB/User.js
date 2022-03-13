const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street:String,
    city:String,
})

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type:Number,
        min:1,
        max:100,
        validate : {
            validator: v => v%2 === 0,
            message :props => `${props.value}is not an even number`
        }
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        minlength:5,
    },
    createdAt : { 
        type:Date,
        immutable:true,
        default: () => Date.now(),
    },
    updateAt :{
        type:Date,
        default: () => Date.now(),
    },
    bestFriend:{
    type :mongoose.SchemaTypes.ObjectId,
    ref : 'User'
    },
    hobbies: [String],
    address: addressSchema,
})

userSchema.statics.findByName = function (name){
    return this.find({name: new RegExp(name,"i")})
}
userSchema.query.byName =function(name){
    return this.where({name:new RegExp(name,"i")})
}
userSchema.methods.sayHi = function(){
    console.log(`Hi, My name is ${this.name}`)
}
userSchema.virtual("namedEmail").get(function(){
    return `${this.name} <${this.email}>`
})
userSchema.pre('save', function(next){
    this.updateAt = Date.now()
    // throw new Error('Fail Save')
    next();
})
userSchema.post('save', function(doc,next){
    doc.sayHi()
    next();
})

module.exports = mongoose.model("User",userSchema)