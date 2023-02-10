import { Body, Controller, Post } from '@nestjs/common';
import { VisaService } from './visa.service';
import { VisaCardDto } from 'src/visa/dto/visaCard.dto';
import { IVisaController } from './visa.controller.interface';
import { VisaCardFindByDateDto } from './dto/visaCard.findByDate.dto';
import { VisaCardFindDto } from './dto/visaCard.findCards.dto';
import { VisaCardResponseDto } from './dto-response/visaCard.response.dto';
import { VisaFindCardsResponseDto } from './dto-response/visaFindCards.response.dto';

@Controller('visa')
export class VisaController implements IVisaController {
  constructor(private visaService: VisaService) {}

  @Post('/add')
  async addCards(
    @Body() bodyReq: VisaCardDto,
  ): Promise<VisaCardResponseDto[]> {
    return await this.visaService.addCards(bodyReq);
  }

  @Post('/date')
  async findByDate(
    @Body() bodyReq: VisaCardFindByDateDto,
  ): Promise<VisaCardResponseDto[]> {
    return await this.visaService.findByDate(bodyReq);
  }

  @Post('/find')
  async findCards(
    @Body() bodyReq: VisaCardFindDto,
  ): Promise<VisaFindCardsResponseDto> {
    return await this.visaService.findCards(bodyReq);
  }
}
