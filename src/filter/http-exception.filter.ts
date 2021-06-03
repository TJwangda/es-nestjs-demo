import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';
import {configMap} from "../config-map";
import dateFormat = require('dateformat');

// @Catch()
@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const endTime = new Date();
    const sysStatusTime = dateFormat(endTime, "yyyy-mm-dd HH:MM:ss");
    let url = request.originalUrl;
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
    const method = request.method.toLowerCase();
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
    }

    // const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    // time: ${new Date()}
    // Request original url: ${request.originalUrl}
    // Method: ${request.method}
    // IP: ${request.ip}
    // Status code: ${status}
    // Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    // `;
    const sysUnitType = "0";//组件类型:0：有界面组件;1：系统无界面组件
    // const logFormat = `  {Message_Type:'YWXTYXZT',detail:[{No_Message:1,SYS_ID:'JCYJ-J-15-00',SYS_Name:'转世账号收集分析系统',SYS_Url: ${request.originalUrl},Unit_ID:${unitId},Unit_name:${unitName},SYS_status:${status},Error_Desc:${exception.toString()},SYS_Unit_Type:${sysUnitType},Data_Increment:'0',SYS_Spend_time:'0',SYS_status_time:${sysStatusTime}}]}`;
    const logFormat = `  {"Message_Type":"YWXTYXZT","detail":[{"No_Message":1,"SYS_ID":"JCYJ-J-15-00","SYS_Name":"转世账号收集分析系统","SYS_Url": "${request.originalUrl}","Unit_ID":"${unitId}","Unit_name":"${unitName}","SYS_status":${status},"Error_Desc":"${exception.toString()}","SYS_Unit_Type":"${sysUnitType}","Data_Increment":"0","SYS_Spend_time":"0","SYS_status_time":${sysStatusTime}}]}`;

    Logger.error(logFormat);
    response.status(status).json({
      statusCode: status,
      error: exception.message,
      msg: `${status >= 500 ? 'Service Error' : 'Client Error'}`,
    });
  }
}

