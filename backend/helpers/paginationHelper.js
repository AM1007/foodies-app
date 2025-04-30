/**
 * Generates pagination metadata based on the query parameters and total count
 * @param {Object} options - Pagination options
 * @param {number|string} options.page - Current page number
 * @param {number|string} options.limit - Items per page
 * @param {number} options.count - Total number of items
 * @returns {Object} Pagination metadata
 */
const getPaginationMetadata = ({ page = 1, limit = 10, count = 0 }) => {
  // Convert page and limit to numbers
  const currentPage = Number(page);
  const perPage = Number(limit);
  
  // Calculate total pages
  const totalPages = Math.ceil(count / perPage);

  // Calculate next and previous pages
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

/**
 * Applies pagination to a Sequelize query
 * @param {Object} options - Pagination options
 * @param {number|string} options.page - Current page number
 * @param {number|string} options.limit - Items per page
 * @returns {Object} Pagination parameters for Sequelize
 */
const getPaginationOptions = ({ page = 1, limit = 10 }) => {
  // Convert to numbers and ensure valid values
  const validPage = Math.max(1, Number(page));
  const validLimit = Math.min(100, Math.max(1, Number(limit)));

  // Calculate offset
  const offset = (validPage - 1) * validLimit;

  return {
    limit: validLimit,
    offset,
  };
};

/**
 * Processes Sequelize findAndCountAll results with pagination
 * @param {Object} result - Sequelize findAndCountAll result
 * @param {Object} query - Query parameters
 * @param {number|string} query.page - Current page number
 * @param {number|string} query.limit - Items per page
 * @returns {Object} Formatted response with data and pagination metadata
 */
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