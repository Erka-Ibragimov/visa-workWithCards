import { IsArray, IsString } from 'class-validator';

export class VisaCardFindDto {
  @IsArray()
  @IsString({ each: true })
  readonly cards: string[];
}
