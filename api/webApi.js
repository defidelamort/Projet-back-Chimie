const express=require("express");
const cors=require("cors");
const buisness=require("../buisness/buisness");

const REQUEST_URL="/products";

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
                res.json(buisness.getAllProduitInCie());
            }
            else if(data.key=="Armor"){
                res.json(buisness.getAllArmor());
            }
            else if (data.key=="Type"){
                res.json(buisness.getAllTypeProduit());
            }
            else if(data.key=="id"){
                res.json(buisness.getOneProduit(data.data));
            }
            else if(data.key=="ProdArmor"){
                res.json(buisness.getProduitInCieInArmor(data.data));
            }
        });

        app.post(REQUEST_URL, (req, res) => {
            
            let data=req.body;

            if(data.key=="Armor"){
                let is_added = buisness.AddArmor(data.data);
                if (is_added) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(400);
                }
            }
            else if(data.key=="Produit"){
                let Armor = buisness.AddProduit(data.data);
                if (Armor !== undefined) {
                    res.status(200).send(Armor.toString());
                } else {
                    res.status(400).send("Il n'y a pas asser d'armoire");
                }
            }
            
        });

        app.listen(port,()=>{
            console.log(`App listenig on port ${port}\n`);
        });
    }
};

module.exports=webApi;