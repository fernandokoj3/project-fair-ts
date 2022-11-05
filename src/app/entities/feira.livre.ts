import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'feira_livre', schema: 'feiras' })
export class FeiraLivre {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'longitude', type: 'bigint'})
    longitude: string

    @Column({ name: 'latitude', type: 'bigint'})
    latitude: string

    @Column({ name: 'setor_censitario', type: "bigint"})
    setorCensitario: string

    @Column({ name: 'area_de_ponderacao', type: "bigint"})
    areaDePonderacao: string

    @Column({ name: 'cod_distrito'})
    codDistrito: number

    @Column({ name: 'distrito'})
    distrito: string

    @Column({ name: 'cod_subprefeitura'})
    codSubprefeitura: number

    @Column({ name: 'subprefeitura'})
    subprefeitura: string

    @Column({ name: 'regiao5'})
    regiao5: string

    @Column({ name: 'regiao8'})
    regiao8: string

    @Column({ name: 'nome_feira'})
    nomeFeira: string

    @Column({ name: 'registro'})
    registro: number

    @Column({ name: 'dig_registro'})
    digRegistro: number

    @Column({ name: 'logradouro'})
    logradouro: string

    @Column({ name: 'numero'})
    numero: number

    @Column({ name: 'bairro'})
    bairro: string

    @Column({ name: 'referencia'})
    referencia: string

}