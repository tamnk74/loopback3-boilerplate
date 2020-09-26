module.exports = function (Model, options) {
  Model.getDataSource().connector.connect(function (err, db) {
    const collection = db.collection(Model.modelName);
    collection.createIndexes(options.indexes, (err, res) => {
      if (err || res.ok !== 1) {
        throw err || Error(`Index error for ${Model.modelName}`);
      }
      console.log(
        `=> Created ${res.numIndexesAfter - res.numIndexesBefore} indexes for "${Model.modelName}"`
      );
    });
  });
};
