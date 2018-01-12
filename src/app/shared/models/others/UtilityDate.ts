import { IMyDate } from "mydatepicker";

export   class UtilityDate { 
  

public static getCurrentDate() :String
{
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();  
 return dd+"/"+mm+"/"+yyyy;
}

  public static set(dtDate?:String):Object
    {
      let ar:String[];
      if(dtDate!=null)
      {
      ar=dtDate.split("/");
      }
      else{
        let currentDate=this.getCurrentDate();
        ar=currentDate.split("/");
      }
    
    return  {date:{ year: parseInt(ar[2].toString()), month: parseInt(ar[1].toString()),day:parseInt(ar[0].toString())}};
    }
  
    public static get(ar:any):any{
      return  ('0' + ar.date.day).slice(-2)+"/"+ ('0' +ar.date.month).slice(-2)+"/"+ar.date.year
  
    }

}
