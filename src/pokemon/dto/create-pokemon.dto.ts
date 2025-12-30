import { IsString, MinLength, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsPositive, Min } from 'class-validator';

export class CreatePokemonDto {
  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;

  @Transform(({ value }) => String(value))
  @IsString()
  @MinLength(1)
  name: string;
}
