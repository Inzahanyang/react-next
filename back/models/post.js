module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Post.associate = (db) => {
    // add, get, set, remove
    db.Post.hasMany(db.Comment); // post.addComments
    db.Post.hasMany(db.Image); // post.addImages
    db.Post.belongsTo(db.User); // post.addUser
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // post.addRetweet
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // post.addHashtags
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // post.addLikers, post.removeLikers
  };
  return Post;
};
