import { CreateRenderer, RendererBase } from "./RendererBase";

export interface PreviewOptions{
  createRenderer: CreateRenderer;
  canvas:HTMLCanvasElement;
}

export class Preview{
  options:PreviewOptions;
  intervalId:number;
  currentCreateRenderer?:CreateRenderer;
  currentRenderer?:RendererBase;
  constructor(options:PreviewOptions){
    this.options=options;
    this.intervalId=0;
    this.reset(this.options.createRenderer);
  }
  reset(createRenderer: CreateRenderer){
    if(this.intervalId){
      clearInterval(this.intervalId);
      this.intervalId=0;
    }
    this.currentCreateRenderer=createRenderer;
    const renderer=createRenderer(this.options.canvas);
    this.currentRenderer=renderer;

    if(this.currentRenderer.options.isAnimation){
      const {fps}=this.currentRenderer.options;
      this.intervalId=setInterval(()=>{
        renderer.render();
        renderer.stepTime(true);

      },1/fps*1000);

    }else{
      renderer.render();
    }
    
  }
}

