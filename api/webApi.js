const express=require("express");
const cors=require("cors");
const buisness=require("../buisness/buisness");

const REQUEST_URL="/test";

let webApi={
    Start:port=>{
        const app=express();

        app.use(express.json());

        app.use(cors({ origin:"*" }));

        app.get(REQUEST_URL,(req,res)=>{
            let data=req.body;
            if (data.key=="Nom"){
                res.json(buisness.getAllProduitInCie());
            }
        });

        app.listen(port,()=>{
            console.log(`App listenig on port ${port}\n`);
        });
    }
};

module.exports=webApi;