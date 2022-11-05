import { Expose, plainToInstance, Transform, Type } from "class-transformer";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { createReadStream } from 'fs'
import { parse } from "csv";
import { resolve } from "path";
import { FeiraLivre } from "../../entities/feira.livre";

export class FeiraLivreImport {
    
    @Expose({ name: '1' })
    longitude: string;

    @Expose({ name: '2' })
    latitude: string

    @Expose({ name: '3' })
    setorCensitario: string

    @Expose({ name: '4' })
    areaDePonderacao: string

    @Type(() => Number)
    @Expose({ name: '5' })
    codDistrito: number

    @Expose({ name: '6' })
    distrito: string

    @Type(() => Number)
    @Expose({ name: '7' })
    codSubprefeitura: string

    @Expose({ name: '8' })
    subprefeitura: string

    @Expose({ name: '9' })
    @Transform(({ value })  => value?.trim() )
    regiao5: string

    @Expose({ name: '10' })
    @Transform(({ value })  => value?.trim() )
    regiao8: string

    @Expose({ name: '11' })
    nomeFeira: string

    @Expose({ name: '12' })
    registro: string

    @Expose({ name: '13' })
    logradouro: string

    @Type(() => Number)
    @Transform(({ value })  => value || null)
    @Expose({ name: '14' })
    numero: number

    @Expose({ name: '15' })
    bairro: number

    @Expose({ name: '16' })
    referencia: string

    get registerWithoutDig() {
        return Number(('' + this.registro + '').replace(/\-(.+$)?/g, ''))
    }

    get registerDig() {
        return Number(('' + this.registro + '').replace(/^(.+\-)?/g, ''))
    }
}


export class CreateFeiras implements Seeder {

    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {

        let repository = dataSource.getRepository(FeiraLivre);
        let file = resolve(__dirname, '../../../../DEINFO_AB_FEIRASLIVRES_2014.csv')
        let rows = await this.process(file)
        await repository.createQueryBuilder().insert().into(FeiraLivre).values(rows).orIgnore('("longitude", "latitude") DO NOTHING').execute()
    }


    private async process(file: string) {
        return new Promise<FeiraLivre[]>((resolve, reject) => {
            let rows: FeiraLivre[] = [];
            createReadStream(file)
            .pipe(parse({delimiter: ',', fromLine: 2}))
            .on('data', async (row) =>{
                let feiraRequest = plainToInstance(FeiraLivreImport, Object.assign({}, row));
                let ent: FeiraLivre = Object.assign({}, feiraRequest as any as FeiraLivre)
                ent.registro = feiraRequest.registerWithoutDig
                ent.numero = feiraRequest.numero
                ent.digRegistro = feiraRequest.registerDig
                rows = [...rows, ent]
            }).on('close', () => {
                resolve(rows)
            }).on('error', (err) => {
                reject(err)
            })
        })
    }
}