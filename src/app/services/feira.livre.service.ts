import { Service } from "typedi";
import  { FeiraLivreRepository } from "@/repository/feira.livre.repository";
import { FeiraLivreCreateRequest, FeiraLivreListRequest, FeiraLivreMergeRequest } from "@/dto/request/feira.livre.request";
import { FeiraLivre } from "@/entities/feira.livre";
import { plainToClass, plainToInstance } from "class-transformer";
import { log } from "@/utils/logUtils";
import { BadRequestException, CrudException, NotFoundException } from "@/models/error.types";
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
        try {
            let feira: FeiraLivre = plainToClass(FeiraLivre, feiraLivreRequest)
            let result = await this.repository.save(feira);
            return plainToInstance(FeiraLivreResponse, result);
        } catch (error) {
            log.error('Fail to save entity', error);
            throw new CrudException(400, error.message);
        }
    }

    public async merge(id: number, feiraLivreRequest: FeiraLivreMergeRequest) {
        try {
            if (isNotValid(feiraLivreRequest)) {
                throw Error("The request object shouldn't be null as a whole")
            }
            let feira = plainToClass(FeiraLivre, { ...feiraLivreRequest, id })
            await this.repository.save(feira);
            let result = await this.repository.findOne(id);
            return plainToInstance(FeiraLivreResponse, result);
        } catch (error) {
            log.error('Fail to merge entity', error);
            throw new CrudException(400, error.message);
        }
    }

    public async remove(id: number): Promise<void> {
        try {
           
            let entity = await this.repository.findOne(id);
            if (!entity) {
                throw new NotFoundException(404, `Entity with id ${id} not found`);
            }
            await this.repository.remove(entity)

        } catch (error) {
            log.error('Fail to delete entity', error);
            if (error instanceof NotFoundException) {
                throw error
            }
            throw new CrudException(400, error.message);
        }
    }

    public async restore(id: number): Promise<void> {
        try {
            let entity = await this.repository.findOne(id);
            if (entity) {
                throw new BadRequestException(400, `This entity with ${id} already been restored or not needed`);
            }

            await this.repository.restore(id)
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }
            throw new CrudException(400, error.message);
        }
    }
}