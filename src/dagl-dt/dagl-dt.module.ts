import { Module } from '@nestjs/common';
import { DaglDtService } from './dagl-dt.service';
import { DaglDtController } from './dagl-dt.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {YangbenSearch} from "./entities/dagl-dt.entity";
import {EsService} from "../es/es.service";
import {ElasticsearchModule, ElasticsearchService} from "_@nestjs_elasticsearch@7.1.0@@nestjs/elasticsearch";

@Module({
    imports: [
        ElasticsearchModule.register({ node: 'http://127.0.0.1:9200', }),
        TypeOrmModule.forFeature([YangbenSearch])
    ],
  controllers: [DaglDtController],
  providers: [DaglDtService,EsService]
})
export class DaglDtModule {}
