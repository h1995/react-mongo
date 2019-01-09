var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require("body-parser");
var url = "mongodb://localhost:27017/";
var ObjectID = require("mongodb").ObjectID;
let dbo;
var cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(cors());

io.on("connection", function(socket) {
  console.log("a user connected");
  // socket.emit('EditedData', 'data');
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

MongoClient.connect(
  url,
  function(err, db) {
    if (err) throw err;
    dbo = db.db("mydb");
    // let existcoll = dbo.getCollectionNames()
    // console.log("existcoll---->", existcoll)
    // if (!existcoll.includes("customers")) {
    //   dbo.createCollection("customers", function (err, res) {
    //     if (err) throw err;
    //     console.log("Collection created!");
    //     db.close();
    //   });
    // }
  }
);

http.listen("5000", () => {
  console.log("server is listening port 5000");
});

app.get("/customer", function(req, res) {
  dbo
    .collection("customers")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
});

app.post("/customer", function(req, res) {
  dbo.collection("customers").insert(req.body, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/updateCustomer", function(req, res) {
  dbo
    .collection("customers")
    .updateOne(
      { _id: ObjectID(req.body._id) },
      { $set: { task: req.body.task } },
      function(err, result) {
        if (err) throw err;
        console.log("updateCustomer result------>", result);
        res.send(result);
      }
    );
});

app.delete("/customer", function(req, res) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var myquery = { _id: ObjectID(req.body._id) };
      dbo.collection("customers").remove(myquery, function(err, obj) {
        if (err) throw err;
        console.log("delete obj---->", obj);
        res.send(obj);
      });
    }
  );
});
