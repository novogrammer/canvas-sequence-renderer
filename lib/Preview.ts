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
    this.options=options;
    this.intervalId=0;
    this.createRenderer=this.options.createRenderer;
    this.reset();
  }

  setCreateRenderer(createRenderer: CreateRenderer){
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

    if(renderer.options.isAnimation){
      const {fps}=renderer.options;
      renderer.render();
      this.intervalId=setInterval(()=>{
        renderer.stepTime(true);
        renderer.render();
      },1/fps*1000);

    }else{
      renderer.render();
    }
    
  }
}

