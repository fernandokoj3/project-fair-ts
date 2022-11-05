import { Request, Response } from "express";
import { FeiraLivreService } from "@/services/feira.livre.service";
import { Controller, Delete, Get, Patch, Post, Put } from "@/utils/injectUtils";
import { getBodyValidator, getUrlParamValidator, getQueryValidator } from '@/middlewares/validation.handler';
import { FeiraLivreCreateRequest, FeiraLivreListRequest, FeiraLivreMergeRequest, FeiraRequestOneRequest } from "@/dto/request/feira.livre.request";

@Controller("/")
export class FeiraLivreController {

    constructor(
        private feiraLivreService: FeiraLivreService,
    ){}

    @Get("/", getQueryValidator(FeiraLivreListRequest))
    public async list(request: Request, response: Response): Promise<Response> {
        let result = await this.feiraLivreService.list(request?.query as unknown as FeiraLivreListRequest)
        return response.status(200).send(result);
    }

    @Get("/:id", getUrlParamValidator(FeiraRequestOneRequest))
    public async one(request: Request, response: Response): Promise<Response> {
        let { id } = request.params;
        let result = await this.feiraLivreService.one(Number(id))
        return response.status(200).send(result);
    }

    @Post("/", getBodyValidator(FeiraLivreCreateRequest))
    public async create(request: Request, response: Response): Promise<Response> {
        let result = await this.feiraLivreService.save(request.body as FeiraLivreCreateRequest)
        return response.status(201).send(result);
    }

    @Patch("/:id", getUrlParamValidator(FeiraRequestOneRequest), getBodyValidator(FeiraLivreMergeRequest))
    public async merge(request: Request, response: Response): Promise<Response> {
        let { id } = request.params;
        let feira = request.body as FeiraLivreMergeRequest
        let result = await this.feiraLivreService.merge(Number(id), feira)
        return response.status(200).send(result);
    }

    @Delete("/:id", getUrlParamValidator(FeiraRequestOneRequest))
    public async remove(request: Request, response: Response) {
        let { id } = request.params;
        await this.feiraLivreService.remove(Number(id))
        return response.status(200).send({ message: "Fair removed with successful" });
    }

    @Put("/:id", getUrlParamValidator(FeiraRequestOneRequest))
    public async restore(request: Request, response: Response) {
        let { id } = request.params;
        await this.feiraLivreService.restore(Number(id))
        return response.status(200).send({ message: "Fair restore with successful" });
    }
}
