import { Injectable } from '@nestjs/common';
import { CreateEDto } from './dto/create-e.dto';
import { UpdateEDto } from './dto/update-e.dto';
import {ElasticsearchService} from "@nestjs/elasticsearch";
import {YangbenDtoEs} from "./dto/yangben-es.dto";
import {YangbenSearch} from "../dagl-dt/entities/dagl-dt.entity";

@Injectable()
export class EsService {

  constructor(
      private readonly elasticsearchService: ElasticsearchService
  ) {}

    //--------添加dagl-dt------------------------------------------------------------
    async addBulkYB_dt(dtos) {
        const params = [];
        for(let i = 0 ; i<dtos.length; i++){
            const dto = dtos[i];
            // if(i == 1){
                const paramIndex = { index: {_index: 'dagl_dt', _type: '_doc', _id: dto.id}};
                params.push(paramIndex);
                const paramDate = {classifyId1:dto.classifyId1,classifyName1:dto.classifyName1,classifyId2:dto.classifyId2,
                    classifyName2:dto.classifyName2,name:dto.name,objectId:dto.objectId,chuzhiId:dto.chuzhiId,objectName:dto.objectName,
                    chuzhiName:dto.chuzhiName,yangbenContent:dto.yangbenContent,seqNo:dto.seqNo,chuzhiCnt:dto.chuzhiCnt};
                params.push(paramDate)
            // }
        }

        return this.elasticsearchService.bulk({
            body:params
        });
    }

    /**
     * 多条件查询
     * @param dto
     */
    async findManyEsDagl(dto:YangbenSearch){
        const pageSize = 10;
        const pageNumber = 1
        const mustParams = [];//must查询条件

        if(null != dto.classifyId1){ const param = {match:{classifyId1:dto.classifyId1}} ; mustParams.push(param)};

        if(null != dto.classifyName1){const param = {match:{classifyName1:dto.classifyName1}} ; mustParams.push(param)};

        if(null != dto.classifyId2){const param = {match:{classifyId2:dto.classifyId2}} ; mustParams.push(param)};

        if(null != dto.classifyName2){const param = {match:{classifyName2:dto.classifyName2}} ; mustParams.push(param)};

        if(null != dto.name){const param = {match:{name:dto.name}} ; mustParams.push(param)};

        if(null != dto.objectId){const param = {match:{objectId:dto.objectId}} ; mustParams.push(param)};

        if(null != dto.chuzhiId){const param = {match:{chuzhiId:dto.chuzhiId}} ; mustParams.push(param)};

        if(null != dto.objectName){const param = {match:{objectName:dto.objectName}} ; mustParams.push(param)};

        if(null != dto.chuzhiName){const param = {match:{chuzhiName:dto.chuzhiName}} ; mustParams.push(param)};

        if(null != dto.yangbenContent){const param = {match:{yangbenContent:dto.yangbenContent}} ; mustParams.push(param)};

        if(null != dto.seqNo){const param = {match:{seqNo:dto.seqNo}} ; mustParams.push(param)};

        if(null != dto.chuzhiCnt){const param = {match:{chuzhiCnt:dto.chuzhiCnt}} ; mustParams.push(param)};

        return this.elasticsearchService.search({
            index: 'dagl_dt', type: '_doc', body: {
                from: (pageNumber - 1) * pageSize,  // 从哪里开始
                size: pageSize, // 查询条数
                query: {
                    bool: {
                        // must:[
                        //     // {match:{gwly:"岗位来源5"}},
                        //     {match:{gwly:"岗位来源"}},
                        //     // {match:{czlsh:"ssdsdd5"}},
                        //     {match:{czlsh:"ssdsdd5"}},
                        //     // {match:{czsd:"处置手段5"}},
                        //     {match:{czsd:"处置"}},
                        //     // {match:{gksj:""}},
                        //     {match:{dxyb:"独享样本5"}},
                        // ],
                        // filter:{
                        //     range:{
                        //         czsj:{
                        //             gte:"2020-05-04",
                        //             lte:"2020-05-05"
                        //         }
                        //     }
                        // }
                        must:mustParams
                    }
                },
                highlight: {
                    fields: {

                        classifyName1: {},
                        classifyId1: {},
                        classifyId2: {},
                        classifyName2: {},
                        name: {},
                        objectId: {},
                        chuzhiId: {},
                        objectName: {},
                        chuzhiName: {},
                        yangbenContent: {},
                        seqNo: {},
                        chuzhiCnt: {}
                    }
                }
            }
        });
    }


  //-----------添加dagl---------------------------------------------------------------------------

  // 添加、修改、删除数据
  async bulkYB(params: any) {
    return await this.elasticsearchService.bulk(params);
  }

  async getDate(){
    // return this.elasticsearchService.
  }

  async addBulkYB(createEDto: YangbenDtoEs) {
    return this.elasticsearchService.bulk({
      body: [
        // 指定的数据库为news, 指定的Id = 1
        { index: { _index: 'dagl', _type: '_doc', _id: createEDto.id } },
        {
          czlsh: createEDto.czlsh,
          dxlx: createEDto.dxlx,
          czsl: createEDto.czsl,
          czsj: createEDto.czsj,
          czsd: createEDto.czsd,
          gksj: createEDto.gksj,
          dxyb: createEDto.dxyb,
          cjsj: createEDto.cjsj,
          gwly: createEDto.gwly
        },
          { index: { _index: 'dagl', _type: '_doc', _id: 0 } },
          {
              czlsh: createEDto.czlsh,
              dxlx: createEDto.dxlx,
              czsl: createEDto.czsl,
              czsj: createEDto.czsj,
              czsd: createEDto.czsd,
              gksj: createEDto.gksj,
              dxyb: createEDto.dxyb,
              cjsj: createEDto.cjsj,
              gwly: createEDto.gwly
          },
      ]
    });
  }

  async deleteBulkYB(id:string) {
    return this.elasticsearchService.bulk({
      body: [
        { delete: { _index: 'dagl', _type: '_doc', _id: id } },
      ]
    });
  }

  async updateBulkYB(updateEDto: YangbenDtoEs) {
    return this.elasticsearchService.bulk({
      body: [
        { update: { _index: 'dagl', _type: '_doc', _id: updateEDto.id } },
        // 仅仅是修改你改的字段,之前有的字段不会被删除
        { doc: {
            czlsh: updateEDto.czlsh,
            dxlx: updateEDto.dxlx,
            czsl: updateEDto.czsl,
            czsj: updateEDto.czsj,
            czsd: updateEDto.czsd,
            gksj: updateEDto.gksj,
            dxyb: updateEDto.dxyb,
            cjsj: updateEDto.cjsj,
            gwly: updateEDto.gwly
          }
        },]
    });
  }

  async searchYB(czsj:string) {
    return this.elasticsearchService.search({
      index: 'dagl', type: '_doc', body: {
        query: {
          match: {
            czsj: czsj, // 模糊查询,有点类型正则中的match
          }
        }
      }
    });
  }

  /**
   * 分页查询
   */
  async searchLimitYB(con: string) {
    const pageSize = 10;
    const pageNumber = 1
    return this.elasticsearchService.search({
      index: 'dagl', type: '_doc', body: {
        from: (pageNumber - 1) * pageSize,  // 从哪里开始
        size: pageSize, // 查询条数
        query: {
          match: {
            czlsh: con // 搜索查询到的内容
          }
        }
      }
    });
  }

  /**
   * 样本综合查询
   * 处置时间(开始结束)、岗位来源、处置流水号、处置手段、管控事件、典型样本
   */
  async findYB(dto: YangbenDtoEs) {
    const pageSize = 10;
    const pageNumber = 1
    return this.elasticsearchService.search({
      index: 'dagl', type: '_doc', body: {
        from: (pageNumber - 1) * pageSize,  // 从哪里开始
        size: pageSize, // 查询条数
        query: {
          bool: {
            must:[
              // {match:{gwly:"岗位来源5"}},
              {match:{gwly:"岗位来源"}},
              // {match:{czlsh:"ssdsdd5"}},
              {match:{czlsh:"ssdsdd5"}},
              // {match:{czsd:"处置手段5"}},
              {match:{czsd:"处置"}},
              // {match:{gksj:""}},
              {match:{dxyb:"独享样本5"}},
            ],
            filter:{
              range:{
                  czsj:{
                    gte:"2020-05-04",
                    lte:"2020-05-05"
                  }
              }
            }
          }
        }
      }
    });
  }

  async countYB() {
    return this.elasticsearchService.count({
      index: 'dagl',
      // type: '_doc', body: { // 按条件查询数量
      //   query: {
      //     match: {
      //       czsl: '155'
      //     }
      //   }
      // }
      type: '_doc', body: { // 查询索引总数
      }
    });
  }
  //--------------------------------------------------------------------------------------

  // 添加、修改、删除数据
  async bulk(params: any) {
    return await this.elasticsearchService.bulk(params);
  }
  // async addBulk(createEDto: CreateEDto) {
  //   // return await this.elasticsearchService.bulk({
  //   return this.elasticsearchService.bulk({
  //     body: [
  //       // 指定的数据库为news, 指定的Id = 1
  //       { index: { _index: 'news', _type: 'doc', _id: createEDto.id } },
  //       { content: createEDto.con }
  //     ]
  //   });
  // }
  //
  // async deleteBulk(id:string) {
  //   // return await this.elasticsearchService.bulk({
  //   return this.elasticsearchService.bulk({
  //     body: [
  //       { delete: { _index: 'news', _type: 'doc', _id: id } },
  //     ]
  //   });
  // }
  //
  // async updateBulk(updateEDto: UpdateEDto) {
  //   // return await this.elasticsearchService.bulk({
  //   return this.elasticsearchService.bulk({
  //     body: [
  //       { update: { _index: 'news', _type: 'doc', _id: updateEDto.id } },
  //       // 仅仅是修改你改的字段,之前有的字段不会被删除
  //       { doc: { content: updateEDto.con } },]
  //   });
  // }
  //
  // async search(con:string) {
  //   // return await this.elasticsearchService.search({
  //   return this.elasticsearchService.search({
  //     index: 'news', type: 'doc', body: {
  //       query: {
  //         match: {
  //           content: con, // 模糊查询,有点类型正则中的match
  //         }
  //       }
  //     }
  //   });
  // }
  //
  // /**
  //  * 分页查询
  //  */
  // async searchLimit(con: string) {
  //   const pageSize = 10;
  //   const pageNumber = 1
  //   // return await this.elasticsearchService.search({
  //   return this.elasticsearchService.search({
  //     index: 'news', type: 'doc', body: {
  //       from: (pageNumber - 1) * pageSize,  // 从哪里开始
  //       size: pageSize, // 查询条数
  //       query: {
  //         match: {
  //           content: con // 搜索查询到的内容
  //         }
  //       }
  //     }
  //   });
  // }
  //
  // async count() {
  //   return this.elasticsearchService.count({
  //     index: 'news',
  //     type: 'doc', body: {
  //       query: {
  //         match: {
  //           content: '中国'
  //         }
  //       }
  //     }
  //   });
  // }

  // 查询数据
  // async search(params: any) {
  //   return await this.elasticsearchService.search(params);
  // }



  //---------------------------------------------------------------------------

  create(createEDto: CreateEDto) {
    return 'This action adds a new e';
  }

  findAll() {
    return `This action returns all es`;
  }

  findOne(id: number) {
    return `This action returns a #${id} e`;
  }

  update(id: number, updateEDto: UpdateEDto) {
    return `This action updates a #${id} e`;
  }

  remove(id: number) {
    return `This action removes a #${id} e`;
  }
}
