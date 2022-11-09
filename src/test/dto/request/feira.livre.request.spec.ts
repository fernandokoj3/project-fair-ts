import { validateObject } from "@/middlewares/schema.validation";
import { getFeiraLivreCreateRequest, getFeiraLivreListRequest, getFeiraRequestOneRequest } from "#/mocks"
import { FeiraLivreCreateRequest, FeiraLivreListRequest, FeiraLivreMergeRequest, FeiraRequestOneRequest } from "@/dto/request/feira.livre.request";


describe("feira.livre.request (...)", () => {

    describe("FeiraLivreCreateRequest (...) ", () => {

        let subject: FeiraLivreCreateRequest = null;
    
        beforeEach(()=> {
            subject = getFeiraLivreCreateRequest();
        })
        
        test("feiraLivreCreateRequest subject should be valid", async () => {
            const { data, error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).toBeUndefined()
            expect(data).toBeInstanceOf(FeiraLivreCreateRequest)
            expect(data).toEqual(subject)
        })
    
        test("areaDePonderacao should be a bigint and be null or undefined", async () => {
            subject.areaDePonderacao = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "areaDePonderacao"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining([
                `${e.field} must be a BigInt`, 
                `${e.field} should not be null or undefined`
            ])))
        })
    
        test("bairro should be a string and be null or undefined", async () => {
            subject.bairro = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "bairro"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining([
                `${e.field} must be a string`, 
                `${e.field} should not be null or undefined`,
            ])))
        })
    
        test("codDistrito should be a string and must not be less than 1", async () => {
            subject.codDistrito = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "codDistrito"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining([
                `${e.field} must be an integer number`, 
                `${e.field} must not be less than 1`,
                `${e.field} should not be null or undefined`
            ]
            )))
        })
    
        test("codSubprefeitura should be a string and must not be less than 1", async () => {
            subject.codSubprefeitura = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "codSubprefeitura"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining([
                `${e.field} must be an integer number`, 
                `${e.field} must not be less than 1`,
                `${e.field} should not be null or undefined`, 
            ])))
        })
    
        test("digRegistro should be a string not be null or undefined and must be an integer number", async () => {
            subject.digRegistro = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "digRegistro"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} should not be null or undefined`, 
                    `${e.field} must not be greater than 9`,
                    `${e.field} must be an integer number`
                ]
            )))
        })
    
        test("distrito should be a string not be null or undefined and must be string", async () => {
            subject.distrito = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "distrito"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a string`, 
                    `${e.field} should not be null or undefined`
                ]
            )))
        })
    
        test("latitude should be null or undefined or be a BigInt", async () => {
            subject.latitude = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "latitude"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a BigInt`, 
                    `${e.field} should not be null or undefined`
                ]
            )))
        })
    
        test("logradouro should be null or undefined or must be a string", async () => {
            subject.logradouro = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "logradouro"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a string`, 
                    `${e.field} should not be null or undefined`
                ]
            )))
        })
    
        test("longitude should be null or undefined or be a BigInt", async () => {
            subject.longitude = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "longitude"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a BigInt`, 
                    `${e.field} should not be null or undefined`
                ]
            )))
        })
    
        test("nomeFeira should be null or undefined or must be a string", async () => {
            subject.nomeFeira = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "nomeFeira"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a string`, 
                    `${e.field} should not be null or undefined`
                ]
            )))
        })
    
        test("numero should be must be a number", async () => {
            subject.numero = "forced" as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "numero"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be an integer number`
                ]
            )))
        })
    
        test("referencia should be a string", async () => {
            subject.referencia = 1 as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "referencia"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a string`
                ]
            )))
        })
    
        test("regiao5 should null or undefined and is not a valid region and must be a string", async () => {
            subject.regiao5 = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "regiao5"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} '${subject.regiao5}' is not a valid region on leste|oeste|norte|sul|centro`,
                    `${e.field} should not be null or undefined`,
                    `${e.field} must be a string`
                ]
            )))
        })
    
        test("regiao8 should null or undefined and is not a valid region and must be a string", async () => {
            subject.regiao8 = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "regiao8"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} should not be null or undefined`,
                    `${e.field} must be a region with number`,
                    `${e.field} must be a string`
                ]
            )))
        })
    
        test("registro should be null or undefined and greater than 9999 and less than 1 and less than 1", async () => {
            subject.registro = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "registro"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must not be greater than 9999`,
                    `${e.field} must not be less than 1`,
                    `${e.field} must be an integer number`, 
                    `${e.field} should not be null or undefined`, 
                ]
            )))
        })
    
        test("setorCensitario should be a BigInt and null or undefined", async () => {
            subject.setorCensitario = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "setorCensitario"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a BigInt`, 
                    `${e.field} should not be null or undefined`
                ]
            )))
        })
    
        test("subprefeitura should be a string and null or undefined", async () => {
            subject.subprefeitura = null;
            const { error } = await validateObject(subject, FeiraLivreCreateRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "subprefeitura"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} should not be null or undefined`,
                    `${e.field} must be a string`
                ]
            )))
        })
    })
    
    describe("FeiraLivreListRequest (...) ", () => {
    
        let subject: FeiraLivreListRequest = null;
    
        beforeEach(()=> {
            subject = getFeiraLivreListRequest();
        })
        
        test("feiraLivreListRequest subject should be valid", async () => {
            const { data, error } = await validateObject(subject, FeiraLivreListRequest);
            expect(error).toBeUndefined()
            expect(data).toBeInstanceOf(FeiraLivreListRequest)
            expect(data).toEqual(subject)
        })
    
        test("FeiraLivreListRequest subject null object should be valid", async () => {
            subject = new FeiraLivreListRequest();
            const { data, error } = await validateObject(subject, FeiraLivreListRequest);
            expect(error).toBeUndefined()
            expect(data).toBeInstanceOf(FeiraLivreListRequest)
            expect(data).toEqual(subject)
        })

        test("limit should be less than 10", async () => {
            subject.limit = 1;
            const { error } = await validateObject(subject, FeiraLivreListRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "limit"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must not be less than 10`,
                ]
            )))
        })

        test("limit should be greater than 100", async () => {
            subject.limit = 101;
            const { error } = await validateObject(subject, FeiraLivreListRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "limit"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must not be greater than 100`,
                ]
            )))
        })


        test("sort should be one of the following values", async () => {
            subject.sort = "forced";
            const { error } = await validateObject(subject, FeiraLivreListRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "sort"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be one of the following values: ASC, DESC, asc, desc`,
                ]
            )))
        })


        
        test("order should be one of the following values", async () => {
            subject.order = "forced";
            const { error } = await validateObject(subject, FeiraLivreListRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "order"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} '${subject.order}' is not a valid order on id|logradouro|bairro`,
                ]
            )))
        })
    })

    
    describe("FeiraRequestOneRequest (...) ", () => {
    
        let subject: FeiraRequestOneRequest = null;
    
        beforeEach(()=> {
            subject = getFeiraRequestOneRequest();
        })

        test("feiraRequestOneRequest subject should be valid number as integer", async () => {
            const { data, error } = await validateObject(subject, FeiraRequestOneRequest);
            expect(error).toBeUndefined()
            expect(data).toBeInstanceOf(FeiraRequestOneRequest)
            expect(data).toEqual(subject)
        })

        test("feiraRequestOneRequest subject should be valid number as string", async () => {
            subject.id = String(subject.id)
            const { data, error } = await validateObject(subject, FeiraRequestOneRequest);
            expect(error).toBeUndefined()
            expect(data).toBeInstanceOf(FeiraRequestOneRequest)
            expect(data).toEqual(subject)
        })

        test("id should be valid number as string", async () => {
            subject.id = "forced"
            const { error } = await validateObject(subject, FeiraRequestOneRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "id"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a valid number`,
                ]
            )))
        })
    })

    








    describe("FeiraLivreMergeRequest (...) ", () => {

        let subject: FeiraLivreMergeRequest = null;
    
        beforeEach(()=> {
            subject = getFeiraLivreCreateRequest();
        })
        
        test("feiraLivreMergeRequest subject should be valid", async () => {
            const { data, error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).toBeUndefined()
            expect(data).toBeInstanceOf(FeiraLivreMergeRequest)
            expect(data).toEqual(subject)
        })

        
        test("feiraLivreMergeRequest subject null be valid", async () => {
            subject = new FeiraLivreMergeRequest()
            const { data, error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).toBeUndefined()
            expect(data).toBeInstanceOf(FeiraLivreMergeRequest)
            expect(data).toEqual(subject)
        })
    
        test("areaDePonderacao should be a bigint", async () => {
            subject.areaDePonderacao = "forced" as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "areaDePonderacao"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining([
                `${e.field} must be a BigInt`
            ])))
        })
    
        test("bairro should be a string", async () => {
            subject.bairro = 1 as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "bairro"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining([
                `${e.field} must be a string`
            ])))
        })
    
        test("codDistrito should be a string and must not be less than 1", async () => {
            subject.codDistrito = "forced" as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "codDistrito"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [`${e.field} must be an integer number`, `${e.field} must not be less than 1`]
            )))
        })
    
        test("codSubprefeitura should be a string and must not be less than 1", async () => {
            subject.codSubprefeitura = "forced" as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "codSubprefeitura"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [`${e.field} must be an integer number`, `${e.field} must not be less than 1`]
            )))
        })
    
        test("digRegistro should be a string not be null or undefined and must be an integer number", async () => {
            subject.digRegistro = "forced" as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "digRegistro"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must not be greater than 9`,
                    `${e.field} must be an integer number`
                ]
            )))
        })
    
        test("distrito should be string", async () => {
            subject.distrito = 1 as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "distrito"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a string`, 
                ]
            )))
        })
    
        test("latitude should be a BigInt", async () => {
            subject.latitude = "forced" as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "latitude"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a BigInt`, 
                ]
            )))
        })
    
        test("logradouro should be a string", async () => {
            subject.logradouro = 0 as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "logradouro"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a string`, 
                ]
            )))
        })
    
        test("longitude be a BigInt", async () => {
            subject.longitude = "forced" as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "longitude"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a BigInt`
                ]
            )))
        })
    
        test("nomeFeira should be a string", async () => {
            subject.nomeFeira = 0 as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "nomeFeira"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a string`
                ]
            )))
        })
    
        test("numero should be must be a number", async () => {
            subject.numero = "forced" as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "numero"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be an integer number`
                ]
            )))
        })
    
        test("referencia should be a string", async () => {
            subject.referencia = 1 as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "referencia"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a string`
                ]
            )))
        })
    
        test("regiao5 should null or undefined and is not a valid region and must be a string", async () => {
            subject.regiao5 = 1 as unknown as any;;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "regiao5"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} '${subject.regiao5}' is not a valid region on leste|oeste|norte|sul|centro`,
                    `${e.field} must be a string`
                ]
            )))
        })
    
        test("regiao8 should be not a valid region and must be a string", async () => {
            subject.regiao8 = "forced" as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "regiao8"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a region with number`,
                ]
            )))
        })
    
        test("registro should be greater than 9999 and less than 1 and less than 1 and an integer number", async () => {
            subject.registro = "forced" as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "registro"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must not be greater than 9999`,
                    `${e.field} must not be less than 1`,
                    `${e.field} must be an integer number`
                ]
            )))
        })
    
        test("setorCensitario should be a BigInt", async () => {
            subject.setorCensitario = "forced" as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "setorCensitario"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a BigInt`, 
                ]
            )))
        })
    
        test("subprefeitura should be a string", async () => {
            subject.subprefeitura = 1 as unknown as any;
            const { error } = await validateObject(subject, FeiraLivreMergeRequest);
            expect(error).not.toBeNull()
            expect(error).toHaveLength(1)
            expect(error).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "subprefeitura"
                    })
                ])
            )
            error.forEach(e => expect(e.messages).toEqual(expect.arrayContaining(
                [
                    `${e.field} must be a string`
                ]
            )))
        })
    })
})

