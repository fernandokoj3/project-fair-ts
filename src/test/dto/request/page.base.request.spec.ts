import { getPageableRequest } from "#/mocks";
import { PageableRequest, PageBaseRequest } from "@/dto/request/page.base.request";
import { FeiraLivre } from "@/entities/feira.livre";
import { validateObject } from "@/middlewares/schema.validation";
import { number } from "joi";


describe("page.base.request (...) ", () => {

    let subject: PageableRequest<FeiraLivre> = null;

    beforeEach(()=> {
        subject = getPageableRequest();
    })

    test("pageableRequest subject should be valid and instance base", async () => {
        expect(subject).not.toBeNull()
        expect(subject.entity).not.toBeNull()
        expect(subject.entity).toBeInstanceOf(FeiraLivre)
        expect(subject.limit).not.toBeNull()
        expect(subject.order).not.toBeNull()
        expect(subject.page).not.toBeNull()
        expect(subject.sort).not.toBeNull()
    })
})