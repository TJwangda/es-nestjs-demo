import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DaglDtService } from './dagl-dt.service';
import { CreateDaglDtDto } from './dto/create-dagl-dt.dto';
import { UpdateDaglDtDto } from './dto/update-dagl-dt.dto';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {YangbenSearch} from "./entities/dagl-dt.entity";

@ApiTags("dagl-dt")
@Controller('dagl-dt')
export class DaglDtController {
  constructor(private readonly daglDtService: DaglDtService) {}

  @Post()
  create(@Body() createDaglDtDto: CreateDaglDtDto) {
    return this.daglDtService.create(createDaglDtDto);
  }

  @ApiOperation({summary:"findAll"})
  @Get()
  findAll() {
    return this.daglDtService.findAll();
  }

    @ApiOperation({summary:"全量同步yangben_search表"})
    @Get("/all_synch")
    allSynch() {
        return this.daglDtService.allSynch();
    }

    @ApiOperation({summary:"es查询"})
    @Get('/findOneEs:id')
    findOneEs(@Param('id') id: string) {
        return this.daglDtService.findOne(+id);
    }

    @ApiOperation({summary:"es查询多条件"})
    @Post('/findManyEs')
    findManyEs(@Body()dto:YangbenSearch) {
        return this.daglDtService.findManyEs(dto);
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.daglDtService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDaglDtDto: UpdateDaglDtDto) {
    return this.daglDtService.update(+id, updateDaglDtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.daglDtService.remove(+id);
  }
}
