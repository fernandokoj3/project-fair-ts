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
        log.info('Start list(...)')
        let pageable = FeiraLivreListRequest.get(feiraLivreList, FeiraLivre)

        log.info('Find by pegeable request', pageable)
        let { result, total } = await this.repository.find(pageable);
        let meta = new PageMetaResponse(pageable, total, result.length);
        let content = plainToInstance(FeiraLivreResponse, result);

        log.info('Create pageable response')
        return new PageResponse(content, meta);
    }

    public async one(id: number) {
        log.info('Start one(...)', id)
        let result = await this.repository.findOne(id)
        if (!result) {
            throw new NotFoundException(404, `register ${id} not found`);
        }

        log.info('Create one response')
        return plainToInstance(FeiraLivreResponse, result);
    }

    public async save(feiraLivreRequest: FeiraLivreCreateRequest) {
        log.info('Start create(...)')
        let feira: FeiraLivre = plainToClass(FeiraLivre, feiraLivreRequest)

        log.info('Persist with', feira )
        let result = await this.repository.save(feira);
        return plainToInstance(FeiraLivreResponse, result);
    }

    public async merge(id: number, feiraLivreRequest: FeiraLivreMergeRequest) {
        log.info('Start merge(...) and validate empty request')
        if (isNotValid(feiraLivreRequest)) {
            throw new CrudException(400, "The request object shouldn't be null as a whole");
        }
        log.info('Find existes entity', id)
        let exists = await this.repository.findOne(id);
        if (!exists) {
            throw new NotFoundException(404, `Entity with id ${id} not found`);
        }
        let feira = plainToClass(FeiraLivre, { ...feiraLivreRequest, id })

        log.info('Persist entity', feira)
        let persisted = await this.repository.save(feira);
        return plainToInstance(FeiraLivreResponse, { ...exists, ...persisted });
    }

    public async remove(id: number): Promise<void> {
        log.info('Start remove(...)', id)
        let entity = await this.repository.findOne(id);
        if (!entity) {
            throw new NotFoundException(404, `Entity with id ${id} not found`);
        }
        await this.repository.remove(entity)
    }

    public async restore(id: number): Promise<void> {
        log.info('Start restore(...)', id)
        let entity = await this.repository.findOne(id);
        if (entity) {
            throw new BadRequestException(400, `This entity with ${id} already been restored or not needed`);
        }
        await this.repository.restore(id)
    }
}