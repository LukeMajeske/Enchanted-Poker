import Card from "../src/card"

export default interface ScoredHand{
    cards:Card[],
    rank:number,
    value:number
  }