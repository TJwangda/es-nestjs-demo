import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import {InjectRepository} from "@nestjs/typeorm";

import {Repository} from "typeorm";
import {Logger} from "../utils/log4js";
import {UsersService} from "@app/auth/users/users.service";
import {PUser} from "@app/auth/entity/p-user.entity";

/**
 * 足迹拦截器：记录用户操作记录
 * 不用了，用接口
 */
@Injectable()
export class TrackInterceptor implements NestInterceptor {
  // constructor(
  //     @InjectRepository(AccountMsgEntity)
  //     private readonly acmRepo: Repository<AccountMsgEntity>,
  // ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        // const host = context.switchToHttp();
        // const request = host.getRequest();
        // const url:string = request.originalUrl;
        // const browser:string = request.headers["user-agent"];
        // const user:PUser = request.user
        // const ip:string = request.client["_peername"]["address"];
        // Logger.info("browser:"+browser)
    return next.handle();
  }
}
