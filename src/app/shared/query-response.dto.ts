export interface QueryResponseDTO<T> {
  data: T[];
  success: boolean;
  totalCount?: number;
}
