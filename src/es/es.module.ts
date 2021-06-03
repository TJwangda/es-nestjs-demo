import { Module } from '@nestjs/common';
import { EsService } from './es.service';
import { EsController } from './es.controller';
import {ElasticsearchService} from "_@nestjs_elasticsearch@7.1.0@@nestjs/elasticsearch";
import {ElasticsearchModule} from "@nestjs/elasticsearch";

@Module({
  imports: [ElasticsearchModule.register({
    node: 'http://127.0.0.1:9200',
  })],
  controllers: [EsController],
  providers: [EsService]
})
export class EsModule {}
