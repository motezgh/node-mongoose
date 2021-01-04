const mongoose=require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log('Connected correctly to server');

    Dishes.create({
        name:'Uthapizza',
        description:'test'
    })
    .then((dish)=>{
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{description:'Updated test'}
        },{
            new:true //once the update is complete,then this will return updated dish to us
        }).exec(); // executed
    })
    .then((dish)=>{
        console.log(dish);

        dish.comments.push({
            rating:5,
            comment:"I'am getting a sinking feeling!",
            author:'Leonardo di Carpaccio'
        });
        return dish.save();
    })
    .then((dish)=>{
        console.log(dish);
        return Dishes.remove({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=> {
        console.log(err);
    });
})