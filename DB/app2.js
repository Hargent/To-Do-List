
const mongoose = require('mongoose');

const User = require('./User')



// const DB_USER = 'Hargent';
// const PASSWORD = encodeURIComponent('Hargent@084'); 
const connectDB = async () => {  
  try {
    await mongoose.connect("mongodb://localhost/fruitsDB",  ()=> {
  console.log("Connected")})
}catch(err){ 
  console.log("Error")
}
}
connectDB();
run();


async function run (){
  try{
    const user = await new User({
      name: "Timmy",
      age: 20,
      email:"timmy@gmail.com",
      hobbies: ["Football","Fighting","gaming"],
      address: { city : "Ife",}} );

      await user.save();}catch(err){
        console.log(err.message)};
        };
      
      }
      // const user2 = await new User({
      //   name: "Jude",
      //   age: 20,
      //   email:"jude@gmail.com",
      //   hobbies: ["Football","Fighting","gaming","programming"],
      //   address: { city : "Ife",}} );
      //   const user3 = await new User({
      //     name: "Ralph",
      //     age: 20,
      //     email:"ralph@gmail.com",
      //     hobbies: ["Football","Fighting","gaming"],
      //     address: { city : "Ife"
      //   }});
        // User.find(function(err, Users){
        //   if (err) {
        //     console.log(err.message)
        //   }else{
        //     mongoose.connection.close()
        //   Users.forEach(function(Users){
        //     console.log(Users.name)
        //   })}
        //   }
        //   );}catch(err){
        //       console.log(err.message)};
        //     };
        //     User.updateOne({_id: "6219454c0180ca2894c4e1fa"},{age:18},function(err){
        //       if(err){
        //         console.log(err.message)
        //       }else{console.log("Updated successfully")}
        //     });

        //     User.deleteMany({
        //      age:20
        //     },function(err){
        //       if(err) {
        //         console.log(err.message)
        //       }else{console.log("Deleted")}
        //     })
      
    
    // const user = await User.findOne({name : "John", email : "john@gmail.com"})
    // console.log(user)
    // await User.insertMany([user,user2,user3],function(err){
    //   if(err){
    //     console.log(err)
    //   }else{console.log('Successfully saved')}
    // });
    // console.log("User saved")
    // console.log(user)
    // console.log(user.namedEmail)
    // user.sayHi()
  // }catch(err){
  //   console.log(err.message)}}



   
    