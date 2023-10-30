"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagenesController = void 0;
const common_1 = require("@nestjs/common");
const base_factory_1 = require("../../core-services/base/base-factory");
const imagenes_entity_1 = require("./imagenes.entity");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../core-services/decoratos/public.decorator");
const imagenes_service_1 = require("./imagenes.service");
const BaseController = (0, base_factory_1.abstractControllerFactory)({
    modelEntity: imagenes_entity_1.Imagenes,
    modelName: 'Imagenes',
});
let ImagenesController = class ImagenesController extends BaseController {
    constructor(imagenesService) {
        super(imagenesService);
        this.imagenesService = imagenesService;
    }
};
exports.ImagenesController = ImagenesController;
exports.ImagenesController = ImagenesController = __decorate([
    (0, common_1.Controller)('imagenes'),
    (0, swagger_1.ApiTags)('imagenes'),
    (0, public_decorator_1.Public)(),
    __metadata("design:paramtypes", [imagenes_service_1.ImagenesService])
], ImagenesController);
//# sourceMappingURL=imagenes.controller.js.map