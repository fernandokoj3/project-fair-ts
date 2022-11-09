import { Service } from "typedi";
import  { FeiraLivreRepository } from "@/repository/feira.livre.repository";
import { FeiraLivreCreateRequest, FeiraLivreListRequest, FeiraLivreMergeRequest } from "@/dto/request/feira.livre.request";
import { FeiraLivre } from "@/entities/feira.livre";
import { plainToClass, plainToInstance } from "class-transformer";
import { log } from "@/utils/logUtils";
import { BadRequestException, CrudException, GenericException, NotFoundException } from "@/models/error.types";
import { PageResponse, PageMetaResponse } from "@/dto/response/page.base.response";
import { FeiraLivreResponse } from "@/dto/response/feira.livre.response";
import { isNotValid } from "@/utils/objectUtils";

@Service()
export class FeiraLivreService {

    constructor(
        private repository: FeiraLivreRepository
    ){}

    public async list(feiraLivreList: FeiraLivreListRequest){
        let pageable = FeiraLivreListRequest.get(feiraLivreList, FeiraLivre)
        let { result, total } = await this.repository.find(pageable);

        let meta = new PageMetaResponse(pageable, total, result.length);
        let content = plainToInstance(FeiraLivreResponse, result);
        let response = new PageResponse(content, meta);
        return response;
    }

    public async one(id: number) {
        let result = await this.repository.findOne(id)
        if (!result) {
            throw new NotFoundException(404, `register ${id} not found`);
        }
        return plainToInstance(FeiraLivreResponse, result);
    }

    public async save(feiraLivreRequest: FeiraLivreCreateRequest) {
        let feira: FeiraLivre = plainToClass(FeiraLivre, feiraLivreRequest)
        let result = await this.repository.save(feira);
        return plainToInstance(FeiraLivreResponse, result);
    }

    public async merge(id: number, feiraLivreRequest: FeiraLivreMergeRequest) {
        if (isNotValid(feiraLivreRequest)) {
            throw new CrudException(400, "The request object shouldn't be null as a whole");
        }
        let exists = await this.repository.findOne(id);
        if (!exists) {
            throw new NotFoundException(404, `Entity with id ${id} not found`);
        }
        let feira = plainToClass(FeiraLivre, { ...feiraLivreRequest, id })
        let persisted = await this.repository.save(feira);
        return plainToInstance(FeiraLivreResponse, { ...exists, ...persisted });
    }

    public async remove(id: number): Promise<void> {
        let entity = await this.repository.findOne(id);
        if (!entity) {
            throw new NotFoundException(404, `Entity with id ${id} not found`);
        }
        await this.repository.remove(entity)
    }

    public async restore(id: number): Promise<void> {
        let entity = await this.repository.findOne(id);
        if (entity) {
            throw new BadRequestException(400, `This entity with ${id} already been restored or not needed`);
        }
        await this.repository.restore(id)
    }
}