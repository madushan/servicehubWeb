export class PagingResult<T>{
    state:boolean;
    totalItem:number;
    totalPage:number;
    pageSize:number;
    currentPage:number;
    data:T[]

}