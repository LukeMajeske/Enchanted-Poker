import { Application, Sprite, Loader, Rectangle} from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

Loader.shared
.add("card_sprite_sheet.png")
.load(()=>{
		const texture:any = Loader.shared.resources["card_sprite_sheet.png"].texture;
		const frame:Rectangle = new Rectangle(0,0,32,48);
		texture.frame = frame;
		const card = new Sprite(texture);
		app.stage.addChild(card);
	}
);



