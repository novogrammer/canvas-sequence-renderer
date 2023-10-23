var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class RendererBase {
  constructor(options) {
    __publicField(this, "canvas");
    __publicField(this, "options");
    __publicField(this, "setupPromise");
    this.options = options;
    this.canvas = options.canvas || document.createElement("canvas");
    this.setupPromise = this.setupAsync();
  }
  async setupAsync() {
  }
  async makeDataURLAsync() {
    await this.setupPromise;
    const { options } = this;
    let type = "";
    switch (options.outputType) {
      case "png":
        type = "image/png";
        break;
      default:
        throw new Error(`unknown type options: ${options}`);
    }
    const { canvas } = this;
    return canvas.toDataURL(type);
  }
}
export {
  RendererBase
};
//# sourceMappingURL=RendererBase.js.map
