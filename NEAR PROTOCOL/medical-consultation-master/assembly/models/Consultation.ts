

export enum MessageState{
  New, Replied 
}


@nearBindgen
export class Consultation { 
  public doctorId: string;
  public message: string;
  public patientId: string;
  public status: MessageState; 

  constructor(
    doctorId:string ,
    message:string , 
    patientId:string , 
    status: MessageState = MessageState.New
  
    ) {   
    
    this.doctorId = doctorId;
    this.message = message;
    this.patientId = patientId; 
    this.status = status;
  }
  
}