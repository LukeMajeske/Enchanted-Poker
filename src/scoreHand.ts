import Card from "./card";
import ScoredHand from "../models/scoredHand";

//Input cards are already sorted by number

//Return the rank of the hand
export function scoreHand(hand:Card[]){
    const cardNumbers:number[] = hand.map((card)=>{return card.cardNumber});
    const cardSuits:number[] = hand.map((card)=>{return card.cardSuit}).sort((a,b)=>{return a-b});
    const straight = hasStraight(cardNumbers);
    const flush = hasFlush(cardSuits);
    const pairs = getPairs(cardNumbers);

    //order hand by pair counts
    function byCountFirst(a:number, b:number) {
        //Counts are in reverse order - bigger is better
        const pairDiff = pairs[b] - pairs[a]
        if (pairDiff) return pairDiff // If counts don't match return
        return b > a ? -1 : b === a ? 0 : 1
    }


    const rank =
    (flush && straight && 1) ||
    (pairs[4] && 2) ||
    (pairs[3] && pairs[2] && 3) ||
    (flush && 4) ||
    (straight && 5) ||
    (pairs[3] && 6) ||
    (pairs[2] > 1 && 7) ||
    (pairs[2] && 8) ||
    9
    const scoredHand:ScoredHand={cards:hand,rank:rank,value:Number(cardNumbers.sort(byCountFirst).join(""))};
    return scoredHand;
}

export function hasStraight(cardNumbers:number[]){
        let cardNum = [...cardNumbers];//Copy card numbers, don't change the input array in memeory.
        if(cardNum.every((cardNumber,index)=>{return cardNumber-cardNum[0] === index})){
            return true;
        };
        //if firstCard is an Ace,check again for ace high straight
        if(cardNum[0]===1){
            cardNum=[...cardNum.splice(1),14];
            if(cardNum.every((cardNumber,index)=>{return cardNumber-cardNum[0] === index})){
                return true;
            };
        }
    return false;
}

export function hasFlush(cardSuits:number[]){
        if(cardSuits[0]===cardSuits[4]){
            return true;
        };
    return false;
}

export function getPairs(cardNumbers:number[]){
    const countPairs = (pairCounts:{[key:number]:any},number:number)=>{
        //convert ace's value to 14
        number = number===1?14:number;
        if(isNaN(pairCounts[number])){
            pairCounts[number] = 1;
        }
        else{
            pairCounts[number]++;
        }
        return pairCounts;
    }

    const getPairs = cardNumbers.reduce(countPairs,{});
    return Object.values(getPairs).reduce(countPairs,{});

} 