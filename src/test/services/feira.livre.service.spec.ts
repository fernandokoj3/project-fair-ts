import { getFeiraLivreCreateRequest, getFeiraLivreList, getFeiraLivreListRequest, getFeiraLivreMergeRequest } from "#/mocks"
import { FeiraLivreMergeRequest } from "@/dto/request/feira.livre.request";
import { FeiraLivreResponse } from "@/dto/response/feira.livre.response";
import { FeiraLivre } from "@/entities/feira.livre";
import { BadRequestException, CrudException, NotFoundException } from "@/models/error.types";
import { FeiraLivreRepository } from "@/repository/feira.livre.repository"
import { FeiraLivreService } from "@/services/feira.livre.service"
import { faker } from "@faker-js/faker";
import { plainToClass } from "class-transformer";

describe("feira.livre.service (...)", () => {
    let feiraLivreRepository: Partial<FeiraLivreRepository> = {};
    let feiraLivreListRequest = null;
    let feiraLivreMergeRequest = null;
    let feiraLivreCreateRequest = null;

    let subject: FeiraLivreService = new FeiraLivreService(
        feiraLivreRepository as unknown as any
    )
    
    beforeEach(async () => {
        feiraLivreListRequest = getFeiraLivreListRequest();
        feiraLivreMergeRequest = getFeiraLivreMergeRequest();
        feiraLivreCreateRequest = getFeiraLivreCreateRequest();
    })

    describe("list (...)", () => {
        test("list should be not null", async () => {

            feiraLivreRepository.find = jest.fn(async () => {
                return getFeiraLivreList();
            });

            let result = await subject.list(feiraLivreListRequest);
            expect(result).not.toBeNull();
            expect(result.meta).not.toBeNull();
            expect(result.meta.has_next_page).not.toBeNull();
            expect(result.meta.has_previous_page).not.toBeNull();
            expect(result.meta.limit).not.toBeNull();
            expect(result.meta.order_by).not.toBeNull();
            expect(result.meta.page).not.toBeNull();
            expect(result.meta.total_items).not.toBeNull();
            expect(result.meta.total_items_page).not.toBeNull();
            expect(result.meta.total_pages).not.toBeNull();
            expect(result.content).not.toBeNull();
            expect(result.content.length).toBeGreaterThan(1)
        })

        test("list with no result should be not null", async () => {

            feiraLivreRepository.find = jest.fn(async () => {
                return { total: 0, result: [] }
            });

            let result = await subject.list(feiraLivreListRequest);
            expect(result).not.toBeNull();
            expect(result.meta).not.toBeNull();
            expect(result.meta.has_next_page).toEqual(false);
            expect(result.meta.has_previous_page).toEqual(false);
            expect(result.meta.limit).not.toBeNull();
            expect(result.meta.order_by).not.toBeNull();
            expect(result.meta.page).not.toBeNull();
            expect(result.meta.total_items).toEqual(0);
            expect(result.meta.total_items_page).toEqual(0);
            expect(result.meta.total_pages).toEqual(0);
            expect(result.content).not.toBeNull();
            expect(result.content.length).toEqual(0)
        })
    })

    describe("merge (...)", () => {
        test("merge should be not null ", async () => {
            let feiraLivre = { 
                ...feiraLivreMergeRequest,
                id: faker.datatype.number()
             } as FeiraLivre

            feiraLivreRepository.save = jest.fn(async () => {
                return feiraLivre;
            });

            feiraLivreRepository.findOne = jest.fn(async () => {
                return feiraLivre;
            });

            let result = await subject.merge(feiraLivre.id, feiraLivreMergeRequest);
            expect(result).not.toBeNull()
            expect(result).toEqual(plainToClass(FeiraLivreResponse, feiraLivre));
        })

        test("merge should throw error when entity not found", async () => {
            let feiraLivre = { 
                ...feiraLivreMergeRequest,
                id: faker.datatype.number()
             } as FeiraLivre

            feiraLivreRepository.findOne = jest.fn(async () => {
                return null;
            });
            expect(async () => {
                await subject.merge(feiraLivre.id, feiraLivreMergeRequest);
            }).rejects.toThrow(NotFoundException);
        })

        test("merge should throw error when request is empty", async () => {
            let feiraLivre = { 
                ...feiraLivreMergeRequest,
                id: faker.datatype.number()
             } as FeiraLivre

            expect(async () => {
                await subject.merge(feiraLivre.id, new FeiraLivreMergeRequest());
            }).rejects.toThrow(CrudException);
        })
    })

    describe("one (...)", () => {
        test("one should be not null", async () => {
            let id = faker.datatype.number();
            let feiraLivre = feiraLivreCreateRequest as FeiraLivre;

            feiraLivreRepository.findOne = jest.fn(async () => {
                return feiraLivre;
            });

            let result = await subject.one(id);
            expect(result).not.toBeNull()
            expect(result).toEqual(plainToClass(FeiraLivreResponse, feiraLivre));
        })

        test("one should throw error when entity not found", async () => {
            let id = faker.datatype.number();

            feiraLivreRepository.findOne = jest.fn(async () => {
                return null;
            });

            expect(async () => {
                await subject.one(id);
            }).rejects.toThrow(NotFoundException);
        })
    })

    describe("remove (...)", () => {
        test("remove should be not null", async () => {
            let id = faker.datatype.number();
            let feiraLivre = feiraLivreCreateRequest as FeiraLivre;

            feiraLivreRepository.findOne = jest.fn(async () => {
                return feiraLivre;
            });

            feiraLivreRepository.remove = jest.fn(async () => {
                return feiraLivre;
            });

            await subject.remove(id);
            expect(feiraLivreRepository.remove).toBeCalledTimes(1);
        })

        test("remove should throw error when entity not found", async () => {
            let id = faker.datatype.number();

            feiraLivreRepository.findOne = jest.fn(async () => {
                return null;
            });

            expect(async () => {
                await subject.one(id);
            }).rejects.toThrow(NotFoundException);
        })

    })

    describe("restore (...)", () => {
        test("restore should be not null", async () => {
            let id = faker.datatype.number();

            feiraLivreRepository.findOne = jest.fn(async () => {
                return null;
            });

            feiraLivreRepository.restore = jest.fn(async () => {
                return { 
                    raw: null,
                    affected: null,
                    generatedMaps: null
                 };
            });

            await subject.restore(id);
            expect(feiraLivreRepository.restore).toBeCalledTimes(1);
        })

        test("restore should throw error when entity not found", async () => {
            let id = faker.datatype.number();
            let feiraLivre = feiraLivreCreateRequest as FeiraLivre;

            feiraLivreRepository.findOne = jest.fn(async () => {
                return feiraLivre;
            });

            expect(async () => {
                await subject.restore(id);
            }).rejects.toThrow(BadRequestException);
        })
    })


    describe("save (...)", () => {
        test("save should be not null", async () => {
            let feiraLivre = { 
                ...feiraLivreCreateRequest,
                id: faker.datatype.number()
             } as FeiraLivre

            feiraLivreRepository.save = jest.fn(async () => {
                return feiraLivre;
            });

            let result = await subject.save(feiraLivreCreateRequest);
            expect(result).not.toBeNull();
            expect(result).toEqual(plainToClass(FeiraLivreResponse, feiraLivre));
        })
    })
})