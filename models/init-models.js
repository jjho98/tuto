var DataTypes = require('sequelize').DataTypes;
var _category = require('./category');
var _comment = require('./comment');
var _lecture = require('./lecture');
var _portfolio = require('./portfolio');
var _portfolioImage = require('./portfolioImage');
var _recomment = require('./recomment');
var _taken = require('./taken');
var _taking = require('./taking');
var _tutorial = require('./tutorial');
var _user = require('./user');

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var lecture = _lecture(sequelize, DataTypes);
  var portfolio = _portfolio(sequelize, DataTypes);
  var portfolioImage = _portfolioImage(sequelize, DataTypes);
  var recomment = _recomment(sequelize, DataTypes);
  var taken = _taken(sequelize, DataTypes);
  var taking = _taking(sequelize, DataTypes);
  var tutorial = _tutorial(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  tutorial.belongsToMany(user, {
    as: 'user_id_users',
    through: taken,
    foreignKey: 'tutorial_id',
    otherKey: 'user_id',
  });
  tutorial.belongsToMany(user, {
    as: 'user_id_user_takings',
    through: taking,
    foreignKey: 'tutorial_id',
    otherKey: 'user_id',
  });
  user.belongsToMany(tutorial, {
    as: 'tutorial_id_tutorials',
    through: taken,
    foreignKey: 'user_id',
    otherKey: 'tutorial_id',
  });
  user.belongsToMany(tutorial, {
    as: 'tutorial_id_tutorial_takings',
    through: taking,
    foreignKey: 'user_id',
    otherKey: 'tutorial_id',
  });
  tutorial.belongsTo(category, { as: 'category', foreignKey: 'category_id' });
  category.hasMany(tutorial, { as: 'tutorials', foreignKey: 'category_id' });
  recomment.belongsTo(comment, { as: 'comment', foreignKey: 'comment_id' });
  comment.hasMany(recomment, { as: 'recomments', foreignKey: 'comment_id' });
  portfolio.belongsTo(lecture, { as: 'lecture', foreignKey: 'lecture_id' });
  lecture.hasMany(portfolio, { as: 'portfolios', foreignKey: 'lecture_id' });
  comment.belongsTo(portfolio, { as: 'portfolio', foreignKey: 'portfolio_id' });
  portfolio.hasMany(comment, { as: 'comments', foreignKey: 'portfolio_id' });
  portfolioImage.belongsTo(portfolio, {
    as: 'portfolio',
    foreignKey: 'portfolio_id',
  });
  portfolio.hasMany(portfolioImage, {
    as: 'portfolioImages',
    foreignKey: 'portfolio_id',
  });
  lecture.belongsTo(tutorial, { as: 'tutorial', foreignKey: 'tutorial_id' });
  tutorial.hasMany(lecture, { as: 'lectures', foreignKey: 'tutorial_id' });
  taken.belongsTo(tutorial, { as: 'tutorial', foreignKey: 'tutorial_id' });
  tutorial.hasMany(taken, { as: 'takens', foreignKey: 'tutorial_id' });
  taking.belongsTo(tutorial, { as: 'tutorial', foreignKey: 'tutorial_id' });
  tutorial.hasMany(taking, { as: 'takings', foreignKey: 'tutorial_id' });
  comment.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
  user.hasMany(comment, { as: 'comments', foreignKey: 'user_id' });
  portfolio.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
  user.hasMany(portfolio, { as: 'portfolios', foreignKey: 'user_id' });
  recomment.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
  user.hasMany(recomment, { as: 'recomments', foreignKey: 'user_id' });
  taken.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
  user.hasMany(taken, { as: 'takens', foreignKey: 'user_id' });
  taking.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
  user.hasMany(taking, { as: 'takings', foreignKey: 'user_id' });
  tutorial.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
  user.hasMany(tutorial, { as: 'tutorials', foreignKey: 'user_id' });

  return {
    category,
    comment,
    lecture,
    portfolio,
    portfolioImage,
    recomment,
    taken,
    taking,
    tutorial,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
