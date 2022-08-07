import { Container } from "pixi.js";
import Card from "./card";
import { Deck } from "./deck";


export class CommunityCards{
    public phase:number;//0=preflop,1=flop,2=turn-card,3=river
    public cards:Card[];
    private deck:Deck;
    private startPos:number[];
    private gap:number;
    private scene:Container;

    constructor(deck:Deck,startPos:number[],gap:number, scene:Container){
        this.phase=0;
        this.cards=[];
        this.deck=deck;
        this.startPos=startPos;
        this.gap=gap;
        this.scene=scene;
    }


    addCardToCommunity(numToAdd:number){
        for(let i=0; i<numToAdd;i++){
            const card:Card = this.deck.drawTopCard();
            card.sprite.position.set(this.startPos[0]+(this.gap*this.cards.length),this.startPos[1]);
            card.flip();
            this.scene.addChild(card.sprite);
            this.cards.push(card);
        }

    }

    setFlop(){
        this.addCardToCommunity(3);
        this.phase=1;
    }

    setTurnCard(){
        this.addCardToCommunity(1);
        this.phase=2;
    }

    setRiverCard(){
        this.addCardToCommunity(1);
        this.phase=3;
    }

    resetCards(){
        this.cards.forEach(card=>{
            this.scene.removeChild(card.sprite);
        })
        this.cards = [];
        this.phase=0;
    }

    handlePhase(){
        switch(this.phase){
            case(0):
                this.setFlop();
                break;
            case(1):
                this.setTurnCard();
                break;
            case(2):
                this.setRiverCard();
                break;
            case(3):
                this.resetCards();

        }
    }

}
