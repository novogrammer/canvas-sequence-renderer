import { CreateRenderer, RendererBase } from "./RendererBase";

export interface PreviewOptions{
  createRenderer: CreateRenderer;
  canvas:HTMLCanvasElement;
}

export class Preview{
  options:PreviewOptions;
  intervalId:number;
  createRenderer:CreateRenderer;
  renderer?:RendererBase;
  constructor(options:PreviewOptions){
    if(!options){
      throw new Error("options is null");
    }
    if(!options.createRenderer){
      throw new Error("options.createRenderer is null");
    }
    if(!options.canvas){
      throw new Error("options.canvas is null");
    }

    this.options=options;
    this.intervalId=0;
    this.createRenderer=this.options.createRenderer;
    this.reset();
  }

  setCreateRenderer(createRenderer: CreateRenderer){
    if(!createRenderer){
      throw new Error("createRenderer is null");
    }
    this.createRenderer=createRenderer;
    this.reset();
  }
  reset(){
    if(this.intervalId){
      clearInterval(this.intervalId);
      this.intervalId=0;
    }
    const renderer=this.createRenderer(this.options.canvas);
    this.renderer=renderer;

    if(!renderer.options.isAnimation){
      renderer.render();
      return;
    }
    const {fps}=renderer.options;
    renderer.render();
    this.intervalId=setInterval(()=>{
      renderer.stepTime(true);
      renderer.render();
    },1/fps*1000);
  
  }
}

