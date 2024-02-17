const express = require("express");
let app=express();
const router = express.Router();
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// app.use("/upload", express.static("upload"));

let userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  age: Number,
  gender: String,
  phonenumber: Number,
  password: String,
  profilepic: String,
});
let User = new mongoose.model("users", userSchema);

router.post("/signup", upload.single("profilepic"), async (req, res) => {
  console.log(req.body);
  let hashedPassword= await bcrypt.hash(req.body.password,10);
  console.log(req.body.password);
  console.log(hashedPassword);
  let detailsUser = await User.find().and({ email: req.body.email });
  if (
    req.body.fn == "" ||
    req.body.ln == "" ||
    req.body.email == "" ||
    req.body.age == "" ||
    req.body.gender == "" ||
    req.body.phonenumber == "" ||
    req.body.password == "" ||
    req.body.profilepic == ""
  ) {
    res.json({
      status: "incorrect",
      msg: "fill the form properly",
    });
  } else {
    try {
      if (detailsUser.length > 0) {
        res.json({
          status: "userlength",
          msg: "user already exit",
        });
      } else {
        let newUser = new User({
          firstname: req.body.fn,
          lastname: req.body.ln,
          email: req.body.email,
          age: req.body.age,
          gender: req.body.gender,
          phonenumber: req.body.phonenumber,
          password: hashedPassword,
          profilepic: req.file.path,
        });
        await User.insertMany([newUser]);
        res.json({ status: "success", msg: "user created successfully" });
      }
    } catch (err) {
      res.json({ status: "failure", msg: "unable to created user" });
    }
  }
});
router.post("/validateLogin",upload.none(),async(req,res)=>{
    console.log(req.body);
    let detailsUser=await User.find().and({email:req.body.email});
    if(detailsUser.length==0){
        res.json({
            status:"failure",
            msg:"user does not exit"
        })
    }else{
      let result=await bcrypt.compare(req.body.password,detailsUser[0].password);
      console.log(result);
      if(result==true){
        // if(detailsUser[0].password==req.body.password){
          let encryptedCredential= jwt.sign({email:detailsUser[0].email,password:detailsUser[0].password},"Brn");
          console.log(encryptedCredential);
            res.json({
                status:"success",
                msg:"valid credential",
                token:encryptedCredential,
                data:detailsUser[0]
            })
        }else{
            res.json({
                status:"failure",
                msg:"Incorrect password"
            })

        }
    }
})
router.patch("/update",upload.single("profilepic"),async(req,res)=>{
  console.log(req.body);
  // let detailsUser=await User.find({email:req.body.email});
  try{
    await User.updateMany({email:req.body.email},
      {
        firstname: req.body.fn,
        lastname: req.body.ln,
   
        age: req.body.age,
        gender: req.body.gender,
        phonenumber: req.body.phonenumber,
        password: req.body.password,
        // profilepic: req.file.path,

      }
      );
      res.json({status:"success",msg:"successfully updated"});
  }catch(err){
    res.json({status:"failure",msg:"unable updated"});

  }
})
router.delete("/delete",upload.none(),async(req,res)=>{
  console.log(req.body);
  try{
    await User.deleteMany({email:req.body.email});
    res.json({
      status:"success",
      msg:"deleted user successfully"
    })
  }catch(err){
    res.json({
      status:"failure",
      msg:"unable to user deleted"
    })
   

  }
})
router.post("/validatetoken",upload.none(),async(req,res)=>{
  console.log(req.body.token);
try{
  let decryptedCredential=jwt.verify(req.body.token,"Brn");
  let detailsUser=await User.find({email:decryptedCredential.email});
  if(detailsUser.length>0){
    if(detailsUser[0].password==decryptedCredential.password){
      res.json({
        status:"success",
        msg:"valid token credential",
        data:detailsUser[0]
      })

    }
  }else{
    res.json({
      status:"failure",
      msg:"Invalid Token",
    
    })


  }
}catch(err){
 console.log(err);
}


})
module.exports = router;
