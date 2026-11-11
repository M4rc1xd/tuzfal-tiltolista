import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Post, Body } from '@nestjs/common';
import { felvetelDto } from './felvetel.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getHello() {
    return {
      list: await this.appService.getSortedBlocked(),
    }
  }

  @Get("felvetel")
  @Render('felvetel')
  async getFelvetelForm() {
  }

  @Post("felvetel")
  @Render('felvetel')
  async ujBlocked(@Body() body: felvetelDto) {
    await this.appService.ujBlocked(body);
  }
}
