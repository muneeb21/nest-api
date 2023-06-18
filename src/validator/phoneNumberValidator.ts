import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'phoneNumber', async: false })
export class PhoneNumberValidator implements ValidatorConstraintInterface {
  validate(phoneNumber: string, args: ValidationArguments) {
    const phoneNumberRegex = /^[0-9]{6}$/;

    return phoneNumberRegex.test(phoneNumber);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid phone number format! It should be 6 digits';
  }
}
