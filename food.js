class Food{
    constructor(){
        this.image = loadImage("Milk.png");
        
    }

    display(){
        var x=80,y=50;
        if(gameState===1){image(this.image,150,290,70,70);}
        if(foodStock!=0){
            for(var i=0; i<foodStock; i++){
                if(i%10===0){
                    y=y+80
                    x=80;
                }
                image(this.image,x,y,70,70);
                x=x+30;
            }
        }
    }
    
    
    getFoodStock(){
        var dbref = database.ref('foodStock')
  
        dbref.on("value",function(data){
            var db = data.val();
            //console.log(db);
            foodStock = db;
            
        })
    }
    updateFoodStock(x){
        database.ref('/').update({
            'foodStock':x
        })
    }
   
    bedroom(){
        background(bg1, 550,500);
    }
    garden(){
        background(bg2, 550,500);
    }
    washroom(){
        background(bg3, 550,500);
    }
}