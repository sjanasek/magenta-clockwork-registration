module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "reserved",
        {
            reserved_hash_id: {
                primaryKey: true,
                type: Sequelize.STRING,
                allowNull: false
            },
            reserved_product: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            time_of_reservation: {
                type: Sequelize.DATE,
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
};
