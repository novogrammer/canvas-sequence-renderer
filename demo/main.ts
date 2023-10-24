import * as PIXI from "pixi.js";
import RendererSimple from './RendererSimple'
import './style.css'
import kawamotoImage from "./kawamoto.jpg";
import { Generator } from "../lib/Generator";


async function mainAsync(){

  const previewCanvasElement = document.querySelector<HTMLCanvasElement>("#previewCanvas");
  if(!previewCanvasElement){
    throw new Error("previewCanvasElement is null");
  }
  const generateElement = document.querySelector("#generate");
  if(!generateElement){
    throw new Error("generateElement is null");
  }



  const kawamotoTexture = await PIXI.Assets.load<PIXI.Texture>(kawamotoImage);
  const resources={
    kawamotoTexture,
  };
  
  let fps=60;
  
  const createRendererSimple=(canvas:HTMLCanvasElement)=>{
    return new RendererSimple({
      // isAnimation:false,
      isAnimation:true,
      fps,
      duration:2,
      outputType:"png",
      canvas,
    },resources);
  }
  const generator=new Generator({
    previewCanvas: previewCanvasElement,
    createRenderer:createRendererSimple,
  });

  // setInterval(()=>{
  //   if(Math.random()<0.5){
  //     fps=60;
  //   }else{
  //     fps=2;
  //   }
  //   generator.setCreateRenderer(createRendererSimple);
  // },2000);


  generateElement.addEventListener("click",()=>{
    generator.execute("download");
  })
}

mainAsync().catch((error)=>{
  console.error(error);
})
