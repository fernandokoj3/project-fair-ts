export const isNotValid = (value: any) => {
    let object = Object.assign({}, value)
    Object.keys(object).forEach(key => {
        (object[key] === undefined || object[key] === null) && delete object[key]
    });
    return Object.entries(object).length === 0 && object.constructor === Object
}
