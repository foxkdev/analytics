import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { contentFields } from '../constants';

@ValidatorConstraint({ name: 'ContentValidator', async: false })
export class ContentValidator implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const fields = contentFields[validationArguments.object['type']];
    if (fields.length === 0) {
      return true;
    }
    const valid = fields.every((val) => value[val] != null);
    return valid;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Content invalid with this type';
  }
}
