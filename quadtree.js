class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
class Rectangule{
    constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }
    contains(point){
        return(point.x >= this.x - this.w &&
             point.x <= this.x + this.w &&
             point.y >= this.y - this.h &&
             point.y <= this.y + this.h);
    }
    intersects(range){
        return !(range.x - range.w > this.x + this.w || 
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h
            )
    }
}
class QuadTree{
    constructor(boundary,n){
        this.boundary=boundary;
        this.capacity=n;
        this.points=[]
        this.divided=false;
    }
    subdivide(){
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let ne = new Rectangule(x + w/2, y - h/2, w/2, h/2);
        this.sonNE = new QuadTree(ne,this.capacity);

        let nw = new Rectangule(x - w/2, y - h/2, w/2, h/2);
        this.sonNO = new QuadTree(nw,this.capacity);

        let se = new Rectangule(x + w/2, y + h/2, w/2, h/2);
        this.sonSE = new QuadTree(se,this.capacity);

        let so = new Rectangule(x - w/2, y + h/2, w/2, h/2);
        this.sonSO = new QuadTree(so,this.capacity);

        this.divided = true;
    }
    insert(point){
        if(!this.boundary.contains(point)){
            return;
        }
        if(this.points.length < this.capacity){
            this.points.push(point);
            return true;
        }else{
            if(!this.divided)
                this.subdivide();
            if(this.sonNO.insert(point)){
                return true;
            }else if(this.sonNE.insert(point)){
                return true;
            }else if(this.sonSO.insert(point)){
                return true;
            }else if(this.sonSE.insert(point)){
                return true;
            }            
        }
    }

    query(range,found){
        if(!this.boundary.intersects(range)){
            return;
        }else{
            for(let p of this.points){
                if(range.contains(p)){
                    found.push(p);
                }    
            }
            if(this.divided){
                this.sonNO.query(range,found);
                this.sonNE.query(range,found);
                this.sonSO.query(range,found);
                this.sonSE.query(range,found);
            }
            return found;
        }
    }

    show(){
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x,this.boundary.y, this.boundary.w*2,this.boundary.h*2);
        if(this.divided){
            this.sonNO.show();
            this.sonNE.show();
            this.sonSO.show();
            this.sonSE.show();            
        }
        for(let p of this.points){
            strokeWeight(4);
            point(p.x, p.y);
        }
    }
}