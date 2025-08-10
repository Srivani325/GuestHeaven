let switchEL = document.getElementById("switchCheckDefault");
  switchEL.addEventListener("click",()=>{
      let taxcost = document.getElementsByClassName("tax-info");
      for(tax of taxcost){
         if(tax.style.display != "inline")
          {
            tax.style.display= "inline";
          }
          else{
            tax.style.display= "none"
          }
      }
       console.log(taxcost);
  })