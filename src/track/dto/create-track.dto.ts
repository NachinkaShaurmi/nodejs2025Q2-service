import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
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
