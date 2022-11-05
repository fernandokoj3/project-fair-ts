import { IsEnum, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, Matches, Max, Min, NotEquals } from "class-validator";
import { IsBigInt, IsRegionNumber } from "@/models/custom.validation";
import { Expose } from "class-transformer"
import { Region } from "@/models/region";
import { PageBaseRequest, Sortable } from "./page.base.request";

export class FeiraLivreCreateRequest {
    
    @IsNotEmpty()
    @IsBigInt()
    longitude: BigInt;

    @IsNotEmpty()
    @IsBigInt()
    latitude: BigInt

    @Expose({ name: "setor_censitario"})
    @IsNotEmpty()
    @IsBigInt()
    setorCensitario: BigInt

    @IsNotEmpty()
    @IsBigInt()
    @Expose({ name: "area_de_ponderacao"})
    areaDePonderacao: BigInt

    @NotEquals(null)
    @IsInt()
    @Min(1)
    @Expose({ name: "cod_distrito"})
    codDistrito: number

    @IsString()
    @IsNotEmpty()
    distrito: string

    @NotEquals(null)
    @IsInt()
    @Min(1)
    @Expose({ name: "cod_subprefeitura"})
    codSubprefeitura: number

    @IsString()
    @IsNotEmpty()
    subprefeitura: string

    @IsString()
    @IsNotEmpty()
    @Matches(`^${Object.values(Region).join('|')}$`, 'i', {
        message: ({ value }) => 
        `${value} is not a valid region on ${Object.values(Region).join('|')}`,
    })
    regiao5: string

    @IsNotEmpty()
    @IsRegionNumber()
    regiao8: string

    @IsNotEmpty()
    @Expose({ name: "nome_feira"})
    nomeFeira: string

    @NotEquals(null)
    @IsInt()
    @Min(1)
    @Max(9999)
    registro: number

    @Max(9)
    @Expose({ name: "dig_registro"})
    digRegistro: number

    @IsString()
    @IsNotEmpty()
    logradouro: string

    @IsInt()
    numero: number

    @IsNotEmpty()
    @IsString()
    bairro: string

    @IsString()
    referencia: string
}

enum FeiraLivreListSort {
    ID = 'id',
    ADDRESS = 'logradouro',
    DISTRICT = 'bairro'
}

export class FeiraLivreListRequest extends PageBaseRequest implements Sortable {

    @IsOptional()
    @IsString()
    @IsEnum(FeiraLivreListSort)
    order: string = FeiraLivreListSort.ID;

    @IsOptional()
    @IsBigInt()
    @Expose()
    longitude: BigInt;

    @IsOptional()
    @IsBigInt()
    @Expose()
    latitude: BigInt

    @IsOptional()
    @Expose({ name: "setor_censitario"})
    @IsBigInt()
    @Expose()
    setorCensitario: BigInt

    @IsOptional()
    @IsBigInt()
    @Expose({ name: "area_de_ponderacao"})
    areaDePonderacao: BigInt

    @IsOptional()
    @IsInt()
    @Min(1)
    @Expose({ name: "cod_distrito"})
    codDistrito: number

    @IsOptional()
    @IsString()
    @Expose()
    distrito: string

    @IsOptional()
    @IsInt()
    @Min(1)
    @Expose({ name: "cod_subprefeitura"})
    codSubprefeitura: number

    @IsOptional()
    @IsString()
    @Expose()
    subprefeitura: string

    @IsOptional()
    @IsString()
    @Matches(`^${Object.values(Region).join('|')}$`, 'i', {
        message: ({ value }) => 
        `${value} is not a valid region on ${Object.values(Region).join('|')}`,
    })
    @Expose()
    regiao5: string

    @IsOptional()
    @IsRegionNumber()
    regiao8: string

    @IsOptional()
    @IsNotEmpty()
    @Expose({ name: "nome_feira"})
    nomeFeira: string

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(9999)
    @Expose()
    registro: number

    @IsOptional()
    @Max(9)
    @Expose({ name: "dig_registro"})
    digRegistro: number

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Expose()
    logradouro: string

    @IsOptional()
    @IsInt()
    @Expose()
    numero: number

    @IsOptional()
    @IsString()
    @Expose()
    bairro: string

    @IsOptional()
    @IsString()
    @Expose()
    referencia: string
}

export class FeiraRequestOneRequest {
    @IsNumberString()
    id: number
}

export class FeiraLivreMergeRequest {
    
    @IsOptional()
    @IsBigInt()
    @Expose()
    longitude?: BigInt;

    @IsOptional()
    @IsBigInt()
    @Expose()
    latitude: BigInt

    @IsOptional()
    @Expose({ name: "setor_censitario"})
    @IsBigInt()
    @Expose()
    setorCensitario: BigInt

    @IsOptional()
    @IsBigInt()
    @Expose({ name: "area_de_ponderacao"})
    areaDePonderacao: BigInt

    @IsOptional()
    @IsInt()
    @Min(1)
    @Expose({ name: "cod_distrito"})
    codDistrito: number

    @IsOptional()
    @IsString()
    @Expose()
    distrito: string

    @IsOptional()
    @IsInt()
    @Min(1)
    @Expose({ name: "cod_subprefeitura"})
    codSubprefeitura: number

    @IsOptional()
    @IsString()
    @Expose()
    subprefeitura: string

    @IsOptional()
    @IsString()
    @Matches(`^${Object.values(Region).join('|')}$`, 'i', {
        message: ({ value }) => 
        `${value} is not a valid region on ${Object.values(Region).join('|')}`,
    })
    @IsNotEmpty()
    @Expose()
    regiao5: string

    @IsOptional()
    @IsNotEmpty()
    @IsRegionNumber()
    regiao8: string

    @IsOptional()
    @IsNotEmpty()
    @Expose({ name: "nome_feira"})
    nomeFeira: string

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(9999)
    @Expose()
    registro: number

    @IsOptional()
    @Max(9)
    @Expose({ name: "dig_registro"})
    digRegistro: number

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Expose()
    logradouro: string

    @IsOptional()
    @IsInt()
    @Expose()
    numero: number

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Expose()
    bairro: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Expose()
    referencia: string
}