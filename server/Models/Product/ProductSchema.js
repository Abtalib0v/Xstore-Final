const mongoose=require("mongoose");
const ProductSchema= mongoose.Schema({
    name:{
        type:String,    
        required:true,
        trim:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    categories:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ProductCategory",
    },
    imageUrl:{
        type:String,
        required:true,
    },
    colors:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ProductColor",
    },
    star:{
        type:Number,
        required:true,
        trim:true
    },
    // ratings:{
    //     type:Number,
    //     default:0
    // },
});
    
module.exports=mongoose.model("Product",ProductSchema);