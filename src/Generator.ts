import { CreateRenderer } from "./RendererBase";

interface GeneratorOptions{
  createRenderer:CreateRenderer;
}

export class Generator{
  options:GeneratorOptions;

  constructor(options:GeneratorOptions){
    this.options=options;

  }

  // async executeAsync(){

  //   const {createRenderer}=this.options;
  //   const renderer=createRenderer();

  // }
}