import {
  BadRequestException,
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';
import { validate, version } from 'uuid';

@Injectable()
export class ParseUUIDPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    if (!(validate(value) && version(value) === 4)) {
      throw new BadRequestException('Invalid id');
    }
    return value;
  }
}
