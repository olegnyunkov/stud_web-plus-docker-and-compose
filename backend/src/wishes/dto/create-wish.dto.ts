import { IsNotEmpty, IsString, IsUrl, Length, Min } from 'class-validator';

export class CreateWishDto {
  @Length(1, 250)
  @IsNotEmpty()
  name: string;
  @IsUrl()
  link: string;
  @IsUrl()
  image: string;
  @Min(1)
  price: number;
  @IsString()
  description: string;
}
