import "reflect-metadata"
import { Expose, Type } from "class-transformer";
import { PageableOptions } from "../request/page.base.request";

export class PageMetaResponse {

    @Expose({ name: "page" })
    readonly page: number;
  
    @Expose({ name: "limit" })
    readonly limit: number;
  
    @Expose({ name: "totalItems" })
    readonly total_items: number;

    @Expose({ name: "totalItemsPage" })
    readonly total_items_page: number;
  
    @Expose({ name: "totalPages" })
    readonly total_pages: number;
  
    @Expose({ name: "hasPreviousPage"})
    readonly has_previous_page: boolean;
  
    @Expose({ name: "hasNextPage"})
    readonly has_next_page: boolean;

    @Expose({ name: "orderBy" })
    readonly order_by: string

    constructor(options: PageableOptions, totalItems: number, totalItemsPage: number){
        this.order_by = options.order + ' ' + options.sort 
        this.page = options.page + 1
        this.limit = options.limit
        this.total_items = totalItems;
        this.total_pages = Math.ceil(this.total_items / this.limit);
        this.total_items_page = totalItemsPage
        this.has_previous_page =  this.total_items_page === 0 ? false : this.page > 1;
        this.has_next_page = this.total_items_page === 0 ? false : this.page < this.total_pages;
    }

}

export class PageResponse<T> {

    @Type(() => PageMetaResponse)
    @Expose({ name: "meta" })
    readonly meta: PageMetaResponse

    @Expose({ name: "content"})
    readonly content: Array<T>

    constructor(content: Array<T>, meta: PageMetaResponse) {
        this.meta = meta
        this.content = content;
    }
}