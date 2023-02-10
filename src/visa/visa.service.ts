import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisaCardDto } from './dto/visaCard.dto';
import { Between, In, Repository } from 'typeorm';
import { ExcelTotalCards } from './model/visaCards.model';
import { IVisaService } from './visa.service.interface';
import { VisaCardFindByDateDto } from './dto/visaCard.findByDate.dto';
import { VisaCardFindDto } from './dto/visaCard.findCards.dto';
import { VisaFindCardsResponseDto } from './dto-response/visaFindCards.response.dto';
import { VisaCardResponseDto } from './dto-response/visaCard.response.dto';

@Injectable()
export class VisaService implements IVisaService {
  constructor(
    @InjectRepository(ExcelTotalCards)
    private visaCards: Repository<ExcelTotalCards>,
  ) {}

  async addCards(bodyReq: VisaCardDto): Promise<VisaCardResponseDto[]> {
    const result = [];
    const error = [];
    try {
      for (let i = 0; i < bodyReq['length']; i++) {
        const card = await this.visaCards.findOneBy({
          card_number: bodyReq[i].CARD_NUMBER,
        });

        if (card) {
          error.push({
            [card.card_number]: `${card.card_number} уже существует`,
          });
        } else {
          const saveCard = new ExcelTotalCards();
          saveCard.card_number = bodyReq[i].CARD_NUMBER;
          saveCard.client_code = bodyReq[i].CLIENT_CODE;
          saveCard.code = bodyReq[i].CODE;
          saveCard.country_code = bodyReq[i].COUNTRY_CODE;
          saveCard.date_registered = bodyReq[i].DATE_REGISTERED;
          saveCard.embossed_name = bodyReq[i].EMBOSSED_NAME;
          saveCard.filial_code = bodyReq[i].FILIAL_CODE;
          saveCard.local_code = bodyReq[i].LOCAL_CODE;
          saveCard.name = bodyReq[i].NAME;
          saveCard.pasport = bodyReq[i].PASSPORT;
          saveCard.resident = bodyReq[i].RESIDENT;
          const save = await this.visaCards.save(saveCard);
          result.push(save);
        }
      }

      if (error.length) {
        throw new HttpException(error, 400);
      }
      return result;
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  async findByDate(
    bodyReq: VisaCardFindByDateDto,
  ): Promise<VisaCardResponseDto[]> {
    try {
      const cards = await this.visaCards.find({
        where: {
          date_registered: Between<string>(bodyReq.start, bodyReq.end),
        },
      });
      return cards;
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  async findCards(bodyReq: VisaCardFindDto): Promise<VisaFindCardsResponseDto> {
    try {
      const arrCards = bodyReq.cards;
      const resultObj = {
        not_found: [],
        found: [],
      };

      const foundCards = await this.visaCards.findBy({
        card_number: In(arrCards),
      });
      const lenFoundCards = foundCards.length;

      resultObj.found = foundCards;
      for (let i = 0; i < arrCards.length; i++) {
        let count = 0;
        for (let k = 0; k < foundCards.length; k++) {
          if (arrCards[i] != foundCards[k]['card_number']) {
            count += 1;
          }
        }
        if (count == lenFoundCards) {
          resultObj.not_found.push(arrCards[i]);
        }
      }
      return resultObj;
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }
}
