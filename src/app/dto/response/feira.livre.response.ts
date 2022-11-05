import { Exclude, Expose, Transform, Type } from "class-transformer";

export class FeiraLivreResponse {

    @Expose({ name: "id"})
    id: BigInt;

    @Expose({ name: "longitude"})
    longitude: BigInt;

    @Expose({ name: "latitude"})
    latitude: BigInt

    @Expose({ name: "setorCensitario"})
    setor_censitario: string

    @Expose({ name: "areaDePonderacao"})
    area_de_ponderacao: string

    @Expose({ name: "codDistrito"})
    cod_distrito: number

    @Expose({ name: "distrito"})
    distrito: string

    @Expose({ name: "codSubprefeitura"})
    cod_subprefeitura: number

    @Expose({ name: "subprefeitura"})
    sub_prefeitura: string

    @Expose({ name: "regiao5"})
    regiao5: string

    @Expose({ name: "regiao8"})
    regiao8: string

    @Expose({ name: "nomeFeira"})
    nome_feira: string

    @Transform( ( { obj } ) => {
        return obj.registro + '-' + obj.digRegistro
    })
    registro: number;
    
    @Exclude()
    digRegistro: number

    @Expose({ name: "logradouro"})
    logradouro: string

    @Expose({ name: "numero"})
    numero: number

    @Expose({ name: "bairro"})
    bairro: string

    @Expose({ name: "referencia"})
    referencia: string

}