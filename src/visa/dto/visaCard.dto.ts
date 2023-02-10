import { IsNumberString, IsString, Length } from 'class-validator';

export class VisaCardDto {
  @Length(16, 16, { message: 'Пишите ровно 16' })
  @IsNumberString({}, { message: 'Пишите только number в формате string' })
  readonly CARD_NUMBER: string;
  @IsString({ message: 'Пишите только буквы' })
  readonly CLIENT_CODE: string;
  @IsString({ message: 'Пишите только буквы' })
  readonly FILIAL_CODE: string;
  @IsString({ message: 'Пишите только буквы' })
  readonly LOCAL_CODE: string;
  @IsString({ message: 'Пишите только буквы' })
  readonly EMBOSSED_NAME: string;
  @IsString({ message: 'Пишите только буквы' })
  readonly DATE_REGISTERED: string;
  @IsString({ message: 'Пишите только буквы' })
  readonly NAME: string;
  @IsString({ message: 'Пишите только буквы' })
  readonly RESIDENT: string;
  @IsString({ message: 'Пишите только буквы' })
  readonly COUNTRY_CODE: string;
  @IsString({ message: 'Пишите только буквы' })
  readonly PASSPORT: string;
  @IsString({ message: 'Пишите только буквы' })
  readonly CODE: string;
}
