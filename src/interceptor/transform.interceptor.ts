// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Logger } from '../utils/log4js';
//
// @Injectable()
// export class TransformInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const req = context.getArgByIndex(1).req;
//     return next.handle().pipe(
//         map(data => {
//           const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//     time: ${new Date()}
//     Request original url: ${req.originalUrl}
//     Method: ${req.method}
//     IP: ${req.ip}
//     User: ${JSON.stringify(req.user)}
//     Response data:\n ${JSON.stringify(data.data)}
//     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
//           Logger.info(logFormat);
//           Logger.access(logFormat);
//           return data;
//         }),
//     );
//   }
// }
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '../utils/log4js';
import dateFormat = require('dateformat');
import {configMap} from "../config-map";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.getArgByIndex(1).req;
        const code = context.getArgByIndex(1).statusCode;
        const startTime = new Date();
        return next.handle().pipe(
            map(data => {
                // const code = req.statusCode
                const endTime = new Date();
                const sysSpendTime = (endTime.getTime() - startTime.getTime())/1000;//毫秒/1000
                const sysStatusTime = dateFormat(endTime, "yyyy-mm-dd HH:MM:ss");
                let errorDesc = '无';
                if(code>= 500){
                    errorDesc = '接口报错';
                }else if (req.statusCode >= 400) {
                    errorDesc = '无法找到请求资源'
                }else {
                    errorDesc = '无';
                }
                //todo
                // 1、data是接口返回值，多项新增时，判断接口返回中是否包含addNum参数，有就取值。
                // 2、crud的接口返回值
                // 3、get请求会在url拼接参数，无法用url从map中取值。
                let url = req.originalUrl;
                //----------unitId/unitName--------------------------------------------------------------------
                let unitNameMap = new Map();
                const unitNameMapConf = configMap.unitNameMap;
                for(let i in unitNameMapConf){
                    unitNameMap.set(i,unitNameMapConf[i]);
                }
                const unitIdMap = new Map();
                const unitIdMapConf = configMap.unitIdMap;
                for(let i in unitIdMapConf){
                    unitIdMap.set(i,unitIdMapConf[i]);
                }
                let unitName = unitNameMap.get(url);
                let unitId = unitIdMap.get(url);
                const method = req.method.toLowerCase();
                if(null == unitName){//如果map中没有这个url对应的value
                    //获取map中所有的key，循环判断url是否包含某个key
                    for(const key of unitNameMap.keys()){
                        if(url.indexOf(key) != -1){//请求包含key
                            url = key;//把url规范成配置文件中的url
                            break;
                        }
                    }
                    unitName = unitNameMap.get(url);
                    unitId = unitIdMap.get(url);

                    if(typeof unitName == "object"){
                        unitName = unitNameMap.get(url)[method];
                        unitId = unitIdMap.get(url)[method];
                    }
                }else {//如果有，并且类型为object，标识map中嵌套map
                    if(typeof unitName == "object"){
                        //获取map中所有的key，循环判断url是否包含某个key
                        // for(const key of unitNameMap.keys()){
                        //     if(url.indexOf(key) != -1){//请求包含key
                        //         url = key;//把url规范成配置文件中的url
                        //         break;
                        //     }
                        // }
                        unitName = unitNameMap.get(url)[method];
                        unitId = unitIdMap.get(url)[method];
                    }
                }

                //------dataIncrement-----------------------------------------------------------
                let dataIncrement = '0';//新增数据量,如果没有则为0

                if("post" == req.method.toLowerCase()){//typeorm自带的crud添加
                    if(req.originalUrl.indexOf('crud') != -1||req.originalUrl.indexOf('Crud') != -1){
                        if(req.originalUrl.indexOf('bulk') != -1){//批量
                            //
                            dataIncrement = data.length;
                        }else {//单条
                            dataIncrement = '1'
                        }
                    }
                }
                //批量导入excel，修改接口返回值，增加一个参数:logAddNum;
                if(url == 'api/account-msg/importMiddleExcel'){
                    dataIncrement = data['dataLength'];
                }
                const sysUnitType = "0";//组件类型:0：有界面组件;1：系统无界面组件
                //判断一下，如果不在config-map中的url不打印日志。 undefined
                if(unitName != undefined && unitId != undefined){
                    const logFormat = `  {"Message_Type":"YWXTYXZT","detail":[{"No_Message":1,"SYS_ID":"JCYJ-J-15-00","SYS_Name":"转世账号收集分析系统","SYS_Url": "${req.originalUrl}","Unit_ID":"${unitId}","Unit_name":"${unitName}","SYS_status":${code},"Error_Desc":"${errorDesc}","SYS_Unit_Type":"${sysUnitType}","Data_Increment":"${dataIncrement}","SYS_Spend_time":"${sysSpendTime}","SYS_status_time":"${sysStatusTime}"}]}`;
                    if (req.statusCode >= 500) {
                        Logger.error(logFormat);
                    } else if (req.statusCode >= 400) {
                        Logger.warn(logFormat);
                        Logger.error(logFormat);
                    }else {
                        Logger.info(logFormat);
                        // Logger.access(logFormat);
                        Logger.debug(logFormat);
                    }
                }


                return data;
            }),
        );
    }
}
