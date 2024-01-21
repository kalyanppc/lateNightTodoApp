const express = require('express');
const app = express();

app.use(express.json());

app.get('/example',(req,res)=>{
      res.json({
            msg: "this is woring",
      })
})

app.listen(3000,()=>{
      console.log('This code is working');
})