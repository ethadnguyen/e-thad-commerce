import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class GoongService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('goong.apiKey');
    this.baseUrl = this.configService.get<string>('goong.baseUrl');
  }

  async searchPlaces(keyword: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/Place/AutoComplete`, {
        params: {
          api_key: this.apiKey,
          input: keyword,
        },
      });
      return response.data.predictions;
    } catch (error) {
      throw new HttpException('Failed to search places', 500);
    }
  }

  async getPlaceDetail(placeId: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/Place/Detail`, {
        params: {
          api_key: this.apiKey,
          place_id: placeId,
        },
      });
      return response.data.result;
    } catch (error) {
      throw new HttpException('Failed to get place detail', 500);
    }
  }

  async geocode(address: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/Geocode`, {
        params: {
          api_key: this.apiKey,
          address: address,
        },
      });
      return response.data.results[0];
    } catch (error) {
      throw new HttpException('Failed to geocode address', 500);
    }
  }
}
