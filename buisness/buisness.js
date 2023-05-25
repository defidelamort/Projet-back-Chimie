const dataManagement = require("../data/data");
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

const findArmor=(dataProduct)=>{
    let ListArmor=data.getArmor();
    let TypeProduit=data.getTypeProduit();

    let Type=TypeProduit.find(val=>val.idType==dataProduct.idType);
    let Armor=ListArmor.find(val=>(val.Pictogramme==Type.Pictogramme || val.Pictogramme==0 ));
    
    if(Armor===undefined){
        return Armor;
    }

    else {
        if (Armor.Pictogramme==0){
            dataManagement.modifyPictogramme(Armor.idArmor,Type.Pictogramme);
        }
        return Armor.idArmor;
    }

    
    
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

    getAllTypeProduit:()=>{
        let TypeProduit=data.getTypeProduit();
        let final=[];

        for(let type of TypeProduit){
            final.push({
                id:type.idType,
                Nom:type.Nom,
                Image:type.Image,
                Pictogramme:type.Pictogramme
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

        let res={
            Nom:Type.Nom,
            Image:Type.Image,
            DatePeremption:Produit.DatePeremption,
            Localisation:Armor.Localisation,
            LienFichedeSecurite:Type.LienFichedeSecurite,
            id:Produit.id,
            Pictogramme:Type.Pictogramme
        };
        return res;


    },

    getProduitInCieInArmor:idArmor=>{
        let ProduitInCie=data.getProduitInCie();
        let TypeProduit=data.getTypeProduit();
        let final=[];

        for(let produit of ProduitInCie){
            if(idArmor==produit.idArmor){
                let type=TypeProduit.find(val=>val.idType==produit.idType);
                final.push({
                    id:produit.id,
                    Nom:type.Nom,
                    Image:type.Image,
                    Pictogramme:type.Pictogramme
                });
            }
        }

        return final;
    },

    AddArmor:dataArmor=>{
        if (!goodData(dataArmor,check_Armor)){
            return false;
        }
        else
        {
            dataArmor.Pictogramme=0;
            return data.AddArmor(dataArmor);
        }
    },

    AddProduit:dataProduit=>{
        if (!goodData(dataProduit,check_Produit)){
            return false;
        }
        else
        {
            dataProduit.idArmor=findArmor(dataProduit);
            if(dataProduit.idArmor!==undefined && data.AddProduit(dataProduit)){
                return dataProduit.idArmor;
            }
            else{
                return undefined;
            }
        }
    }
};

module.exports=buisness;