import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';

export class CustomStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  primaryKeyName(tableOrName: string | Table, columnNames: string[]): string {
    let name = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    return `pk_${name.replace(/^.+\./, '')}_${columnNames.join('_')}`;
  }

  foreignKeyName(
    tableOrName: string | Table,
    _: string[],
    _referencedTablePath?: string,
    _referencedColumnNames?: string[],
  ): string {
    let name = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    return `fk_${name.replace(
      /^.+\./,
      '',
    )}_${_referencedTablePath}_${_referencedColumnNames?.join('_')}`;
  }

  indexName(
    tableOrName: string | Table,
    columnNames: string[],
    where?: string,
  ): string {
    let name = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    return `ix_${name.replace(/^.+\./, '')}_${columnNames.join('_')}`;
  }

  uniqueConstraintName(
    tableOrName: string | Table,
    columnNames: string[],
  ): string {
    const name = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    return `unique_${name.replace(/^.+\./, '')}_${columnNames.join('_')}`;
  }
}
