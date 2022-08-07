import { scoreHand,hasStraight, hasFlush} from "../src/scoreHand";
import Card from "../src/card"


const straightFlush=[
    new Card(1,0,true,null),
    new Card(2,0,true,null),
    new Card(3,0,true,null),
    new Card(4,0,true,null),
    new Card(5,0,true,null),
]

const fourPair=[
    new Card(1,0,true,null),
    new Card(1,1,true,null),
    new Card(1,2,true,null),
    new Card(1,3,true,null),
    new Card(2,0,true,null),
]
const fullHouse=[
    new Card(1,0,true,null),
    new Card(1,1,true,null),
    new Card(1,2,true,null),
    new Card(2,3,true,null),
    new Card(2,0,true,null),
]

const flush=[
    new Card(1,0,true,null),
    new Card(2,0,true,null),
    new Card(3,0,true,null),
    new Card(6,0,true,null),
    new Card(7,0,true,null),
]

const straight=[
    new Card(1,0,true,null),
    new Card(2,0,true,null),
    new Card(3,0,true,null),
    new Card(4,0,true,null),
    new Card(5,1,true,null),
]

const threePair=[
    new Card(1,0,true,null),
    new Card(1,1,true,null),
    new Card(1,2,true,null),
    new Card(3,3,true,null),
    new Card(4,0,true,null),
]

const twoPair=[
    new Card(1,0,true,null),
    new Card(1,1,true,null),
    new Card(2,2,true,null),
    new Card(2,3,true,null),
    new Card(4,0,true,null),
]

const onePair=[
    new Card(1,0,true,null),
    new Card(1,1,true,null),
    new Card(2,2,true,null),
    new Card(3,3,true,null),
    new Card(4,0,true,null),
]

const highCard=[
    new Card(1,0,true,null),
    new Card(2,1,true,null),
    new Card(4,2,true,null),
    new Card(6,3,true,null),
    new Card(7,0,true,null),
]


describe("scoreHand test",()=>{
    test("finds straight flush",()=>{
        expect(scoreHand(straightFlush).rank).toEqual(1);
    }),
    test("finds 4 pair",()=>{
        expect(scoreHand(fourPair).rank).toEqual(2);
    }),
    test("finds fullHouse",()=>{
        expect(scoreHand(fullHouse).rank).toEqual(3);
    }),
    test("finds flush",()=>{
        expect(scoreHand(flush).rank).toEqual(4);
    }),
    test("finds straight",()=>{
        expect(scoreHand(straight).rank).toEqual(5);
    }),
    test("finds 3 pair",()=>{
        expect(scoreHand(threePair).rank).toEqual(6);
    }),
    test("finds 2 pair",()=>{
        expect(scoreHand(twoPair).rank).toEqual(7);
    }),
    test("finds 1 pair",()=>{
        expect(scoreHand(onePair).rank).toEqual(8);
    }),
    test("finds high card",()=>{
        expect(scoreHand(highCard).rank).toEqual(9);
    })
})

describe("hasStraight function tests",()=>{
    test("Does find straight",()=>{
        expect(hasStraight([2,3,4,5,6])).toBe(true);
    }),
    test("Does find low ace straight",()=>{
        expect(hasStraight([1,2,3,4,5])).toBe(true);
    }),
    test("Does find high ace straight",()=>{
        expect(hasStraight([1,10,11,12,13])).toBe(true);
    }),
    test("No stright found",()=>{
        expect(hasStraight([2,4,6,7,8])).toBe(false);
    })
})

describe("hasFlush function tests",()=>{
    test("Does find flush, pos1",()=>{
        expect(hasFlush([0,0,0,0,0])).toBe(true);
    }),
    test("No flush found",()=>{
        expect(hasFlush([0,1,2,2,3])).toBe(false);
    })
})