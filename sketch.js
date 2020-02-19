let qt;
function setup(){
    createCanvas(400,400);
    let  boundary = new Rectangule(200,200,200,200)
    qt = new QuadTree(boundary,4);

    for(let i = 0; i<30 ; i++){
        let x= randomGaussian(width/2,width/8);
        let y= randomGaussian(height/2,height/8);
        let p = new Point(x,y);
        qt.insert(p);
    }
    
}
function draw(){
    background(0);
    qt.show();
    stroke(0,255,0);
    rectMode(CENTER);
    let range = new Rectangule(mouseX,mouseY,25,25);

    // let range = new Rectangule(random(width),random(height),25,25);

    rect(range.x,range.y,range.w*2,range.h*2);

    let points=[];

    qt.query(range,points);

    for(let p of points){
        strokeWeight(4);
        point(p.x,p.y);
    }
}
// function draw(){
//     if(mouseIsPressed){
//         let m = new Point(mouseX,mouseY);
//         qt.insert(m);
//         console.log(vv++);
//     }
//     background(0);
//     qt.show();

//     stroke(0,255,0);
//     rectMode(CENTER);
//     let range = new Rectangule(250,250,107,75);

//     rect(range.x,range.y,range.w*2,range.h*2);

//     let points=[];

//     qt.query(range,points);

//     for(let p of points){
//         strokeWeight(4);
//         point(p.x,p.y);
//     }
    
// }