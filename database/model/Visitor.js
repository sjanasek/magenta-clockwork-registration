module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "visitor",
        {
            visitor_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            user_hash_id: {
                type: Sequelize.STRING,
                allowNull: false
            },
            first_name: {
                type: Sequelize.STRING
            },
            last_name: {
                type: Sequelize.STRING
            },
            company: {
                type: Sequelize.STRING
            },
            job_title: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: null
            },
            phone: {
                type: Sequelize.STRING,
                defaultValue: null
            },
            business_card: {
                type: Sequelize.STRING,
                defaultValue: null
            },
            product_type: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            answer_one: {
                type: Sequelize.STRING,
                allowNull: false
            },
            answer_two: {
                type: Sequelize.STRING,
                allowNull: false
            },
            answer_three: {
                type: Sequelize.STRING,
                allowNull: false
            },
            parameter_speedLeft: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            parameter_speedRight: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            parameter_excenterLeft: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            parameter_excenterRight: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            time_of_registration: {
                type: Sequelize.DATE,
                allowNull: false
            },
            state_of_production: {
                type: Sequelize.ENUM(
                    'waiting to be rated',
                    'pending',
                    'in progress',
                    'finished',
                    'picked up by customer',
                    'order cancelled'),
                defaultValue: 'waiting to be rated'
            },
            rating: {
                type: Sequelize.ENUM(
                    'not rated yet',
                    'hot',
                    'cold',
                    'warm',
                    'fake',
                    'unknown'),
                defaultValue: 'not rated yet'
            },
            visitor_picture_url: {
                type: Sequelize.STRING,
                defaultValue: null
            },
            handled_by_sales: {
                type: Sequelize.ENUM(
                    'not yet',
                    'in progress',
                    'done'),
                defaultValue: 'not yet'
            },
            appointment: {
                type: Sequelize.ENUM(
                    'none',
                    'email',
                    'phone',
                    'personal conversation'),
                defaultValue: 'none'
            },
            social_media_url: {
                type: Sequelize.STRING,
                defaultValue: null
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            index: [
                {
                    unique: true,
                    fields: ['user_hash_id']
                }
            ]
        }
    );
}; 