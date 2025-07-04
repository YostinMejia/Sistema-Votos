import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateCandidateDto {
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
  @IsOptional()
  @IsString()
  party: string;
  @IsOptional()
  @Min(0)
  @IsNumber()
  votes: number;
}
