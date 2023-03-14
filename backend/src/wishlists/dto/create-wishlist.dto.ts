import { IsArray, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsString()
  @IsOptional()
  @Length(0, 1500)
  description: string;

  @IsUrl()
  image: string;

  @IsArray()
  itemsId: number[];
}
