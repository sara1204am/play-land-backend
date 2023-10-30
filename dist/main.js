"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prefixOptions = {
    exclude: ['/'],
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.enableCors({
        origin: '*',
        methods: '*',
        allowedHeaders: '*',
        credentials: false,
    });
    app.setGlobalPrefix(process.env.API_ROOT || 'api', prefixOptions);
    ;
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map