const fs=require("fs");
const fileProduit="./data/produitType.json";
const fileArmor="./data/armor.json";
const fileProduitInCie="./data/produitInCie.json";

let lastElement=(List,id)=>{
    let lastid=-1;
    for(let i=0; i<List.length;i++){
        let data=List[i];
        lastid=(data[id]>lastid) ? data[id]:lastid;
    }
    return lastid;
};

let dataManagement={
    /**
     * 
     * @returns {Array} List type of produit
     */
    getTypeProduit:()=>{
        let rawdata=fs.readFileSync(fileProduit);  
        let data=JSON.parse(rawdata);
        return data; 
    },


    /**
     * 
     * @returns {Array} List diffferent Armor
     */
    getArmor:()=>{
        let rawdata=fs.readFileSync(fileArmor);  
        let data=JSON.parse(rawdata);
        return data; 
    },


    /**
     * 
     * @returns {Array} List different Product in Cie
     */
    getProduitInCie:()=>{
        let rawdata=fs.readFileSync(fileProduitInCie);  
        let data=JSON.parse(rawdata);
        return data; 
    },

    AddArmor:dataArmor=>{
        let rawdata = fs.readFileSync(fileArmor);
        let ListArmor=JSON.parse(rawdata);

        let lastid=lastElement(ListArmor,"idArmor");

        dataArmor.idArmor=lastid+1;
        
        ListArmor.push(dataArmor);

        try{
            fs.writeFileSync(fileArmor,JSON.stringify(ListArmor));
        } catch(error){
            console.error(error);
            return false;
        }
        
        return true;
    },

    AddProduit:dataProduit=>{
        let rawdata = fs.readFileSync(fileProduitInCie);
        let ListProduit=JSON.parse(rawdata);

        let lastid=lastElement(ListProduit,"id");

        dataProduit.id=lastid+1;
        
        ListProduit.push(dataProduit);

        try{
            fs.writeFileSync(fileProduitInCie,JSON.stringify(ListProduit));
        } catch(error){
            console.error(error);
            return false;
        }
        
        return true;
    }
};

module.exports=dataManagement;