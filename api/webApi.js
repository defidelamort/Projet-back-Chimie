const express=require("express");
const cors=require("cors");
const buisness=require("../buisness/buisness");

const REQUEST_URL="/test";

let webApi={
    Start:port=>{
        const app=express();

        app.use(express.json());

        app.use(cors({ 
            origin:"*" 
        }));

        app.get(REQUEST_URL,(req,res)=>{
            let data={
                key:req.query.key,
                data:req.query.data
            };
            console.log(data);
            if (data.key=="Nom"){
                console.log("Ok");
                res.json(buisness.getAllProduitInCie());
            }
            else if(data.key=="Armor"){
                res.json(buisness.getAllArmor());
            }
            else if(data.key=="id"){
                res.json(buisness.getOneProduit(data.data));
            }
        });

        app.post(REQUEST_URL, (req, res) => {
            let is_added;
            let data=req.body;

            if(data.key=="Armor"){
                is_added = buisness.AddArmor(data.data);
            }
            else if(data.key=="Produit"){
                is_added = buisness.AddProduit(data.data);
            }

            // Send adequate responses
            if (is_added) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        });

        app.listen(port,()=>{
            console.log(`App listenig on port ${port}\n`);
        });
    }
};

module.exports=webApi;