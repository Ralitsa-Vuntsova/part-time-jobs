import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser, CreateApplicationResponseDto } from '@shared/data-objects';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user-decorator';
import { ApplicationResponsesService } from './application-responses.service';

@Controller('application-responses')
export class ApplicationResponsesController {
  constructor(private appResponseService: ApplicationResponsesService) {}

  @Get()
  list() {
    return this.appResponseService.list();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createApplicationResponse(
    @Body() response: CreateApplicationResponseDto,
    @User() user: AuthUser
  ) {
    return this.appResponseService.create(response, user.userId);
  }
}
