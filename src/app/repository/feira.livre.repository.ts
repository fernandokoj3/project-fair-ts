import { Service } from "typedi";
import { Repository} from "typeorm";
import { FeiraLivre } from "@/entities/feira.livre";
import { InjectRepository } from "typeorm-typedi-extensions";
import { PageableRequest } from "@/dto/request/page.base.request";

@Service()
export class FeiraLivreRepository {
    constructor(@InjectRepository(FeiraLivre) private repository: Repository<FeiraLivre>){}

    public async find(pageable: PageableRequest<FeiraLivre> ) {
        let options = {
            ...pageable.order && pageable.sort && {order: { [pageable.order]: {
                direction: pageable.sort
            }}},
            ...pageable.page && pageable.limit && { skip: pageable.page * pageable.limit}, 
            ...pageable.limit && { take: pageable.limit }, 
            ...pageable.entity && { where: pageable.entity }, 
        }
        let total = await this.repository.count(options)
        let result = await this.repository.find(options)
        return { result , total }
    }

    public async findOne(id: number) {
        return await this.repository.findOne({ where: { id: id } })
    }

    public async save(feiraLivre: FeiraLivre) {
        return await this.repository.save(feiraLivre)
    }
}
