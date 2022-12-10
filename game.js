var cvs = document.getElementById("mycanvas");
var ctx = cvs.getContext("2d");

var frames = 0;
var sprite = new Image();
sprite.src = "img/sprite.png";

function update(){
    
}

function animate(){
    requestAnimationFrame(animate)
}
animate();