import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ElasticsearchModule, ElasticsearchService} from "@nestjs/elasticsearch";
import { EsModule } from './es/es.module';

@Module({
  imports: [
    // ElasticsearchModule.register({ node: 'http://localhost:9200',auth:{username:'d',password:''} },),
    ElasticsearchModule.register({ node: 'http://localhost:9200', },),
    EsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
