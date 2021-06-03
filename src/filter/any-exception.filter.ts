/**
 * 捕获所有异常
 */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from '../utils/log4js';
import {configMap} from "../config-map";
import dateFormat = require('dateformat');

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    // time: ${new Date()}
    // Request original url: ${request.originalUrl}
    // Method: ${request.method}
    // IP: ${request.ip}
    // Status code: ${status}
    // Response: ${exception} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    // `;

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

    const sysUnitType = "0";//组件类型:0：有界面组件;1：系统无界面组件
    const logFormat = `  {"Message_Type":"YWXTYXZT","detail":[{"No_Message":1,"SYS_ID":"JCYJ-J-15-00","SYS_Name":"转世账号收集分析系统","SYS_Url": "${request.originalUrl}","Unit_ID":"${unitId}","Unit_name":"${unitName}","SYS_status":${status},"Error_Desc":"${exception.toString()}","SYS_Unit_Type":"${sysUnitType}","Data_Increment":"0","SYS_Spend_time":"0","SYS_status_time":"${sysStatusTime}"}]}`;

    Logger.error(logFormat);
    response.status(status).json({
      statusCode: status,
      msg: `Service Error: ${exception}`,
    });
  }
}
