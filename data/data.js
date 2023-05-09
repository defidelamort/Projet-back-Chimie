const fs=require("fs");
const fileProduit="./data/produitType.json";
const fileArmor="./data/armor.json";
const fileProduitInCie="./data/produitInCie.json";

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
};

module.exports=dataManagement;