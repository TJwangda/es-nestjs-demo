import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EsService } from './es.service';
import { CreateEDto } from './dto/create-e.dto';
import { UpdateEDto } from './dto/update-e.dto';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {YangbenDtoEs} from "./dto/yangben-es.dto";

@ApiTags("es模块测试增删改查")
@Controller('es')
export class EsController {
  constructor(private readonly esService: EsService) {}

  //-----------------------------------------------------------------------------------------------
  @ApiOperation({summary:"添加es"})
  @Post()
  createYB(@Body() createEDto: YangbenDtoEs) {
    return this.esService.addBulkYB(createEDto);
  }


  @ApiOperation({summary:"根据处置流水号查找es"})
  @Get(':con')
  findAllYB(@Param('con') con: string) {
    return this.esService.searchLimitYB(con);
  }


  // @ApiOperation({summary:"根据处置时间查找es"})
  // @Get(':Date')
  // findOneYB(@Param('Date') date: string) {
  //   return this.esService.searchYB(date);
  // }

  /**
   * 样本综合查询
   * 处置时间(开始结束)、岗位、处置流水号、处置手段、管控事件、典型样本
   */
  @ApiOperation({summary:"样本综合查询es"})
  @Post("findYB")
  findYB(dto: YangbenDtoEs) {
    return this.esService.findYB(dto);
  }


  @ApiOperation({summary:"根据id修改es"})
  @Patch(':id')
  updateYB(@Param('id') id: string, @Body() updateEDto: YangbenDtoEs) {
    return this.esService.updateBulkYB(updateEDto);
  }


  @ApiOperation({summary:"根据id删除es"})
  @Delete(':id')
  removeYB(@Param('id') id: string) {
    return this.esService.deleteBulkYB(id);
  }

  @ApiOperation({summary:"查询es条数"})
  @Post('/countYB')
  countYB() {
    return this.esService.countYB();
  }


  //------------------------------------------------------------------------------------------------
  // @ApiOperation({summary:"添加es"})
  // @Post()
  // create(@Body() createEDto: CreateEDto) {
  //   return this.esService.addBulk(createEDto);
  // }
  //
  //
  // @ApiOperation({summary:"根据con分页查找es"})
  // @Get(':con')
  // findAll(@Param('con') con: string) {
  //   return this.esService.searchLimit(con);
  // }
  //
  //
  // @ApiOperation({summary:"根据id查找es"})
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.esService.search(id);
  // }
  //
  //
  // @ApiOperation({summary:"根据id修改es"})
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEDto: UpdateEDto) {
  //   return this.esService.updateBulk(updateEDto);
  // }
  //
  //
  // @ApiOperation({summary:"根据id删除es"})
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.esService.deleteBulk(id);
  // }
}
