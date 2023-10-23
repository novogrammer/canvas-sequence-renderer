import * as PIXI from "pixi.js";
import RendererSimple from './RendererSimple'
import './style.css'
import kawamotoImage from "./kawamoto.jpg";
import { Generator } from "../lib/Generator";


async function mainAsync(){

  const previewCanvas= document.querySelector<HTMLCanvasElement>("#previewCanvas");
  if(!previewCanvas){
    throw new Error("previewCanvas is null");
  }


  const kawamotoTexture = await PIXI.Assets.load<PIXI.Texture>(kawamotoImage);
  const resources={
    kawamotoTexture,
  };

  
  const createRendererSimple=(canvas:HTMLCanvasElement)=>{
    return new RendererSimple({
      isAnimation:true,
      fps:60,
      duration:2,
      outputType:"png",
      canvas,
    },resources);
  }
  const generator=new Generator({
    previewCanvas,
    createRenderer:createRendererSimple,
  });
  console.log(generator);
}

mainAsync().catch((error)=>{
  console.error(error);
})
