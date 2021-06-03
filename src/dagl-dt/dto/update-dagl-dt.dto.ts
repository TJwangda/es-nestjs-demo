import { PartialType } from '@nestjs/swagger';
import { CreateDaglDtDto } from './create-dagl-dt.dto';

export class UpdateDaglDtDto extends PartialType(CreateDaglDtDto) {}
