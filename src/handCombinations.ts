import Card from "./card";
import { scoreHand } from "./scoreHand";
import ScoredHand from "../models/scoredHand";

function compare(a:Card, b:Card) {
    if ( a.cardNumber < b.cardNumber ){
      return -1;
    }
    if ( a.cardNumber > b.cardNumber ){
      return 1;
    }
    return 0;
  }

//Returns best hand for player
export function handCombinations(communityCards:Card[], hand:Card[]){
    let cards:Card[] = [...communityCards,...hand];
    cards = cards.sort(compare);
    const subsetLength = 5;
    const combinationMax = cards.length - subsetLength;
    let startInd=[0,1,2,3,4];
    let combination=[0,0,0,0,0];
    let combinationInd = subsetLength-1;
    let bestHand:ScoredHand = {cards:[],rank:10,value:0};
    
    let allCombinations = [];

    let end = false;

    while(!end){
        let cardCombination:Card[] = [];
        startInd.forEach((startIndex,i)=>{
            cardCombination.push(cards[startIndex+combination[i]]);
        })
        //score this combination, if rank is higher 
        //than current best hand, set this combination to best hand
        const rankEval:ScoredHand = scoreHand(cardCombination);
        if(rankEval.rank<bestHand.rank){
          bestHand=rankEval;
        }
        else if(rankEval.rank===bestHand.rank && rankEval.value > bestHand.value){
          bestHand=rankEval;
        }
        allCombinations.push(cardCombination);

        //If combonation number is at the maxCombo number
        if(combination[combinationInd] === combinationMax){
          if(combinationInd-1 < 0){
            end = true;
            break;
          }
          else if(combination[combinationInd-1]===0){
            for(let i = combinationInd-1; i<=combination.length-1;i++){
              combination[i]=1;
            }
            combinationInd=subsetLength-1;
          }
          else{
            combinationInd--;
            combination[combinationInd]++;
          }
        }
        else{
          combination[combinationInd]++;
        }

    }
    //console.log("best hand",bestHand);
    return bestHand;
}