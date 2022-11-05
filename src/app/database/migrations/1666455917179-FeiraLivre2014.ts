import {MigrationInterface, QueryRunner, Table, TableIndex, TableUnique} from "typeorm";

export class FeirasLivres20141666455917179 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createSchema('feiras', true);
        let table = new Table({
            name: 'feira_livre',
            schema: 'feiras',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'longitude',
                    type: 'bigint',
                    isNullable: false,
                },
                {
                    name: 'latitude',
                    type: 'bigint',
                    isNullable: false,
                },
                {
                    name: 'setor_censitario',
                    type: 'bigint',
                    isNullable: false,
                },
                {
                    name: 'area_de_ponderacao',
                    type: 'bigint',
                    isNullable: false,
                },
                {
                    name: 'cod_distrito',
                    type: 'integer',
                    isNullable: false,
                },
                {
                    name: 'distrito',
                    type: 'varchar(50)',
                    isNullable: false,
                },
                {
                    name: 'cod_subprefeitura',
                    type: 'integer',
                    isNullable: false,
                },
                {
                    name: 'subprefeitura',
                    type: 'varchar(50)',
                    isNullable: false,
                },
                {
                    name: 'regiao5',
                    type: 'varchar(10)',
                    isNullable: false,
                },
                {
                    name: 'regiao8',
                    type: 'varchar(10)',
                    isNullable: false,
                },
                {
                    name: 'nome_feira',
                    type: 'varchar(100)',
                    isNullable: false,
                },
                {
                    name: 'registro',
                    type: 'integer',
                    isNullable: false,
                },
                {
                    name: 'dig_registro',
                    type: 'smallint',
                    isNullable: false,
                },
                {
                    name: 'logradouro',
                    type: 'varchar(100)',
                    isNullable: false,
                },
                {
                    name: 'numero',
                    type: 'integer',
                    isNullable: true,
                },
                {
                    name: 'bairro',
                    type: 'varchar(100)',
                    isNullable: false,
                },
                {
                    name: 'referencia',
                    type: 'text',
                    isNullable: true,
                }
            ]

        })
        await queryRunner.createTable(table, true);
        await queryRunner.createIndex(
            table,
            new TableIndex({
                columnNames: ['nome_feira'],
            }),
        );
        await queryRunner.createIndex(
            table,
            new TableIndex({
                columnNames: ['registro'],
            }),
        );
        await queryRunner.createUniqueConstraint(table, 
            new TableUnique({ columnNames: [ 'longitude', 'latitude' ] })    
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(new Table({ 
            name: 'feiras_livres', 
            schema: 'feiras' 
        }), true );
        await queryRunner.dropSchema('feiras', true);
    }
}
