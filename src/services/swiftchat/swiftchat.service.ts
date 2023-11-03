import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class SwiftchatService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}
  
  private botId = process.env.BOT_ID;
  private apiKey = process.env.API_KEY;
  private apiUrl = process.env.API_URL;
  private baseUrl = `${this.apiUrl}/${this.botId}/messages`;

  async sendRequestToswiftChat(requestData: any) {
    try {
      const cachedData = await this.cacheService.get<{ name: string }>(
        "ok"
      );
      if (cachedData) {
        console.log(`Getting data from cache!`);
        return `${cachedData.name}`;
      }

      const response = await axios.post(this.baseUrl, requestData, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
