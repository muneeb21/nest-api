'use strict';

import { IsEmail, IsNumber, IsOptional, Validate } from 'class-validator';
import { PhoneNumberValidator } from '../validator/phoneNumberValidator';

export class contactDto {
  @IsOptional()
  @Validate(PhoneNumberValidator)
  phoneNumber: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
