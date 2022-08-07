import { Container, Texture } from "pixi.js";
import { CommunityCards } from "./communityCards";
import compareHands from "./compareHands";
import { Deck } from "./deck";
import { Player } from "./player";

interface CardPos{
    card1:number[];
    card2:number[];
}

interface ComCardsPos{
    startPos:number[];
    gap:number;
}

interface GamePositions{
    deck:number[];
    player:CardPos;
    opponent:CardPos;
    comCards:ComCardsPos;
}


enum roundPhase{
    deal = 0,
    flop = 1,
    turn = 2,
    river = 3,
    end = 4
}

export class PokerGame{
    public deck:Deck;
    public player:Player;
    public opponent:Player;
    public phase:number;
    public communityCards:CommunityCards;
    constructor(gamePositions:GamePositions,scene:Container,cardTexture:Texture,phase:number=0){
        this.deck = new Deck(cardTexture,gamePositions.deck,scene);
        this.player=new Player([],this.deck,gamePositions.player.card1,gamePositions.player.card2,scene);
        this.opponent=new Player([],this.deck,gamePositions.opponent.card1,gamePositions.opponent.card2,scene);;
        this.phase=phase;
        this.communityCards=new CommunityCards(this.deck,gamePositions.comCards.startPos,gamePositions.comCards.gap,scene);
    }

    decideWinner(){
        const result = compareHands(this.communityCards.cards,this.player,this.opponent);
        console.log(result);
    }

    resetGame(){
        this.player.emptyHand();
        this.opponent.emptyHand();
        this.communityCards.resetCards();
        this.deck.rebuildDeck();
        this.phase=roundPhase.deal;
    }

    dealCards(){
        this.player.drawHand(true);
        this.opponent.drawHand();
        this.phase = roundPhase.flop;
    }

    setFlop(){
        this.communityCards.setFlop();
        this.phase=roundPhase.turn;
    }

    setTurnCard(){
        this.communityCards.setTurnCard();
        this.phase=roundPhase.river;
    }

    setRiverCard(){
        this.communityCards.setRiverCard();
        this.phase=roundPhase.end;
    }

    handlePhase(){
        switch(this.phase){
            case(roundPhase.deal):
                this.dealCards();
                break;
            case(roundPhase.flop):
                this.setFlop();
                break;
            case(roundPhase.turn):
                this.setTurnCard();
                break;
            case(roundPhase.river):
                this.opponent.showHand();
                this.setRiverCard();
                this.decideWinner();
                break;
            case(roundPhase.end):
                this.resetGame();

        }
    }


}