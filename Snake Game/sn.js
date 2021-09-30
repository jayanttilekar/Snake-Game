const head = document.getElementById("hed")
const wall = document.getElementById("wal")
const scr = document.getElementById("scr")
const scr_w = document.getElementById("sc_wall")
var cov = document.getElementById("cover")
var winscr = document.getElementById("win_score")
var new_gm = document.getElementById("new_gm")
var animate= null
var posi_w = wall.getBoundingClientRect();
var posi_score_w = scr_w.getBoundingClientRect();
var hori =0 ,ver=0
var get_posi_nb
var posi_h
var score =0
var speed = 7


console.log("t="+posi_w.top,"r="+posi_w.right,"b="+posi_w.bottom,"l="+posi_w.left);
console.log("t="+posi_score_w.top,"r="+posi_score_w.right,"b="+posi_score_w.bottom,"l="+posi_score_w.left)
var div
rand_blockgen() 

document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowRight") {
        clearInterval(animate);
        head.style=`transform: rotate(0deg);top:${ver}px;left:${hori}px;`
        animate = setInterval(moveRight,speed);
    }
     if (event.key === "ArrowLeft") {
        clearInterval(animate);
        head.style=`transform: rotate(180deg);top:${ver}px;left:${hori}px;`
        animate = setInterval(moveLeft,speed);
    }
     if (event.key === "ArrowUp") {
        clearInterval(animate);
        head.style=`transform: rotate(270deg);left:${hori}px;top:${ver}px;`
         animate = setInterval(moveUp,speed);
    }
     if (event.key === "ArrowDown") {
        clearInterval(animate);
        head.style=`transform: rotate(90deg);left:${hori}px;top:${ver}px;`
        animate = setInterval(moveDown,speed);
    }
  });




function rand_blockgen()
{
    console.log(speed)
    let left  = Math.floor((Math.random()*1500))
    let top = Math.floor((Math.random()*630))

    /*adjustment*/
    if(left<30){left=30}              
    if(top<30){top=30}

div = document.createElement("div");
div.id="new_food"
div.style = `margin-left:${left}px; margin-top:${top}px;`
wall.appendChild(div);
get_posi_nb = div.getBoundingClientRect();  
}




function moveRight() 
{   
     posi_h = head.getBoundingClientRect();
    if((posi_h.right > (posi_w.right-17))||((posi_h.right > (posi_score_w.left))&&(posi_h.top < (posi_score_w.bottom))))
    {
        cov.style="visibility:visible;" 
        winscr.innerHTML="Score = "+score
    }
    else
    {
      head.style.left = hori+"px";
      if(((Math.floor(posi_h.right)) === get_posi_nb.left) && (((posi_h.top <= get_posi_nb.top)&&(posi_h.bottom>=get_posi_nb.top))
       || ((posi_h.bottom>=get_posi_nb.bottom)&&(posi_h.top<=get_posi_nb.bottom))))
      {
        wall.removeChild(div)  
        rand_blockgen() 
        score++;
        speed-=0.5;
        scr.innerHTML=score
      }
      else{
        hori++;
      }
    }
     
}

function moveLeft() 
{
     posi_h = head.getBoundingClientRect();

    if(posi_h.left < (posi_w.left+17))
    {
        cov.style="visibility:visible;"  
        winscr.innerHTML="Score = "+score
    }
    else{
    head.style.left = hori+"px";
    if(((Math.floor(posi_h.left)) === get_posi_nb.left) && (((posi_h.top <= get_posi_nb.top)&&(posi_h.bottom>=get_posi_nb.top))
       || ((posi_h.bottom>=get_posi_nb.bottom)&&(posi_h.top<=get_posi_nb.bottom))))
      {
        wall.removeChild(div)  
        rand_blockgen() 
        score++;
        speed-=0.5;
        scr.innerHTML=score
      }
      else{
        hori--;
     }
    }
}

function moveUp() 
{   
     posi_h = head.getBoundingClientRect();
     if((posi_h.top < (posi_w.top+17))||((posi_h.top < (posi_score_w.bottom))&&(posi_h.right > (posi_score_w.left))))
    {
        cov.style="visibility:visible;"  
        winscr.innerHTML="Score = "+score
    }
    else{
    head.style.top = ver+"px";
    if(((Math.floor(posi_h.top)) === get_posi_nb.top) && (((posi_h.left <= get_posi_nb.left)&&(posi_h.right>=get_posi_nb.left))
       || ((posi_h.right>=get_posi_nb.right)&&(posi_h.left<=get_posi_nb.right))))
      {
        wall.removeChild(div)  
        rand_blockgen()
        score++; 
        speed-=0.5;
        scr.innerHTML=score
      }
      else{
        ver--;
    }
    }
}

function moveDown() 
{ 
     posi_h = head.getBoundingClientRect();
     
    if(posi_h.bottom > (posi_w.bottom-17))
    {
        cov.style="visibility:visible;"  
        winscr.innerHTML="Score = "+score
    }
    else{
    head.style.top = ver+"px";
    if(((Math.floor(posi_h.bottom)) === get_posi_nb.top) && (((posi_h.left <= get_posi_nb.left)&&(posi_h.right>=get_posi_nb.left))
       || ((posi_h.right>=get_posi_nb.right)&&(posi_h.left<=get_posi_nb.right))))
      {
        wall.removeChild(div)  
        rand_blockgen() 
        score++;
        speed-=0.5;
        scr.innerHTML=score
      }
      else{
        ver++;
    }
    }
}


new_gm.addEventListener("click",function(){
    location.reload();
})