import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  ExcelTotalCards } from './model/visaCards.model';
import { VisaController } from './visa.controller';
import { VisaService } from './visa.service';

@Module({
  controllers: [VisaController],
  providers: [VisaService],
  imports:[TypeOrmModule.forFeature([ExcelTotalCards])]
})
export class VisaModule {}
