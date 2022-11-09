import { FeiraLivreCreateRequest, FeiraLivreListRequest, FeiraLivreListOrder, FeiraRequestOneRequest, FeiraLivreMergeRequest } from "@/dto/request/feira.livre.request";
import { PageableRequest, PageBaseRequest } from "@/dto/request/page.base.request";
import { FeiraLivreResponse } from "@/dto/response/feira.livre.response";
import { FeiraLivre } from "@/entities/feira.livre";
import { Region } from "@/models/region";
import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";

const randomEnum = ( $enum: any ) => {
    let values = Object.keys($enum);
    let key = values[Math.floor(Math.random() * values.length)];
    return $enum[key];
}

export const getFeiraLivreCreateRequest = () : FeiraLivreCreateRequest => {
    return {
        areaDePonderacao: faker.datatype.bigInt({ min: -99999999999, max: 99999999999 }),
        bairro: faker.address.street(),
        codDistrito: faker.datatype.number({ min: 1, max: 9999 }),
        codSubprefeitura: faker.datatype.number({ min: 1, max: 9999 }),
        digRegistro: faker.datatype.number({ min: 1, max: 9 }),
        distrito: faker.address.street(),
        latitude: faker.datatype.bigInt({ min: -99999999999, max: 99999999999 }),
        logradouro: faker.address.streetAddress(false),
        longitude: faker.datatype.bigInt({ min: -99999999999, max: 99999999999 }),
        nomeFeira: faker.name.lastName() as unknown as any,
        numero: faker.datatype.number({ min: 1, max: 9999 }),
        referencia: faker.name.jobArea(),
        regiao5: randomEnum(Region),
        regiao8: randomEnum(Region) + ' ' + 1,
        registro: faker.datatype.number({ min: 1, max: 9999 }),
        setorCensitario: faker.datatype.bigInt({ min: -99999999999, max: 99999999999 }),
        subprefeitura: faker.address.streetAddress(true)
    }
}


export const getFeiraLivreListRequest = () : FeiraLivreListRequest => {
    let request = getFeiraLivreCreateRequest()
    return {
        ...request,
        limit: faker.datatype.number({ min: 10, max: 100 }),
        order: randomEnum(FeiraLivreListOrder),
        page: faker.datatype.number({ min: 1, max: 9999 }),
        sort: randomEnum(["ASC", "DESC", "asc", "desc"])
    } as FeiraLivreListRequest
}

export const getFeiraRequestOneRequest = () : FeiraRequestOneRequest => {
    return {
        id: faker.datatype.number({ min: 1, max: 999999 }),
    } as FeiraRequestOneRequest
}

export const getFeiraLivreMergeRequest = () : FeiraLivreMergeRequest => {
    let request = getFeiraLivreCreateRequest();
    return {
        ...request,
    } as FeiraLivreMergeRequest
}

export const getPageableRequest = (): PageableRequest<FeiraLivre> => {
    let feiraLivre = getFeiraLivreListRequest();
    return PageBaseRequest.get(feiraLivre , FeiraLivre);
}

export const getFeiraLivreEntity = () => {
    let entity = getFeiraLivreCreateRequest();
    return { 
        ...getFeiraLivreCreateRequest(), 
        id: faker.datatype.number({ max: 99999 }), 
        longitude: entity.longitude.toString(), 
        latitude: entity.latitude.toString(), 
        setorCensitario: entity.setorCensitario.toString(), 
        areaDePonderacao: entity.areaDePonderacao.toString()
    } as FeiraLivre;
}

export const getFeiraLivreList = () => {
    let result = [
        getFeiraLivreEntity(),
        getFeiraLivreEntity(),
        getFeiraLivreEntity(),
        getFeiraLivreEntity(),
        getFeiraLivreEntity(),
    ]
    return {
        total: result.length,
        result
    }
}

export const getFeiraLivreResponse = () => {
    return plainToInstance(FeiraLivreResponse, getFeiraLivreEntity());
}
