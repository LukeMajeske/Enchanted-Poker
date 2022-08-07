import { Container, Rectangle, Sprite, Texture } from "pixi.js";
import Card from "./card"

const cardW = 32;
const cardH = 48;

export class Deck{
    private cards:Card[];
    private deckPos:number[];
    private cardsTexture:Texture;
    private scene:Container;
    public deckStack:Sprite[];

    constructor(cardsTexture:Texture,deckPos:number[],scene:Container){
        this.deckPos=deckPos;
        this.deckStack = [];
        this.scene = scene;
        this.cardsTexture=cardsTexture;
        this.cards=[];

        //Initialize Deck
        this.buildDeck();
        this.shuffleDeck();


        //deck sprite
        const frame = new Rectangle(0,0,cardW,cardH);
        const texture = new Texture(this.cardsTexture.baseTexture,frame);

        //deck stack
        for(let i = 0;i<5;i++){
            const sprite = new Sprite(texture);
            sprite.position.set(deckPos[0],deckPos[1]-(2*i));
            this.scene.addChild(sprite);
            this.deckStack.push(sprite);
        }
        
    }

    buildDeck(){
        for(let i=1;i<14;i++){
            for(let j=0;j<4;j++){
                this.cards.push(new Card(i,j,false,this.cardsTexture));
            }
        }
    }

    destroyDeck(){
        this.cards.forEach(card=>{
            card = null;
        })
        this.cards=[];
    }

    rebuildDeck(){
        this.destroyDeck();
        this.buildDeck();
        this.shuffleDeck();
    }

    findCard(cardNumber:number, cardSuit:number){
        let index:number|null = null;
        this.cards.forEach((card,i) => {
            const {number,suit} = card.getCard(); 
            if(cardNumber===number && cardSuit===suit){
                index = i;
            }
        });
        return index;
    }

    removeCard(cardNumber:number,cardSuit:number){
        const cardIndex = this.findCard(cardNumber,cardSuit);
        if(cardIndex != null){
            this.cards.splice(cardIndex,1);
        }
        
    }

    removeCardByIndex(index:number){
        this.cards.splice(index,1);
    }

    addCard(index:number,card:Card){
        this.cards.splice(index,0,card);
    }

    shuffleDeck(shuffles:number = 1){
        while(shuffles > 0){
            for(let i = this.cards.length - 1; i>0;i--){
                const j = Math.floor(Math.random()*(i+1));
                [this.cards[i],this.cards[j]] = [this.cards[j], this.cards[i]];
            }
            shuffles--;
        }
        //console.log(this.cards);
    }

    drawTopCard(faceUp:boolean=false){
        const card:Card = this.cards[0];
        this.removeCardByIndex(0);
        if(faceUp===true){
            card.flip();
        }
        return card;
    }

    drawCard(cardNumber:number, cardSuit:number){
        const cardIndex = this.findCard(cardNumber,cardSuit);
        if(cardIndex!=null){
            const card = this.cards.splice(cardIndex,1);
            return card[0];
        }
        return null;
    }
}