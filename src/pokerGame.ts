import { Container, Texture } from "pixi.js";
import { CommunityCards } from "./communityCards";
import compareHands from "./compareHands";
import { Deck } from "./deck";
import { GameManager, IScene } from "./gameManager";
import { Player } from "./player";
import styles from './styles.module.css';

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

export class PokerGame extends Container implements IScene{
    public deck:Deck;
    public player:Player;
    public opponent:Player;
    public phase:number;
    public communityCards:CommunityCards;
    private cardTexture:Texture;
    private elapsed = 0.0;

    private gamePositions={
        player:{
            card1:[(GameManager.width/2) - 48,GameManager.height - 48],
            card2:[(GameManager.width/2) + 16,GameManager.height - 48]
        },
        opponent:{
            card1:[(GameManager.width/2) - 48,0],
            card2:[(GameManager.width/2) + 16,0]
        },
        deck:[32,(GameManager.height/2)-24],
        comCards:{
            startPos:[(GameManager.width/2) - 144,(GameManager.height/2)-24],
            gap:64
        }
    }

    constructor(phase:number=0){
        super();
        this.cardTexture = Texture.from("Card Sprites");
        console.log(this.cardTexture.baseTexture);
        this.deck = new Deck(this.cardTexture,this.gamePositions.deck,this);
        this.player=new Player([],this.deck,this.gamePositions.player.card1,this.gamePositions.player.card2,this);
        this.opponent=new Player([],this.deck,this.gamePositions.opponent.card1,this.gamePositions.opponent.card2,this);
        this.phase=phase;
        this.communityCards=new CommunityCards(this.deck,this.gamePositions.comCards.startPos,this.gamePositions.comCards.gap,this);


        //ADD HTML OVERLAY
        let canvasCont = document.createElement('div');
        let pixiCanvas = document.getElementById('pixi-canvas');
        let pixiContent = document.getElementById('pixi-content');
        let htmlUI = document.createElement('div');
        pixiContent.style.cssText += "position:absolute";
        htmlUI.className = styles.uiOverlay;
        canvasCont.className= styles.canvasCont;
        pixiContent.appendChild(canvasCont);
        canvasCont.appendChild(pixiCanvas);
        canvasCont.appendChild(htmlUI);
        
    }

    public update(framesPassed: number): void {
        this.elapsed+=framesPassed;
        if(Math.floor(this.elapsed)%300===0){
            this.handlePhase();
        }
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