import { IsDefined, IsEnum, IsInt, IsNumberString, IsOptional, IsString, Matches, Max, Min } from "class-validator";
import { IsBigInt, IsRegionNumber, IsValidNumber } from "@/middlewares/custom.validation";
import { Expose, Transform } from "class-transformer"
import { Region } from "@/models/region";
import { PageBaseRequest, Sortable } from "./page.base.request";
import { fixProperty } from "@/utils/objectUtils";



export class FeiraLivreCreateRequest {
    
    @IsDefined()
    @IsBigInt()
    longitude: BigInt;

    @IsDefined()
    @IsBigInt()
    latitude: BigInt

    @IsDefined()
    @IsBigInt()
    @Expose({ name: "setor_censitario"})
    @Transform((fixProperty))
    setorCensitario: BigInt

    @IsDefined()
    @IsBigInt()
    @Expose({ name: "area_de_ponderacao"})
    @Transform((fixProperty))
    areaDePonderacao: BigInt

    @IsDefined()
    @IsInt()
    @Min(1)
    @Transform((fixProperty))
    @Expose({ name: "cod_distrito"})
    codDistrito: number

    @IsDefined()
    @IsString()
    distrito: string

    @IsDefined()
    @IsInt()
    @Min(1)
    @Transform((fixProperty))
    @Expose({ name: "cod_subprefeitura"})
    codSubprefeitura: number

    @IsDefined()
    @IsString()
    subprefeitura: string

    @IsDefined()
    @IsString()
    @Matches(`^${Object.values(Region).join('|')}$`, 'i', {
        message: ({ value, property }) => {
            return `${property} '${value}' is not a valid region on ${Object.values(Region).join('|')}`
        }
    })
    regiao5: string

    @IsDefined()
    @IsString()
    @IsRegionNumber()
    regiao8: string

    @IsDefined()
    @IsString()
    @Transform((fixProperty))
    @Expose({ name: "nome_feira"})
    nomeFeira: string

    @IsDefined()
    @IsInt()
    @Min(1)
    @Max(9999)
    registro: number

    @IsDefined()
    @IsInt()
    @Max(9)
    @Transform((fixProperty))
    @Expose({ name: "dig_registro"})
    digRegistro: number

    @IsDefined()
    @IsString()
    logradouro: string

    @IsOptional()
    @IsInt()
    numero: number

    @IsDefined()
    @IsString()
    bairro: string

    @IsOptional()
    @IsString()
    referencia: string
}

export enum FeiraLivreListOrder {
    ID = 'id',
    ADDRESS = 'logradouro',
    DISTRICT = 'bairro'
}

export class FeiraLivreListRequest extends PageBaseRequest implements Sortable {

    @IsOptional()
    @IsString()
    @IsEnum(FeiraLivreListOrder, {
        message: ({ value, property }) => {
            return `${property} '${value}' is not a valid order on ${Object.values(FeiraLivreListOrder).join('|')}`
        }
    })
    order: string = FeiraLivreListOrder.ID;

    @IsOptional()
    @IsBigInt()
    longitude: BigInt;

    @IsOptional()
    @IsBigInt()
    latitude: BigInt

    @IsOptional()
    @IsBigInt()
    @Expose({ name: "setor_censitario"})
    @Transform((fixProperty))
    setorCensitario: BigInt

    @IsOptional()
    @IsBigInt()
    @Expose({ name: "area_de_ponderacao"})
    @Transform((fixProperty))
    areaDePonderacao: BigInt

    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform((fixProperty))
    @Expose({ name: "cod_distrito"})
    codDistrito: number

    @IsOptional()
    @IsString()
    distrito: string

    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform((fixProperty))
    @Expose({ name: "cod_subprefeitura"})
    codSubprefeitura: number

    @IsOptional()
    @IsString()
    subprefeitura: string

    @IsOptional()
    @IsString()
    @Matches(`^${Object.values(Region).join('|')}$`, 'i', {
        message: ({ value, property }) => {
            return `${property} '${value}' is not a valid region on ${Object.values(Region).join('|')}`
        }
    })
    regiao5: string

    @IsOptional()
    @IsString()
    @IsRegionNumber()
    regiao8: string

    @IsOptional()
    @IsString()
    @Transform((fixProperty))
    @Expose({ name: "nome_feira"})
    nomeFeira: string

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(9999)
    registro: number

    @IsOptional()
    @IsInt()
    @Max(9)
    @Transform((fixProperty))
    @Expose({ name: "dig_registro"})
    digRegistro: number

    @IsOptional()
    @IsString()
    logradouro: string

    @IsOptional()
    @IsInt()
    numero: number

    @IsOptional()
    @IsString()
    bairro: string

    @IsOptional()
    @IsString()
    referencia: string
}

export class FeiraRequestOneRequest {
    @IsValidNumber()
    id: number | string
}

export class FeiraLivreMergeRequest {

    @IsOptional()
    @IsBigInt()
    longitude: BigInt;

    @IsOptional()
    @IsBigInt()
    latitude: BigInt

    @IsOptional()
    @IsBigInt()
    @Expose({ name: "setor_censitario"})
    @Transform((fixProperty))
    setorCensitario: BigInt

    @IsOptional()
    @IsBigInt()
    @Expose({ name: "area_de_ponderacao"})
    @Transform((fixProperty))
    areaDePonderacao: BigInt

    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform((fixProperty))
    @Expose({ name: "cod_distrito"})
    codDistrito: number

    @IsOptional()
    @IsString()
    distrito: string

    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform((fixProperty))
    @Expose({ name: "cod_subprefeitura"})
    codSubprefeitura: number

    @IsOptional()
    @IsString()
    subprefeitura: string

    @IsOptional()
    @IsString()
    @Matches(`^${Object.values(Region).join('|')}$`, 'i', {
        message: ({ value, property }) => {
            return `${property} '${value}' is not a valid region on ${Object.values(Region).join('|')}`
        }
    })
    regiao5: string

    @IsOptional()
    @IsString()
    @IsRegionNumber()
    regiao8: string

    @IsOptional()
    @IsString()
    @Transform((fixProperty))
    @Expose({ name: "nome_feira"})
    nomeFeira: string

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(9999)
    registro: number

    @IsOptional()
    @IsInt()
    @Max(9)
    @Transform((fixProperty))
    @Expose({ name: "dig_registro"})
    digRegistro: number

    @IsOptional()
    @IsString()
    logradouro: string

    @IsOptional()
    @IsInt()
    numero: number

    @IsOptional()
    @IsString()
    bairro: string

    @IsOptional()
    @IsString()
    referencia: string
}