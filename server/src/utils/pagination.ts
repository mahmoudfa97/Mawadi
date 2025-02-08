import { Model, Document } from 'mongoose';

export const paginateResults = async (
  model: Model<any>,
  query: any,
  page: number,
  limit: number,
  populateOptions?: any
) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results: any = {};

  if (endIndex < await model.countDocuments(query).exec()) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }

  let queryChain = model.find(query).skip(startIndex).limit(limit);

  if (populateOptions) {
    queryChain = queryChain.populate(populateOptions);
  }

  results.results = await queryChain.exec();
  results.totalPages = Math.ceil((await model.countDocuments(query).exec()) / limit);
  results.currentPage = page;

  return results;
};