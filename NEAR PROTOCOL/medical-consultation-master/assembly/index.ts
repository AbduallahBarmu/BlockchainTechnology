import { Context, PersistentVector , PersistentMap } from "near-sdk-as";

// import modules 
import { Doctor} from "./models/Doctor"
import {Consultation , MessageState} from './models/Consultation'



@nearBindgen
export class Contract{

  // storage info in blockchaing
  messageLists:PersistentVector<Consultation> = new PersistentVector<Consultation>('w')
  keys: PersistentVector<string> = new PersistentVector<string>("keys");
  patientKeys: PersistentVector<string> = new PersistentVector<string>("patientKeys");
  replyLists:PersistentVector<Consultation> = new PersistentVector<Consultation>('w')
  doctorMessagesLists: PersistentMap<string , Consultation> = new PersistentMap<string, Consultation>('w')
  doctors: PersistentMap<string, Doctor> = new PersistentMap<string,Doctor>("doctor"); 





  //create consultation message(Patient => doctor by doctor ID )
  createConsultation(doctorId:string, message:string ):Consultation{
      let sender:string = Context.sender ; 
      let consultation:Consultation = new Consultation(doctorId ,message, sender );
      this.messageLists.push(consultation)  // anyone call this method , will take the object and save it in the list 
      
      return consultation ; 
  }




  //list`s consultations for the doctor  
  listConsultations(): Array<Consultation> {
      let messages = new Array<Consultation>(this.messageLists.length);
      for(let i = 0 ; i < this.messageLists.length ; i++){
        messages[i]= this.messageLists[i];
       }  
       return messages ; 
    }




  //add new Doctor account
  @mutateState()
  addNewDoctor(doctorId:string, name:string , info:string , specialty:string ):string{
        doctorId = doctorId.toUpperCase();
        let doctorInfo = new Doctor(doctorId , name , info , specialty );
        this.keys.push(doctorId)
        this.doctors.set(doctorId , doctorInfo)
        return "Doctor Created: " + doctorId + " Doctor Name : " + name + " " + " Doctor information :" + info + "  " + " Doctor Specialty: " + " " + specialty
    }




  @mutateState()
  //list Doctors by specialty
  listDoctors(specialty:string):Map<string, Doctor>{
    
      //map can't be returned directly. we need to copy the values to a temp normal map and return it 
      const returnDoctors:Map<string ,Doctor> = new Map<string , Doctor>();
      for(let i = 0 ; i < this.keys.length ; i++){  
        if(specialty == this.doctors.getSome(this.keys[i]).specialty){  // search by specialty
          returnDoctors.set(this.keys[i], this.doctors.getSome(this.keys[i])); 
        }
      }
      return returnDoctors; 
    }




    @mutateState()
    //method that docror replay on patient message by his ID (Patient receive message from doctor )
    doctorReply(doctorId:string , message:string):Consultation{
        let reply:string = Context.sender ; 
        let replyMessage:Consultation = new Consultation(doctorId,message,reply )
        this.replyLists.push(replyMessage)
        return replyMessage

    }




    @mutateState()
    // List doctor`s Consultations
    ListDoctorConsultations(doctorId:string):Map<string,Consultation>{
        const doctorMessages:Map<string ,Consultation> = new Map<string,Consultation>();
        for(let i = 0 ; i < this.patientKeys.length ; i++){
          if(doctorId == this.doctorMessagesLists.getSome(this.patientKeys[i]).doctorId ) // && this.doctorMessagesLists.status == MessageState.New
            doctorMessages.set(this.patientKeys[i], this.doctorMessagesLists.getSome(this.patientKeys[i])) ; 
          }
          return doctorMessages; 
    }









}
