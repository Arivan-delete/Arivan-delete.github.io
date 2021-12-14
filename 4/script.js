let centre_block=document.querySelector("fifth").innerHTML;
let workspace=document.querySelector("fifth");
let form=document.querySelector(".event_log");








function add_to_local_storage(information)
{
    let existing=localStorage.getItem("event");
    existing = existing ? existing.split(',') : [];
    let time = new Date(Date.now());
    
    existing.push("<br>"+information+" time:"+ time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());

    
    localStorage.setItem('event', existing.toString());
}


function building_canvas()
{
    document.querySelector(".play_button").style.display="none";
    form.style.display="none";
    localStorage.clear();
    add_to_local_storage("animation started!");
    workspace.innerHTML="";
    let canvas=document.createElement("canvas"); 
    canvas.className="canvas";
    workspace.appendChild(canvas);
    canvas.width=workspace.clientWidth;
    canvas.height=workspace.clientHeight;
    
    let i = 0;
    let j = 0;
    let x1=canvas.width/2,
        y1=canvas.height/2;
       
  
    let ctx = canvas.getContext('2d');
       
   let a= setInterval( ()=>{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.arc(x1, y1, 15, 0, 2 * Math.PI, true);
        ctx.fill();
        

        if(x1 == canvas.width+50|| x1 ==-50 || y1 == -50 || y1 == canvas.height+50){
            clearInterval(a);
            add_to_local_storage("Circle touched border: "+j+ " moves")
            stopping();
        }


        if(i == 0 ){
            if(Math.abs(Math.abs(x1)-(canvas.width/2))==j){
                i=1;
                j++;
                add_to_local_storage("GO LEFT");
            }
            else{
            x1-=1;           
            }
        }
        else{
            if(i ==1 ){
                if(Math.abs(Math.abs(y1)-(canvas.height/2))==j){
                    i=2;
                    j++;
                    add_to_local_storage("GO DOWN");
                }
                else{
                y1+=1;
                }
            }
            else{
                if(i == 2){
                    if(Math.abs(Math.abs(x1)-(canvas.width/2))==j){
                        i=3;
                        j++;
                        add_to_local_storage("GO RIGHT");
                    }
                    else{
                    x1+=1; 
                    }
                }
                else{
                    if(i = 3){
                        if(Math.abs(Math.abs(y1)-(canvas.height/2))==j){
                            i=0;
                            j++;
                            add_to_local_storage("GO UP"  );
                        }
                        else{
                        y1-=1;
                        }
                    }
                }       
            }
        }
        
        
        
        
        
    }, 0.01);

    let stop=document.querySelector(".stop");
    stop.style.display="block";
   
    
    document.querySelector("third").appendChild(stop); 

};


function stopping(){
    document.querySelector(".stop").style.display="none";
    workspace.innerHTML=centre_block;
    add_to_local_storage("animation stopped");
    workspace.className=("centreblock");
    workspace.style.display="grid";
    form.style.display="block";
    form.innerHTML=localStorage.getItem("event");
    document.querySelector(".play_button").style.display="block";
}

    