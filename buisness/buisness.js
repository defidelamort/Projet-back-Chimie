const data=require("../data/data");
const check_Armor={
    NomArmoire: /^[A-Za-z0-9-_]+$/,
    Localisation: /^[A-Za-z0-9-_]+$/,
};
const check_Produit={
    idType: /^[0-9]+$/,
    DatePeremption: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
};

const goodData=(data,check)=>{
    let Lkey=Object.keys(data).sort();
    let Truekey=Object.keys(check).sort();
    if(!arrayEquals(Lkey,Truekey))return false;
    else{
        let i=0;
        while(i<Truekey.length && data[Truekey[i]].match(check[Truekey[i]])!= null) {
            i++;
        }
        if(i<Truekey.length) {
            console.log("Warnig data");
            return false;}
        else
        {
            return true;
        }
    }
};

const arrayEquals=(a, b)=>{
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
};


let buisness={
    getAllProduitInCie:()=>{
        let ProduitInCie=data.getProduitInCie();
        let TypeProduit=data.getTypeProduit();
        let final=[];

        for(let produit of ProduitInCie){
            let type=TypeProduit.find(val=>val.idType==produit.idType);
            final.push({
                id:produit.id,
                Nom:type.Nom,
                Image:type.Image,
                Pictogramme:type.Pictogramme
            });
        }

        return final;
    },
    
    getAllArmor:()=>{
        let ListArmor=data.getArmor();
        let final=[];

        for(let Armor of ListArmor){
            final.push({
                NomArmoire:Armor.NomArmoire,
                Localisation:Armor.Localisation,
                idArmoire:Armor.idArmor
            });
        }

        return final;
    },

    getOneProduit:(id)=>{
        let ProduitInCie =data.getProduitInCie();
        let ListArmor=data.getArmor();
        let TypeProduit=data.getTypeProduit();

        let Produit = ProduitInCie.find(val=>val.id==id);
        let Armor=ListArmor.find(val=>val.idArmor==Produit.idArmor);
        let Type=TypeProduit.find(val=>val.idType==Produit.idType);
        return {
            Nom:Type.Nom,
            Image:Type.ImageP,
            DatePeremption:Produit.DatePeremption,
            LieuStockage:Armor.LieuStockage,
            LienFichedeSecurite:Type.LienFichedeSecurite,
            id:Produit.id,
            Pictogramme:Type.Pictogramme
        };


    },

    AddArmor:dataArmor=>{
        if (!goodData(dataArmor,check_Armor)){
            return false;
        }
        else
        {
            return data.AddArmor(dataArmor);
        }
    },

    AddProduit:dataProduit=>{
        if (!goodData(dataProduit,check_Produit)){
            return false;
        }
        else
        {
            return data.AddProduit(dataProduit);
        }
    }
};

module.exports=buisness;