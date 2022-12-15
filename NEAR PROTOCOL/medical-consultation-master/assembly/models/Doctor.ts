
@nearBindgen
export class Doctor{
  public name:string;
  public info:string;
  public specialty:string; 
  public doctorId:string
  
  
  constructor(name: string, info: string, specialty: string, doctorId:string) {
    this.name = name;
    this.info = info;
    this.specialty = specialty;
    this.doctorId = doctorId ; 
  }

}