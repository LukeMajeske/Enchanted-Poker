import { Application, Loader,Rectangle,Ticker} from 'pixi.js'
import { PokerGame } from './pokerGame';
import { GameManager } from './gameManager';
import { LoaderScene } from './loader';


GameManager.initialize(640,480,0x6495ed);

const loader:LoaderScene=new LoaderScene();

GameManager.changeScene(loader);

