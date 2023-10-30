export interface PaginatedResult<T> {
    data: T[]
    recordsTotal: number
    recordsFiltered: number
    currentPage: number
    pageLength: number
  }
export type PaginateOptions = { page?: number | string, perPage?: number | string }
export type PaginateFunction = <T, K>(model: any, args?: K, options?: PaginateOptions) => Promise<PaginatedResult<T>>