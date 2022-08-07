import ScoredHand from "../models/scoredHand";
import Card from "./card";
import { handCombinations } from "./handCombinations";
import { Player } from "./player";

//player wins = 1, draw=0, opponent wins=-1;
export default function compareHands(communityCards:Card[],player:Player,opponent:Player){
    const allCards = [...communityCards,...player.hand,...opponent.hand];
    const playerBestHand = handCombinations(communityCards,player.hand);
    const opponentBestHand = handCombinations(communityCards,opponent.hand);

    console.log("Community Cards",communityCards);
    console.log("player Hand",playerBestHand);
    console.log("opponent Hand",opponentBestHand);

    if(playerBestHand.rank===opponentBestHand.rank){
        if(playerBestHand.value === opponentBestHand.value){
            return 0;
        }
        else if(playerBestHand.value > opponentBestHand.value){
            tintWinningCards(playerBestHand.cards);
            return 1;
        }
        tintWinningCards(opponentBestHand.cards);
        return -1;
    }

    //if rank is different
    if(playerBestHand.rank < opponentBestHand.rank){
        tintWinningCards(playerBestHand.cards);
        return 1;
    }
    else{
        tintWinningCards(opponentBestHand.cards);
        return -1;
    }
}

function tintWinningCards(cards:Card[]){
    cards.forEach((card)=>{
        card.tintCard(0x90EE90);
    })
}