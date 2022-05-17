class ApiFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  Search() {
    const Keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...Keyword });
  
    return this;
  }

  Filter() {
    const queryCopy = { ...this.querystr };

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => {
      delete queryCopy[key];
    });

    let querystr = JSON.stringify(queryCopy);

    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
  
    this.query = this.query.find(JSON.parse(querystr));
    return this;
  }

  pagination(resultperPage) {
    const CurrentPage = Number(this.querystr.page) || 1;
    const skip = resultperPage * (CurrentPage - 1);
    this.query = this.query.limit(resultperPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
