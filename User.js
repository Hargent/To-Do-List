const mongoose = require('mongoose');


    


// userSchema.statics.findByName = function (name){
//     return this.find({name: new RegExp(name,"i")})
// }
// userSchema.query.byName =function(name){
//     return this.where({name:new RegExp(name,"i")})
// }
// userSchema.methods.sayHi = function(){
//     console.log(`Hi, My name is ${this.name}`)
// }
// userSchema.virtual("namedEmail").get(function(){
//     return `${this.name} <${this.email}>`
// })
// userSchema.pre('save', function(next){
//     this.updateAt = Date.now()
//     // throw new Error('Fail Save')
//     next();
// })
// userSchema.post('save', function(doc,next){
//     doc.sayHi()
//     next();
// })

module.exports = mongoose.model("User",userSchema)