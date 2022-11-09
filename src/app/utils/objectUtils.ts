import { snakeCase } from "lodash";

export const isNotValid = (value: any) => {
    let object = Object.assign({}, value)
    Object.keys(object).forEach(key => {
        (object[key] === undefined || object[key] === null) && delete object[key]
    });
    return Object.entries(object).length === 0 && object.constructor === Object
}


export const fixProperty = ({ obj, key, value }): { obj: Object, key: string, value: any } => {
    obj[snakeCase(key)] = value
    delete obj[key]
    return value
}