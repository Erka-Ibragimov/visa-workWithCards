import { VisaCardDto } from 'src/visa/dto/visaCard.dto';
import { VisaCardResponseDto } from './dto-response/visaCard.response.dto';
import { VisaFindCardsResponseDto } from './dto-response/visaFindCards.response.dto';
import { VisaCardFindByDateDto } from './dto/visaCard.findByDate.dto';
import { VisaCardFindDto } from './dto/visaCard.findCards.dto';

export interface IVisaController {
  addCards: (bodyReq: VisaCardDto) => Promise<VisaCardResponseDto[]>;
  findByDate: (
    bodyReq: VisaCardFindByDateDto,
  ) => Promise<VisaCardResponseDto[]>;
  findCards: (bodyReq: VisaCardFindDto) => Promise<VisaFindCardsResponseDto>;
}
