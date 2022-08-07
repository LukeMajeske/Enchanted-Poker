import { Application, Loader,Rectangle,Ticker} from 'pixi.js'
import { PokerGame } from './pokerGame';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});
const gamePositions={
	player:{
		card1:[(app.screen.width/2) - 48,app.screen.height - 48],
		card2:[(app.screen.width/2) + 16,app.screen.height - 48]
	},
	opponent:{
		card1:[(app.screen.width/2) - 48,0],
		card2:[(app.screen.width/2) + 16,0]
	},
	deck:[32,(app.screen.height/2)-24],
	comCards:{
		startPos:[(app.screen.width/2) - 144,(app.screen.height/2)-24],
		gap:64
	}
}

let pokerGame:PokerGame;
let elapsed:number = 0.0;

Loader.shared
.add("cards","card_sprite_sheet.png")
.load((loader,resources)=>{
		const cardsTexture = resources.cards.texture;
		if(cardsTexture != undefined){
			pokerGame = new PokerGame(gamePositions,app.stage,cardsTexture);
		};

		app.ticker.add((delta)=>{
			if((Math.floor(elapsed)%600) === 0){
				pokerGame.handlePhase();
			}
			elapsed += delta;
		})
	}
);




