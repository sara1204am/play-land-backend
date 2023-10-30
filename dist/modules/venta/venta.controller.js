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
exports.VentaController = void 0;
const common_1 = require("@nestjs/common");
const venta_entity_1 = require("./venta.entity");
const base_factory_1 = require("../../core-services/base/base-factory");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../core-services/decoratos/public.decorator");
const venta_service_1 = require("./venta.service");
const BaseController = (0, base_factory_1.abstractControllerFactory)({
    modelEntity: venta_entity_1.Venta,
    modelName: 'Venta',
});
let VentaController = class VentaController extends BaseController {
    constructor(ventaService) {
        super(ventaService);
        this.ventaService = ventaService;
    }
};
exports.VentaController = VentaController;
exports.VentaController = VentaController = __decorate([
    (0, common_1.Controller)('venta'),
    (0, swagger_1.ApiTags)('venta'),
    (0, public_decorator_1.Public)(),
    __metadata("design:paramtypes", [venta_service_1.VentaService])
], VentaController);
//# sourceMappingURL=venta.controller.js.map