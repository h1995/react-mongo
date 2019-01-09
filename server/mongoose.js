var express = require("express")
var mongoose = require("mongoose")
var app = express()
var connectionString = "mongodb://localhost:27017/mydb"
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.connect(connectionString, { useMongoClient: true }, () => {
  console.log("DB is connected")
})

var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});


var Test = mongoose.model('Test', userSchema);

// var chris = new Test({
//   name: 'ABC',
//   username: 'abc',
//   password: 'password',
//   admin: true
// });

// chris.save(function (err) {
//   if (err) throw err;
//   console.log('User saved successfully!');
// });

Test.find(function (error, result) {
  if (error) {
    console.log("error----->", error)
  } else {
    console.log("result----->", result)
  }
});

app.listen("3010", () => {
  console.log("server is listining on port 3010")
})