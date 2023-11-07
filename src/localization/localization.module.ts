// localization.module.ts

import { Module } from '@nestjs/common';
import { LocalizationService } from './localization.service'; // Update the path to localization service

@Module({
  providers: [LocalizationService],
  exports: [LocalizationService],
})
export class LocalizationModule {}
