import Card from "../src/card";
import ScoredHand from "../models/scoredHand"
import { handCombinations } from "../src/handCombinations";

const communityCards:Card[]=[
    new Card(2,0,true,null),
    new Card(2,1,true,null),
    new Card(3,0,true,null),
    new Card(4,0,true,null),
    new Card(5,0,true,null),
]

const hand:Card[]=[
    new Card(2,2,true,null),
    new Card(8,2,true,null)
]

const bestHand:ScoredHand={
    cards:[
        new Card(2,0,true,null),
        new Card(2,1,true,null),
        new Card(2,2,true,null),
        new Card(5,0,true,null),
        new Card(8,2,true,null)
    ],
    rank:6,
    value:22258
}

describe("Hand Combinations",()=>{
        test("Finds best hand",()=>{
            expect(handCombinations(communityCards,hand)).toEqual(bestHand);
        })
    }
)