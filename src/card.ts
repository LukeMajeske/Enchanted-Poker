import {Sprite,Rectangle, Texture} from 'pixi.js'

const cardW = 32;
const cardH = 48;
export default class Card{
    public cardNumber:number;//1=ace --> 13=king
    public cardSuit:number;//0-3 0=spades, 1=diamonds 2=clubs 3=hearts
    private faceUp:boolean;
    private texture:Texture;
    public sprite:Sprite;

    constructor(cardNumber:number, cardSuit:number,faceUp:boolean=true,texture:Texture|null){
        this.cardNumber=cardNumber;
        this.cardSuit =cardSuit;
        this.faceUp = faceUp;
        if(texture!=null){
            this.texture = new Texture(texture.baseTexture);
            const frame = this.faceUp ? new Rectangle(this.cardSuit*cardW,this.cardNumber*cardH,cardW,cardH)
            :new Rectangle(0,0,cardW,cardH);
            if(this.texture != undefined){
                this.texture.frame = frame;
                this.sprite = new Sprite(this.texture);
            }
            else{
                this.sprite = new Sprite();
            }
        }

    }

    setSprite(){
		const frame = this.faceUp ? new Rectangle(this.cardSuit*cardW,this.cardNumber*cardH,cardW,cardH)
        :new Rectangle(0,0,cardW,cardH);
        if(this.texture != undefined){
            this.texture.frame = frame;
            this.sprite.texture = this.texture;
        }
    }

    flip(){
        //flip card and rerender as new card.
        this.faceUp = !this.faceUp;
        this.setSprite();
    }

    setCard(newNumber:number=this.cardNumber, newSuit:number = this.cardSuit){
        //pass new properties to card and rerender as new card.
        this.cardNumber = newNumber;
        this.cardSuit = newSuit;
        this.setSprite();
    }

    getCard(){
        return {number:this.cardNumber,suit:this.cardSuit};
    }

    getSprite(){
        return this.sprite;
    }

    //Input hexidecimal
    tintCard(color:number=0xa9a9a9){
        this.sprite.tint=color;
    }
}