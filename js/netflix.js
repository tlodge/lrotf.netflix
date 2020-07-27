
const films = [
   {id:1, film:"afterlife"}, {id:2, film:"americasgottalent"}, {id:3, film:"fearcity"}, {id:4, film:"goodgirls"}, {id:5, film:"insatiable"}, {id:6, film:"moneyheist"}, {id:7, film:"pupacademy"},
   {id:8, film:"topgear"}, {id:9, film:"whitelines"}, {id:10, film:"babysittersclub"},  {id:11, film:"designatedsurvivor"}, {id:12, film:"downtoearth"}, {id:13, film:"eurovision"}, {id:14, film:"feelthebeat"},
   {id:15, film:"formula1"}, {id:16, film:"gracefrankie"}, {id:17, film:"murdermystery"}, {id:18, film:"sinner"}, {id:19, film:"thecrown"}, {id:20, film:"unsolvedmysteries"},  {id:21, film:"workinmoms"}, 

]


let count = 0;

document.addEventListener("DOMContentLoaded", function(){
   var slider = document.getElementById("myRange");
   const smax = Math.floor(0.5* films.length);
   
   renderLine("trending",0, smax);
   renderLine("watchagain",1, smax);
   renderLine("originals",2, smax);
   // Update the current slider value (each time you drag the slider handle)
   slider.oninput = function() {
     
     const totalfilms = Math.max(1,Math.floor(this.value/100 * films.length));
     console.log(totalfilms);
     renderLine("trending"    ,0, totalfilms);
     renderLine("watchagain"  ,1, totalfilms);
     renderLine("originals"   ,2, totalfilms);
   }
});


const renderLine =(title, row, tf)=>{

   const line = fetchRandomSelection(tf);

   const root = d3.select(`div.row-${row}`);
   
   root.style("position", "absolute").style("top", `${row * 280}px`);

   const card = d3.select(`div.${title}`).selectAll("img").data(line, d=>d.id);
   
   //update
   card.attr("src", d=>`films/${d.film}.jpg`).style("opacity", 0).transition().duration(750).delay((d,i)=>200).style("opacity", 1).style("left", (d,i)=>`${i*351}px`);
      
   //enter  
   card.enter().append("img").attr("class", "card").attr("src", d=>`films/${d.film}.jpg`).style("opacity", 0).transition().duration(750).delay((d,i)=>200).style("left", (d,i)=>`${i*351}px`).style("opacity", 1);
    
   //exit
   card.exit().transition().duration(750).style("opacity", 0).remove();
}

const fetchRandomSelection = (max)=>{

   const shuffled = films.map(a => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map(a => a[1]);

   return shuffled.reduce((acc, item, i)=>{
      if (i < max){
          acc.push(item);
      }
      return acc;
   },[]);   
}

