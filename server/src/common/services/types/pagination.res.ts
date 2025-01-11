export abstract class PaginationRes<T> {
    total: number;
    totalPages: number;
    currentPage: number;

    constructor(total: number, totalPages: number, currentPage: number ) {
        this.total = total;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }
}