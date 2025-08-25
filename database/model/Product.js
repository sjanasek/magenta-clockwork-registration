module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "product",
        {
            product_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            product_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            product_picture_url: {
                type: Sequelize.STRING,
                defaultValue: null
            },
            stock: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            available: {
                type: Sequelize.BOOLEAN,
                defaultValue: 1
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
}; 