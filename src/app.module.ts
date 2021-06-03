import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ElasticsearchModule, ElasticsearchService} from "@nestjs/elasticsearch";
import { EsModule } from './es/es.module';
import { DaglDtModule } from './dagl-dt/dagl-dt.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {config} from "./config";
import {YangbenSearch} from "./dagl-dt/entities/dagl-dt.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: config.dataSource.host,
          port: config.dataSource.port,
          username: config.dataSource.username,
          password: config.dataSource.password,
          database: config.dataSource.database,
          entities: [YangbenSearch
          ],
          synchronize: config.synchronize,
      }),
    // ElasticsearchModule.register({ node: 'http://localhost:9200',auth:{username:'d',password:''} },),
    ElasticsearchModule.register({ node: 'http://localhost:9200', },),
    EsModule,
    DaglDtModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
