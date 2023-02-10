import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from './validation.exception';
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  errors;
  constructor() {
    this.errors = [];
  }
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);

    if (obj.length == 0 || Object.keys(obj).length == 0) {
      throw new ValidationException({ error: 'Нет данных' });
    }

    if (!Array.isArray(obj)) {
      this.errors = [];
      const error = await validate(obj);
      await this.sortErr(error);
    } else {
      this.errors = [];
      for (let i = 0; i < obj.length; i++) {
        const error = await validate(obj[i]);
        await this.sortErr(error);
      }
    }

    if (this.errors.length > 0) {
      throw new ValidationException(this.errors);
    }
    return value;
  }

  async sortErr(error: Array<object>) {
    if (error.length > 0) {
      error.forEach((err) => {
        this.errors.push({
          [err['property']]: `${Object.values(err['constraints']).join(', ')}`,
        });
      });
    }
  }
}
