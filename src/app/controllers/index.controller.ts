import { Controller, Get } from "@/utils/injectUtils";
import { Request, Response } from "express";

@Controller("/")
export class IndexController {

    @Get("/health")
    public async health(request: Request, response: Response): Promise<Response> {
        return response.status(200).send({ message: "ok" })
    }

}
