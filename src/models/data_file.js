'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DataFile.init(
    {
      branch_code: DataTypes.STRING,
      name: DataTypes.STRING,
      number: DataTypes.STRING,
      address: DataTypes.STRING,
      other: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'DataFile'
    }
  );
  return DataFile;
};
