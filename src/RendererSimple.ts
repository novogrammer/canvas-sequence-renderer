import * as PIXI from "pixi.js";
import { RendererBase,RendererBaseOptions } from "../lib";

// RendererSimple;

interface RendererSimpleResources {
  kawamotoTexture:PIXI.Texture;
}
interface PixiObjects{
  renderer:PIXI.Renderer;
  stage:PIXI.Container;
  sprite:PIXI.Sprite;
}

export default class RendererSimple extends RendererBase{
  pixiObjects:PixiObjects;
  resources:RendererSimpleResources;
  constructor(options:RendererBaseOptions,resources:RendererSimpleResources){
    super(options);
    this.resources=resources;
    const renderer=new PIXI.Renderer({
      view:this.canvas,
      preserveDrawingBuffer:true,
      backgroundColor:0xff00ff,
    });
    const stage=new PIXI.Container();

    const sprite=new PIXI.Sprite(this.resources.kawamotoTexture);
    sprite.position.set(10,10);
    stage.addChild(sprite);

    renderer.resize(sprite.width+10*2,sprite.height+10*2);

    this.pixiObjects={
      renderer,
      stage,
      sprite,
    }
  }
  override render(){
    const {renderer,stage,sprite}=this.pixiObjects;
    sprite.position.y=Math.sin(this.time * 180 * PIXI.DEG_TO_RAD)*10+10;

    renderer.render(stage);
  }
  
}