const data=require("../data/data");



let buisness={
    getAllProduitInCie:()=>{
        let ProduitInCie=data.getProduitInCie();
        let TypeProduit=data.getTypeProduit();
        let final=[];

        for(let i=0;i<ProduitInCie.length();i++){
            let produit=ProduitInCie[i];
            let type=TypeProduit.find(val=>val.id==produit.idType);
            final.push({
                id:produit.id,
                Nom:TypeProduit[type].Nom,
                Image:TypeProduit[type].Image,
                Pictogramme:TypeProduit[type].Pictogramme
            });
        }

        return final;
    }
};

module.exports=buisness;