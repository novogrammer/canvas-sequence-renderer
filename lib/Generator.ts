import { Preview } from "./Preview";
import { CreateRenderer } from "./RendererBase";
import JSZip from "jszip";
interface GeneratorOptions{
  createRenderer:CreateRenderer;
  previewCanvas?:HTMLCanvasElement;
}

export class Generator{
  options:GeneratorOptions;
  createRenderer:CreateRenderer;

  preview?:Preview;

  constructor(options:GeneratorOptions){
    if(!options){
      throw new Error("options is null");
    }
    if(!options.createRenderer){
      throw new Error("options.createRenderer is null");
    }
    this.options=options;
    this.createRenderer=options.createRenderer;
    if(options.previewCanvas){
      this.preview=new Preview({
        createRenderer:options.createRenderer,
        canvas:options.previewCanvas,
      });
    }

  }
  setCreateRenderer(createRenderer:CreateRenderer){
    if(!createRenderer){
      throw new Error("createRenderer is null");
    }
    this.createRenderer=createRenderer;
    if(this.preview){
      this.preview.setCreateRenderer(createRenderer);
    }
  }
  downloadDataURL(dataURL:string,filename:string){
    const a=document.createElement("a");
    a.href=dataURL;
    a.download=filename;
    a.click();
  }
  execute(basename:string){
    const {createRenderer}=this.options;
    const canvasElement=document.createElement("canvas");
    const renderer=createRenderer(canvasElement);
    const ext="."+renderer.options.outputType;
    if(!renderer.options.isAnimation){
      renderer.render();
      const imageDataURL=renderer.makeDataURL();
      this.downloadDataURL(imageDataURL,basename+ext);
    }else{
      const zip=new JSZip();
      const folder=zip.folder(basename);
      if(!folder){
        throw new Error("folder is null");
      }
      const {fps,duration}=renderer.options;
      const frameCount=Math.max(duration*fps,1);
      const len=frameCount.toString().length;
      const zeroPadding=(n:number)=>{
        return ("0".repeat(len) + n).slice(len * -1);
      };
      let i=0;
      do{
        renderer.render();
        const imageDataURL=renderer.makeDataURL();
        const imageBase64=imageDataURL.replace(/^.+base64,/,"");
        folder.file(basename+zeroPadding(i)+ext,imageBase64,{base64:true});
        i+=1;
      }while(renderer.stepTime(false));
      zip.generateAsync({type:"base64"}).then((base64)=>{
        const zipDataURL="data:application/zip;base64," + base64;
        this.downloadDataURL(zipDataURL,basename+".zip");

      }).catch((error)=>{
        console.error(error);
      });

    }

  }
}