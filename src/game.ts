import * as PIXI from "pixi.js";
import { Enemy } from "./enemy"
import { Player } from "./player";

import backgroundImage from "./images/background_nl.png";
import locationImage from "./images/location.png";
import selectedImage from "./images/selected.png";
import enemyImage from "./images/spacepirate.png"
import deadImage from "./images/bones.png"
import playerImage from "./images/spacecraft.png";

export class Game {

    pixi: PIXI.Application;
    loader: PIXI.Loader;
    background: PIXI.Sprite;
    locations: Location[] = [];
    enemies: Enemy[] = [];
    player: Player;

    constructor() {
        this.pixi = new PIXI.Application({
            width: screen.width,
            height: screen.height
        });
        document.body.appendChild(this.pixi.view);
        
        this.loader = new PIXI.Loader();
        this.loader
            .add("playerTexture", playerImage)
            .add("locationTexture", locationImage)
            .add("selectedTexture", selectedImage)
            .add("enemytexture", enemyImage)
            .add("deadTexture", deadImage)
            .add("backgroundTexture", backgroundImage);
        document.body.appendChild(this.pixi.view)

        this.loader.load(() => this.doneLoading())
    }


    doneLoading() {
        //Background
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!);
        this.pixi.stage.addChild(this.background)

        //enemy
        for (let i = 0; i < 10; i++) {
            console.log("spawned")
            let enemy = new Enemy(this, this.loader.resources["enemytexture"].texture!, this.loader.resources["deadTexture"].texture!)
            this.pixi.stage.addChild(enemy)
            this.enemies.push(enemy)
        }


        //Player
        this.player = new Player(this, this.loader.resources["playerTexture"].texture!);
        this.pixi.stage.addChild(this.player)

        this.pixi.stage.x = this.pixi.screen.width / 2
        this.pixi.stage.y = this.pixi.screen.height / 2

        this.pixi.ticker.add((delta) => this.update(delta))


    }

    update(delta: number) {
        this.player.update(delta);

      for (let enemy of this.enemies) {

        enemy.update(delta)
    }
    }


    }
  