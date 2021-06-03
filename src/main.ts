import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {config} from "./config";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import * as express from 'express';
import {ExpressAdapter} from "@nestjs/platform-express";
import {logger} from "./middleware/logger.middleware";
import {TransformInterceptor} from "./interceptor/transform.interceptor";
import {AllExceptionsFilter} from "./filter/any-exception.filter";
import {HttpExceptionFilter} from "./filter/http-exception.filter";
import {UpdatenumInterceptor} from "./interceptor/updatenum.interceptor";

import * as bodyParser from 'body-parser';
import {TrackInterceptor} from "./interceptor/track.interceptor";
import * as cookieParser from 'cookie-parser'

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
async function bootstrap() {
  let app = null;
  let httpsOptions = null;
  let server = null;
  if (config.httpsFlg) {
    httpsOptions = {
      key: fs.readFileSync(config.httpsOptions.keyPath),
      cert: fs.readFileSync(config.httpsOptions.certPath),
    };
    server = express();
    app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  } else {
    app = await NestFactory.create(AppModule);
  }
  //实体过大问题,默认值太小
  app.use(bodyParser.json({limit: '3500mb'}));
  app.use(bodyParser.urlencoded({limit: '3500mb', extended: true}));

  app.enableCors();
//------------------日志s--------
  // 监听所有的请求路由，并打印日志
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({extended: true})); // For parsing application/x-www-form-urlencoded
  app.use(logger);
// 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());

  //AllExceptionsFilter 要在 HttpExceptionFilter 的上面，否则 HttpExceptionFilter 就不生效了，全被 AllExceptionsFilter 捕获了。
  app.useGlobalFilters(new AllExceptionsFilter());
// 过滤处理 HTTP 异常
  app.useGlobalFilters(new HttpExceptionFilter());
//------------------日志e--------
  //05.07 缺少X-Frame-Options header
  const helmet = require('helmet');
  app.use(helmet.frameguard({ action: "sameorigin" }));


  const options = new DocumentBuilder()
      .setTitle(config.productName)
      .addBearerAuth() // 开启 BearerAuth 授权认证
      .setDescription('')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  if (config.httpsFlg) {
    await app.init();
    http.createServer(server).listen(config.port);
    https.createServer(httpsOptions, server).listen(config.httpsOptions.httpsPort);
  } else {
    const h = await app.listen(config.port);
    h.setTimeout(30000);//600,000毫秒=> 10Min, 1200,000=>20Min, 1800,000=>30Min
  }

}

bootstrap();
