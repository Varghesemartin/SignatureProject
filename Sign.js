const colorPicker=document.getElementById("colorPicker");
const canvasColor=document.getElementById("backColor");
const canvas=document.getElementById("canva");
const clearBtn=document.getElementById("clearBtn");
const saveBtn=document.getElementById("saveBtn");
const retrieveBtn=document.getElementById("retrieveBtn");
const fontSize=document.getElementById("fontSize");

const ctx=canvas.getContext("2d");

colorPicker.addEventListener("change",(e)=>{
 ctx.strokeStyle=e.target.value;
 ctx.fillStyle=e.target.value;
})

canvas.addEventListener("mousedown",(event)=>{
    isDrawing=true;
    lastX=event.offsetX;//X coordinate
    lastY=event.offsetY;//Y coordinate
})

canvas.addEventListener("mousemove",(event)=>{
    if(isDrawing){
        ctx.beginPath();//Start a new path
        ctx.moveTo(lastX,lastY);// moves to specified coordinates
        ctx.lineTo(event.offsetX,event.offsetY);// draws a straight line
        ctx.stroke();// Render the path

        lastX=event.offsetX;
        lastY=event.offsetY;
    }
})
canvas.addEventListener("mouseup",(e)=>{
    isDrawing=false;
})

canvasColor.addEventListener("change",(e)=>{
    ctx.fillStyle=e.target.value;
    ctx.fillRect(0,0,900,500);
})

fontSize.addEventListener("change",(e)=>{
    ctx.lineWidth=e.target.value;
})
clearBtn.addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})

saveBtn.addEventListener("click",()=>{
    localStorage.setItem('canvasContents',canvas.toDataURL());

    let link=document.createElement("a");
    link.download="my-canva.png";
    link.href=canvas.toDataURL();

    link.click();

})

retrieveBtn.addEventListener("click",()=>{
    let savedCanvas=localStorage.getItem("canvasContents");

    if(savedCanvas){
        let img=new Image();
        img.src=savedCanvas;
        ctx.drawImage(img,0,0);
    }
})