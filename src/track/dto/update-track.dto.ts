import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
