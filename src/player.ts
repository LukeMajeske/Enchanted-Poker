import { Container } from "pixi.js";
import Card from "./card";
import	{Deck} from './deck';

export class Player{
    public hand:Card[];
    private deck:Deck;
    private card1Pos:number[];
    private card2Pos:number[];
    public scene:Container;

    constructor(hand:Card[]=[],deck:Deck,card1Pos:number[],card2Pos:number[],scene:Container){
        this.hand = hand;
        this.deck = deck;
        this.card1Pos = card1Pos;
        this.card2Pos = card2Pos;
        this.scene = scene;
    }

    drawHand(faceUp:boolean=false){
        [this.hand[0],this.hand[1]] = [this.deck.drawTopCard(faceUp),this.deck.drawTopCard(faceUp)];
        const card1=this.hand[0].sprite;
        const card2=this.hand[1].sprite;
        card1.position.set(this.card1Pos[0],this.card1Pos[1]);
        card2.position.set(this.card2Pos[0],this.card2Pos[1]);
        this.scene.addChild(card1);
        this.scene.addChild(card2);
    }

    getHand(){
        const hand:Card[] = this.hand;
        return hand;
    }

    showHand(){
        this.hand.forEach(card=>{
            card.flip();
        })
    }

    emptyHand(){
        //empty hand or return cards to deck.
        this.hand.forEach(card=>{
            this.scene.removeChild(card.sprite);
        })
        this.hand = [];
    }

}