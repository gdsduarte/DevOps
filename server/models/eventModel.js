import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Event = db.define('events',{
    title:{
        type: DataTypes.STRING
    },
    subject:{
        type: DataTypes.STRING
    },
    dateStart:{
        type: DataTypes.DATE
    },
    dateEnd:{
        type: DataTypes.DATE
    },
    description:{
        type: DataTypes.STRING
    },
    color_id:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});
 
export default Event;