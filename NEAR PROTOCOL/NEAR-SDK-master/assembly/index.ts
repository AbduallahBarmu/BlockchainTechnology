@nearBindgen        // we need this method to make our class valid on the BlockChain 
export class Contract {
  public message: string = 'hello world'
  // return the string 'hello world'
  helloWorld(): string {
    return this.message
  }


  // @mutateState() // this method allows to update data on BlockChain
  // update({ message }: { message: string }): string{
  //    this.message = message
  //    return 'method updated '
  // }

}
