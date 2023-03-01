module.exports = (sequelize, dataTypes) => {
  let alias = "OrderDetails";
  let cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
  },
    product_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      references: {
        model: "Product",
        key: "id",
      },
    },
    order_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      references: {
        model: "Order",
        key: "id",
      },
    },
    quantity : {
      type : dataTypes.INTEGER.UNSIGNED
  }
  };
  const config = {
    tableName : 'order_details',
    timestamps : false
}
  const OrderDetails = sequelize.define(alias, cols, config);
  OrderDetails.associate = (models) => {
    // No llevan alias porque al momento de usar db.OrderDetails
    // los resultados te traen la asociación automáticamente, sin necesidad de aclarar
    OrderDetails.belongsTo(models.Orders, {
      foreignKey: "order_id"
    });
    OrderDetails.belongsTo(models.Products, {
      foreignKey: "product_id"
    });
  };
  return OrderDetails;
};
