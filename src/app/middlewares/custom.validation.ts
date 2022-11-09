import { buildMessage, ValidateBy, ValidationArguments, ValidationOptions} from "class-validator";
import matchesValidator from 'validator/lib/matches';
import { Region } from "../models/region";

export const IS_BIGINT = 'isBigInt';
export const IS_REGION_NUMBER = 'IsRegionNumber';
export const HAS_AT_LEAST_ONE = 'HasAtLeastOne';
export const IS_VALID_NUMBER = 'IsValidNumber';

export function IsBigInt(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_BIGINT,
            validator: {
                validate: (value : number | string, _ ): boolean => {
                    let hasType = (typeof value === 'number' || typeof value === 'string' || typeof value === 'bigint');
                    if (hasType) {
                        return matchesValidator(`${value}`, /^(\-)?[0-9]+$/) || matchesValidator(`${value}`, /^(\-)[0-9]+n+$/);;
                    }
                    return false;
                },
                defaultMessage: buildMessage(
                    eachPrefix => eachPrefix + '$property must be a BigInt',
                    validationOptions
                ),
            },
        },
        validationOptions
    );
}

export function IsRegionNumber(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy({
        name: IS_REGION_NUMBER,
        validator: {
            validate: (value: string, _): boolean => {
                if (!value){
                    return false
                }

                let splited = value.split(/\s/);
                if (splited.length !== 2) {
                    return false;
                }
                let region = splited[0].toLowerCase()
                let valid = Object.keys(Region)[Object.values(Region).indexOf(region as unknown as Region)];
                if (!valid) {
                    return false;
                }
                return true
            },
            defaultMessage: buildMessage(
                eachPrefix => eachPrefix + '$property must be a region with number',
                validationOptions
            ),
        }
    })
}

export function IsValidNumber(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy({
        name: IS_VALID_NUMBER,
        validator: {
            validate: (value: string | number, _): boolean => {
                return matchesValidator(`${value}`, /^[0-9]+$/)
            },
            defaultMessage: buildMessage(
                eachPrefix => eachPrefix + '$property must be a valid number',
                validationOptions
            ),
        }
    })
}
