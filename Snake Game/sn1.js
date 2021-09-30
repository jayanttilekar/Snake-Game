const wall = document.getElementById("wal")
const scr = document.getElementById("scr")
const scr_w = document.getElementById("sc_wall")
var cov = document.getElementById("cover")
var winscr = document.getElementById("win_score")
var new_gm = document.getElementById("new_gm")
var animate_mov = null
var animate_turn = null
var posi_w = wall.getBoundingClientRect();
var posi_score_w = scr_w.getBoundingClientRect();
var hori =0 ,ver=0
var get_posi_nb
var posi_h
var score =0
var speed = 7
var comand

var head =[] 
head[0] = document.createElement("div");
head[0].id="hed"
head[0].className="head"
head[0].innerHTML=":="
wall.appendChild(head[0]);

console.log("t="+posi_w.top,"r="+posi_w.right,"b="+posi_w.bottom,"l="+posi_w.left);
console.log("t="+posi_score_w.top,"r="+posi_score_w.right,"b="+posi_score_w.bottom,"l="+posi_score_w.left)
var div
rand_blockgen() 

document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowRight") {
      comand="r"
        clearInterval(animate_mov);
        for(let i =0;i<=score;i++)
        {
         head[i].style=`transform: rotate(0deg);top:${ver}px;left:${hori}px;`
        }
        animate_mov = setInterval(moveRight,speed);
    }
     if (event.key === "ArrowLeft") {
       comand="l"
        clearInterval(animate_mov);
        
        for(let i =0;i<=score;i++)
        {
        head[i].style=`transform: rotate(180deg);top:${ver}px;left:${hori}px;`
        }
        animate_mov = setInterval(moveLeft,speed);
    }
     if (event.key === "ArrowUp") {
      comand="u"
        clearInterval(animate_mov);
        for(let i =0;i<=score;i++)
        {
          head[i].style=`transform: rotate(270deg);left:${hori}px;top:${ver}px;`
        }
         animate_mov = setInterval(moveUp,speed);
    }
     if (event.key === "ArrowDown") {
      comand="d"
        clearInterval(animate_mov);
        for(let i =0;i<=score;i++)
        {
        head[i].style=`transform: rotate(90deg);left:${hori}px;top:${ver}px;`
        }
        animate_mov = setInterval(moveDown,speed);
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



function body_gen()
{
  let prev_body_posi = head[score-1].getBoundingClientRect()
console.log("prev bdy "+prev_body_posi.left+" "+prev_body_posi.top)
console.log(score)
head[score] = document.createElement("div");
head[score].id="body"+[score]
head[score].className="new_body"
head[score].innerHTML="||||||"
if(comand==="r" || comand==="l"){head[score].style = `px;margin-top:${prev_body_posi.top-20}px;`}
if(comand==="u" || comand==="d"){head[score].style = `px;margin-left:${prev_body_posi.left-20}px;`}

wall.appendChild(head[score]);
}



function moveRight() 
{   let k =1
     posi_h = head[0].getBoundingClientRect();
    if((posi_h.right > (posi_w.right-17))||((posi_h.right > (posi_score_w.left))&&(posi_h.top < (posi_score_w.bottom))))
    {
        cov.style="visibility:visible;" 
        winscr.innerHTML="Score = "+score
    }
    else
    {
      let temp= hori
      for(let i =0;i<=score;i++)
      {
        if(k===i)
        {
          temp-=40
          k++
        }
        head[i].style.left = temp+"px";
      }
      if(((Math.floor(posi_h.right)) === get_posi_nb.left) && (((posi_h.top <= get_posi_nb.top)&&(posi_h.bottom>=get_posi_nb.top))
       || ((posi_h.bottom>=get_posi_nb.bottom)&&(posi_h.top<=get_posi_nb.bottom))))
      {
        wall.removeChild(div)  
        score++;
        rand_blockgen() 
        body_gen()
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
  let k =1 
     posi_h = head[0].getBoundingClientRect();

    if(posi_h.left < (posi_w.left+17))
    {
        cov.style="visibility:visible;"  
        winscr.innerHTML="Score = "+score
    }
    else{
      let temp= hori
      for(let i =0;i<=score;i++)
      {
        if(k===i)
        {
          temp+=40
          k++
        }
       head[i].style.left = temp+"px";
      }
    if(((Math.floor(posi_h.left)) === get_posi_nb.left) && (((posi_h.top <= get_posi_nb.top)&&(posi_h.bottom>=get_posi_nb.top))
       || ((posi_h.bottom>=get_posi_nb.bottom)&&(posi_h.top<=get_posi_nb.bottom))))
      {
        wall.removeChild(div)  
        score++;
        rand_blockgen()
        body_gen() 
        speed-=0.5;
        scr.innerHTML=score
      }
      else{
        hori--;
     }
    }
}

function moveUp() 
{   let k =1
     posi_h = head[0].getBoundingClientRect();
     if((posi_h.top < (posi_w.top+17))||((posi_h.top < (posi_score_w.bottom))&&(posi_h.right > (posi_score_w.left))))
    {
        cov.style="visibility:visible;"  
        winscr.innerHTML="Score = "+score
    }
    else{
      let temp= ver
      for(let i =0;i<=score;i++)
      {
        if(k===i)
        {
          temp+=40
          k++
        }
       head[i].style.top = temp+"px";
      }
    if(((Math.floor(posi_h.top)) === get_posi_nb.top) && (((posi_h.left <= get_posi_nb.left)&&(posi_h.right>=get_posi_nb.left))
       || ((posi_h.right>=get_posi_nb.right)&&(posi_h.left<=get_posi_nb.right))))
      {
        wall.removeChild(div)
        score++;   
        rand_blockgen()
        body_gen()
        head[score].style=`transform: rotate(270deg);left:${hori}px;top:${ver}px;`
        speed-=0.5;
        scr.innerHTML=score
      }
      else{
        ver--;
    }
    }
}

function moveDown() 
{ let k =1
     posi_h = head[0].getBoundingClientRect();
     
    if(posi_h.bottom > (posi_w.bottom-17))
    {
        cov.style="visibility:visible;"  
        winscr.innerHTML="Score = "+score
    }
    else{
      let temp= ver
      for(let i =0;i<=score;i++)
     {
      if(k===i)
      {
        temp-=40
        k++
      }
      head[i].style.top = temp+"px";
     }
    if(((Math.floor(posi_h.bottom)) === get_posi_nb.top) && (((posi_h.left <= get_posi_nb.left)&&(posi_h.right>=get_posi_nb.left))
       || ((posi_h.right>=get_posi_nb.right)&&(posi_h.left<=get_posi_nb.right))))
      {
        wall.removeChild(div)  
        score++;
        rand_blockgen() 
        body_gen()
        head[score].style=`transform: rotate(90deg);left:${hori}px;top:${ver}px;`
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