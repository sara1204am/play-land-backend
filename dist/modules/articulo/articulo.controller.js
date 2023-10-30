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
exports.ArticuloController = void 0;
const common_1 = require("@nestjs/common");
const articulo_entity_1 = require("./articulo.entity");
const base_factory_1 = require("../../core-services/base/base-factory");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../core-services/decoratos/public.decorator");
const articulo_service_1 = require("./articulo.service");
const BaseController = (0, base_factory_1.abstractControllerFactory)({
    modelEntity: articulo_entity_1.Articulo,
    modelName: 'Articulo',
});
let ArticuloController = class ArticuloController extends BaseController {
    constructor(articuloService) {
        super(articuloService);
        this.articuloService = articuloService;
    }
};
exports.ArticuloController = ArticuloController;
exports.ArticuloController = ArticuloController = __decorate([
    (0, common_1.Controller)('articulo'),
    (0, swagger_1.ApiTags)('articulo'),
    (0, public_decorator_1.Public)(),
    __metadata("design:paramtypes", [articulo_service_1.ArticuloService])
], ArticuloController);
//# sourceMappingURL=articulo.controller.js.map