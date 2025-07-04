import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateVoterDto {
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+\s[A-Za-zÁÉÍÓÚáéíóúÑñÜü]*\s?[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+\s[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+$/,
    {
      message:
        'The name should be in the format: FirstName SecondName(Optional) LastName SecondLastName',
    },
  )
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsBoolean()
  @IsOptional()
  has_voted: boolean;
}
