import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addTrack(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.removeTrack(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.removeArtist(id);
  }
}
