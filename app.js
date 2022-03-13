//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/index.js");
const mongoose = require("mongoose");
const _ = require("lodash")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("css"));

const connectDB = async () => {  
    try {
        await mongoose.connect("mongodb://localhost:27017/todolistDB", ()=> {
            console.log("Connected")})
    }catch(err){
    console.log("Error")
    }
    };

connectDB();   

const itemsSchema = new mongoose.Schema({
    name :String
});

const Item = mongoose.model('Item',itemsSchema);


const item1 =  new Item({
    name: "Welcome to your to do list",
});
const item2 =  new Item( {
    name:"Use the + to add new items to your list."
});
const item3 =  new Item( {
    name:"Use the delete to remove items from your list."
    });
const defaultItems = [item1, item2, item3]; 


const listSchema =new mongoose.Schema({
    name:String,
    items : [itemsSchema]
})
const List = mongoose.model('List',listSchema)



app.set('view engine', 'ejs');

days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

app.get("/", function(req, res) {
    
    Item.find({},function (err, Items) {
        if (Items.length === 0) {
            Item.insertMany(defaultItems, function(err){
                if(err) {
                    console.log(err)
                }else {
                    console.log("Successfully created the Data Base")
                    }}); 
                    res.redirect("/");
        }else{
            res.render("index", { listTitle: "Today", newListItems: Items });
            console.log("Data Base found and updated");
        };
        })
});
app.post("/", function(req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.button;

    const item = new Item ({
        name:itemName
    });

    if (listName==="Today"){
        item.save();
        if(item.save()){
            console.log('new item saved')
            res.redirect('/');
        }else{
            console.log('item not saved')
        }
    }else{
        List.findOne({name:listName}, function(err,foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/"+ listName )
        })
    }
    
    
})

app.post('/delete', function(req, res){
    const checkedItem = req.body.checkbox;
    const listName = req.body.listName;
    if (listName ==="Today"){
        Item.findByIdAndRemove(checkedItem,function(err){
            if(err) {
                    console.log(err.message)
            }else{console.log("Successfully Deleted")}
        });    
        res.redirect('/')
    }else{
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItem}}},function(err,results){
            if(!err){
                res.redirect("/"+listName);
            }
        })
    }
    
});
app.get("/:customListName", function(req, res) {
    const customListName = _.capitalize(req.params.customListName);

    
    List.findOne({name:customListName},function (err, Lists) {
        if(!err){
            if (!Lists) {
                //create new list
            console.log('List not found');
            const list = new List({
                name: customListName,
                items: defaultItems,
            });
            list.save()
            res.redirect("/"+ customListName)
            }else{
                //show existing list
                console.log('List  found');
                res.render('index',{listTitle: Lists.name, newListItems: Lists.items})
            }
        }else{
            console.log(err.message)
        };
        });    
        
});

app.listen(3000, function() {
    console.log("Server started on port 3000")
})