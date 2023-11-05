'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // a user has many lessons
      Lesson.belongsTo(models.User, { foreignKey: 'userId', tableName: 'User' });
    }
  }
  Lesson.init(
    {
      lessonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unlocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'Lesson',
      freezeTableName: true,
  }
  );
  return Lesson;
};
