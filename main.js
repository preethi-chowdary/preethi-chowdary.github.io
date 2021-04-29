let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");



let loadimage=(src,callback)=>{
    let img = document.createElement("img");

img.onload = ()=>callback(img);
img.src=src;
   

};

let imagepath=(framenumber,animation)=>{
    return "images/"+animation+"/"+framenumber+".png";
};

let frames={
    idle:[1,2,3,4,5,6,7,8],
    kick:[1,2,3,4,5,6,7],
    punch:[1,2,3,4,5,6,7],
    block:[1,2,3,4,5,6,7,8,9],
    forward:[1,2,3,4,5,6],
    backward:[1,2,3,4,5,6],
};

let loadimages=(callback)=>{
    let images={idle:[],kick:[],punch:[],block:[],forward:[],backward:[]};
    let imagestoload=0;
    ["idle","kick","punch","block","forward","backward"].forEach((animation)=>{
        let animationframes=frames[animation];
        imagestoload=imagestoload+animationframes.length;

        animationframes.forEach((framenumber)=>{
            let path=imagepath(framenumber,animation);

        loadimage(path,(image)=>{
            images[animation][framenumber-1]=image;
            imagestoload=imagestoload-1;

            if(imagestoload===0){
                callback(images);
            }


        });

        });
        
    });

};

let animate=(ctx,images,animation,callback)=>{
    images[animation].forEach((image,index)=>{
        setTimeout(()=>{
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(image, 0, 0,500,500);

        },index*100);

    });
    setTimeout(callback,images[animation].length*100);
};


loadimages((images)=>{
    let queuedanimations=[];
    let aux=()=>{
        let selectedanimation;

        if(queuedanimations.length===0){
            selectedanimation="idle";
        }else{
            selectedanimation=queuedanimations.shift();
        }
        

        animate(ctx,images,selectedanimation,aux)
    };



    aux();

    document.getElementById("kick").onclick=()=>{
        queuedanimations.push("kick");
    };

    document.getElementById("punch").onclick=()=>{
        queuedanimations.push("punch");
    };
    document.getElementById("block").onclick=()=>{
        queuedanimations.push("block");
    };
    document.getElementById("forward").onclick=()=>{
        queuedanimations.push("forward");
    };
    document.getElementById("backward").onclick=()=>{
        queuedanimations.push("backward");
    };


    document.addEventListener("keyup", (event)=> {
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

        if(key==="ArrowLeft"){
            queuedanimations.push("kick");

        }else if(key==="ArrowRight")
        queuedanimations.push("punch");
        else if(key==="ArrowUp")
        queuedanimations.push("block");
        else if(key==="ArrowDown")
        queuedanimations.push("forward");
        else if(key==="Z"||key==="z")
        queuedanimations.push("backward");
    });

});


