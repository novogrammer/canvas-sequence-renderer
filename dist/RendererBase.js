"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendererBase = void 0;
class RendererBase {
    constructor(options) {
        this.options = options;
        this.canvas = options.canvas || document.createElement("canvas");
        this.setupPromise = this.setupAsync();
    }
    setupAsync() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    makeDataURLAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setupPromise;
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
        });
    }
}
exports.RendererBase = RendererBase;
//# sourceMappingURL=RendererBase.js.map