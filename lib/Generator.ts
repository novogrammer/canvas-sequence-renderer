import { Preview } from "./Preview";
import { CreateRenderer } from "./RendererBase";

interface GeneratorOptions{
  previewCanvas:HTMLCanvasElement;
  createRenderer:CreateRenderer;
}

export class Generator{
  options:GeneratorOptions;
  preview:Preview;

  constructor(options:GeneratorOptions){
    this.options=options;
    this.preview=new Preview({
      createRenderer:options.createRenderer,
      canvas:options.previewCanvas,
    });

  }

  // async executeAsync(){

  //   const {createRenderer}=this.options;
  //   const renderer=createRenderer();

  // }
}