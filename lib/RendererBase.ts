
type OutputType="png";

interface RendererBaseOptionsBase{
  canvas:HTMLCanvasElement;
  outputType:OutputType
}

export interface RendererBaseOptionsAnimation extends RendererBaseOptionsBase{
  isAnimation:true;
  fps:number;
  duration:number;
}
export interface RendererBaseOptionsNoAnimation extends RendererBaseOptionsBase{
  isAnimation:false;
}


export type RendererBaseOptions=RendererBaseOptionsAnimation|RendererBaseOptionsNoAnimation;


export abstract class RendererBase{
  options:RendererBaseOptions;
  canvas:HTMLCanvasElement;
  time:number;
  constructor(options:RendererBaseOptions){
    if(!options){
      throw new Error("options is null");
    }
    if(!options.canvas){
      throw new Error("options.canvas is null");
    }
    if(!options.outputType){
      throw new Error("options.outputType is null");
    }
    if(options.isAnimation){
      if(!options.fps){
        throw new Error("options.fps is null");
      }
      if(!options.duration){
        throw new Error("options.duration is null");
      }
    }else{
      // DO NOTHING
    }
    if(!this.render){
      throw new Error("this.render is null");
    }

    this.options=options;
    this.canvas = options.canvas;
    this.time=0;
  }

  stepTime(isLoop:boolean):boolean{
    if(!this.options.isAnimation){
      return false;
    }
    const {fps}=this.options;
    this.time += 1/fps;
    const epsilon=0.001;
    const isLastFrame=this.options.duration<=this.time+epsilon;
    if(!isLastFrame){
      return true;
    }
    if(isLoop){
      this.time-=this.options.duration;
      return true;
    }
    return false;
}

  abstract render(): void;

  makeDataURL(): string {

    const { options } = this;

    let type = (()=>{
      switch (options.outputType) {
        case "png":
          return "image/png";
        default:
          throw new Error(`unknown outputType: ${options.outputType}`);
      }
    })();

    const { canvas } = this;
    return canvas.toDataURL(type);
  }

}

export type CreateRenderer=(canvas:HTMLCanvasElement)=>RendererBase;

