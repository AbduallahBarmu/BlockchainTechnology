import { Context, PersistentVector } from "near-sdk-as";
import { Writing } from "./models";








@nearBindgen 
class Contract{    

    // storage info in blockchaing
    writingList: PersistentVector<Writing> = new PersistentVector<Writing>("w"); 



    //write something 
    writeSomething(message:string , toWho:string):Writing{
        // we need to know who made call for this method so we will use context:
        let sender:string = Context.sender ; 
        // now we have there info : 1-message 2- to who  3- from who 
        // now we will store these information in the storge in the model.ts

        let writing: Writing = new Writing(message, sender, toWho);
        this.writingList.push(writing)  // anyone call this method , will take the object and save it in the list 
        
        return writing ; 
    
    }

    // return list of text
    listWritings():PersistentVector<Writing>{
        return this.writingList
    } // this method will return meta data about persistentVector 


    // to return all text by using Array 
    ArraylistWritings(): Array<Writing> {
        let writings= new Array<Writing>(this.writingList.length);
        for(let i=0 ; i < this.writingList.length ; i++){
            writings[i]= this.writingList[i];
        }
        return writings ; 
    }


}



