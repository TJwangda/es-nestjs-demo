import {Injectable} from '@nestjs/common';
import {CreateDaglDtDto} from './dto/create-dagl-dt.dto';
import {UpdateDaglDtDto} from './dto/update-dagl-dt.dto';
import {YangbenSearch} from "./entities/dagl-dt.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {EsService} from "../es/es.service";

@Injectable()
export class DaglDtService {

    constructor(
        @InjectRepository(YangbenSearch)
        private readonly yangbenRepo: Repository<YangbenSearch>,
        private readonly esService: EsService
    ) {
    }

    async create(createDaglDtDto: CreateDaglDtDto) {
        await this.yangbenRepo.create(createDaglDtDto);
        // return 'This action adds a new daglDt';
    }

    async findAll() {
        const ybList = await this.yangbenRepo.find();
        return ybList;
    }

    /**
     * 全量同步yangben_search表数据到es
     */
    async allSynch() {
        const ybList = await this.findAll();
        await this.esService.addBulkYB_dt(ybList);
    }

    async findOneEs(id: number) {
        // const ret = await this.esService.findOneEs(id);
        // return ret;
    }

    async findManyEs(dto: YangbenSearch) {
        const ret = await this.esService.findManyEsDagl(dto);
        return ret;
    }

    findOne(id: number) {
        return `This action returns a #${id} daglDt`;
    }

    update(id: number, updateDaglDtDto: UpdateDaglDtDto) {
        return `This action updates a #${id} daglDt`;
    }

    remove(id: number) {
        return `This action removes a #${id} daglDt`;
    }
}
