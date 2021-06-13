import $ from "jquery";
import {Game} from "./core/Game"
import { GamePageViewer } from "./core/viewer/GamePageViewer";

const game = new Game(new GamePageViewer());
$("#start").on("click",()=>{
  game.start();
})
$("#pause").on("click",()=>{
  game.pause();
})
$("#moveLeft").on("click",()=>{
  game.controlLeft();
})
$("#moveRight").on("click",()=>{
  game.controlRight();
})
$("#moveDown").on("click",()=>{
  game.controlDown();
})
$("#rotateBtn").on("click",()=>{
  game.rotate();
})
