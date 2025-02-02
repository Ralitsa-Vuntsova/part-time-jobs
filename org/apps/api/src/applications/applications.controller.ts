import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser, CreateApplicationDto } from '@shared/data-objects';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user-decorator';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private appService: ApplicationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  list() {
    return this.appService.list();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createApplication(@Body() app: CreateApplicationDto, @User() user: AuthUser) {
    return this.appService.create(app, user.userId);
  }
}
