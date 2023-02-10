import { IsString } from 'class-validator';

export class VisaCardFindByDateDto {
  @IsString({ message: 'Пишите только буквы' })
  readonly start: string;
  @IsString({ message: 'Пишите только буквы' })
  readonly end: string;
}
