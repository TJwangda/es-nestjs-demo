import {CallHandler, ExecutionContext, Injectable, Module, NestInterceptor} from '@nestjs/common';
import { Observable } from 'rxjs';

import {map} from "rxjs/operators";
import {Logger} from "../utils/log4js";
import {InjectRepository, TypeOrmModule} from "@nestjs/typeorm";

import {Repository} from "typeorm";


/**
 * 10.25 暂时注释，后续逻辑缕清再看看
 */
@Injectable()
export class UpdatenumInterceptor implements NestInterceptor {

    // constructor(
    //     @InjectRepository(AccountMsgEntity)
    //     private readonly acmRepo: Repository<AccountMsgEntity>,
    // ) {}
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    //     //
    //     const host = context.switchToHttp();
    //     const request = host.getRequest();
    //     const url:string = request.originalUrl;
    //     console.log("请求url："+url)
    //     //url中包含/api​/crud​/accountmsg-crud​/或者/api​/account-msg​/，进入方法
    //     if(0 == (url.indexOf('/api/crud/accountmsg-crud')) || 0 == (url.indexOf('/api/account-msg'))) {
    //         console.log("进入方法。。。")
    //
    //         return next.handle().pipe( map(data => {
    //                 const parentIds = [];//转世父id
    //                 const glparentIds = [];//关联父id
    //                 let zsParentId ;
    //                 let relaParentId ;
    //                 let relaAccountNum ;//关联账号数
    //                 console.log("======================================")
    //                 if((url.indexOf('/bulk')) >= 0){//批量添加转世
    //                     const arr:[] =  request["body"]["bulk"]
    //                     for(const dto of arr){
    //                         if(null != dto["zsParent"]){
    //                             const parentId = dto["zsParent"]["id"]
    //                             parentIds.push(parentId)
    //                         }
    //                     }
    //
    //                 }if(request.method == 'DELETE'){  //todo 异步问题，无法生效
    //                     const ids = url.split('/');
    //                     const id = ids[ids.length-1];
    //                     console.log("删除的账号id："+id)//查询其有没有父级账号，如果有插入parentIds数组，更新父级账号的转世账号数
    //                     const zsParentIdSql = ` SELECT zsParentId FROM account_msg where id = ${id} `;
    //                     const zsParentIdP:Promise<any> =   this.acmRepo.query(zsParentIdSql);
    //                     const zsNum = zsParentIdP.then(res=>{
    //                         Logger.info('zsNumres=>',res["zsParentId"])
    //                         parentIds.push(res["zsParentId"])
    //                         return res["zsParentId"];
    //                     })
    //
    //                 }if((url.indexOf('/deleteAccMsgBatch')) >= 0){//批量删除转世接口
    //                     const zsParentId = request["body"]["zsParentId"]
    //                     console.log("批量删除转世的父id。。"+ zsParentId);
    //                     parentIds.push(zsParentId)
    //
    //                 }if((url.indexOf('/importzsExcel')) >= 0){//excel批量导入转世接口
    //                     const zsParentId = request["params"]["id"]
    //                     console.log("批量删除转世的父id。。"+ zsParentId);
    //                     parentIds.push(zsParentId)
    //
    //                 }if((request.method == 'POST'||request.method == 'PATCH') && 0 == (url.indexOf('/api/crud/accountmsg-crud'))) {//单个添加
    //                     if(null != request["body"]["zsParent"]){
    //                         console.log("====主账号id：==="+request["body"]["zsParent"]["id"])
    //                         zsParentId = request["body"]["zsParent"]["id"];
    //                         if(null != zsParentId){
    //                             parentIds.push(zsParentId)
    //                         }
    //                     }
    //                     if(null != request["body"]["relaParent"]){
    //                         console.log("====主账号id：==="+request["body"]["relaParent"]["id"])
    //                         relaParentId = request["body"]["relaParent"]["id"];
    //                         if(null != relaParentId){
    //                             glparentIds.push(relaParentId)
    //                         }
    //                     }
    //                     if(null != request["body"]["relaAccounts"]){
    //                         console.log("====进入修改，账号id：=="+request["body"]["id"])
    //                         console.log("====进入修改，账号关联账号条数=="+request["body"]["relaAccounts"])
    //                         const id = relaParentId = request["body"]["id"];
    //                         const relaAccounts = request["body"]["relaAccounts"];
    //                         relaAccountNum = relaAccounts.length;
    //                         const updateSql = ` UPDATE account_msg SET recaccountnum = ${relaAccountNum} WHERE id = ${id} `;
    //                         this.acmRepo.query(updateSql);
    //                     }
    //                 }else {}
    //                 if(parentIds.length>0){
    //                     for(const zsParentId of parentIds){
    //                         const zsSqlNum = ` select count(*) from account_msg where zsParentId = ${zsParentId} `;//转世条数
    //
    //                         const zsRetP:Promise<any> =   this.acmRepo.query(zsSqlNum);
    //                         const zsNum = zsRetP.then(res=>{
    //                             Logger.info('zsNumres=>',res[0]["count(*)"])
    //                             const updateSql = ` UPDATE account_msg SET zsaccountnum = ${res[0]["count(*)"]} WHERE id = ${zsParentId} `;
    //                             this.acmRepo.query(updateSql);
    //                             Logger.info('then中的updateSql====>',updateSql)
    //                             return res[0]["count(*)"];
    //                         })
    //
    //                         //0921 修改字段含义recaccountnum保存，关联账号条数
    //                         const recZsSqlNum = ` select count(*) from account_msg where relaParentId = ${zsParentId} `;//批量删除时，关联账号条数
    //
    //                         //0921 更新研判转世数
    //                         const recZsRetP:Promise<any> =   this.acmRepo.query(recZsSqlNum);
    //                         const recZsNum = recZsRetP.then(res=>{
    //                             Logger.info('recZsNumres=>',res[0]["count(*)"])
    //                             const updateSql = ` UPDATE account_msg SET recaccountnum = ${res[0]["count(*)"]} WHERE id = ${relaParentId} `;
    //                             this.acmRepo.query(updateSql);
    //                             Logger.info('then中的updateSql====>',updateSql)
    //                             return updateSql;
    //                         })
    //                     }
    //                 }else if(glparentIds.length>0){
    //                     for(const relaParentId of glparentIds){
    //                         //0921 修改字段含义recaccountnum保存，关联账号条数
    //                         const recZsSqlNum = ` select count(*) from account_msg where relaParentId = ${relaParentId} `;//关联账号条数
    //
    //                         //0921 更新研判转世数
    //                         const recZsRetP:Promise<any> =   this.acmRepo.query(recZsSqlNum);
    //                         const recZsNum = recZsRetP.then(res=>{
    //                             Logger.info('recZsNumres=>',res[0]["count(*)"])
    //                             const updateSql = ` UPDATE account_msg SET recaccountnum = ${res[0]["count(*)"]} WHERE id = ${relaParentId} `;
    //                             this.acmRepo.query(updateSql);
    //                             Logger.info('then中的updateSql====>',updateSql)
    //                             return updateSql;
    //                         })
    //
    //                     }
    //                 }
    //                 return data;
    //             }),
    //         );
    //     }
        return next.handle();
    }

}

