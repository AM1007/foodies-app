const getPaginationMetadata = ({ page = 1, limit = 30, count = 0 }) => {
  const currentPage = Number(page);
  const perPage = Number(limit);

  const totalPages = Math.ceil(count / perPage);

  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;

  return {
    totalItems: count,
    totalPages,
    currentPage,
    perPage,
    nextPage,
    prevPage,
  };
};

const getPaginationOptions = ({ page = 1, limit = 30 }) => {
  const validPage = Math.max(1, Number(page));
  const validLimit = Math.min(100, Math.max(1, Number(limit)));

  const offset = (validPage - 1) * validLimit;

  return {
    limit: validLimit,
    offset,
  };
};

const paginateResponse = (result, { page = 1, limit = 10 }) => {
  return {
    data: result.rows,
    pagination: getPaginationMetadata({
      page,
      limit,
      count: result.count,
    }),
  };
};

export default {
  getPaginationMetadata,
  getPaginationOptions,
  paginateResponse,
};
