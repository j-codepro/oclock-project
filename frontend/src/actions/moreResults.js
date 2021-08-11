export const PAGINATION_RESET= 'PAGINATION_RESET';
export const SHOW_MORE_RESULTS= 'SHOW_MORE_RESULTS';

export const showMoreResults = () => ({
  type: SHOW_MORE_RESULTS,
});

export const paginationReset = () => ({
 type: PAGINATION_RESET,
});
