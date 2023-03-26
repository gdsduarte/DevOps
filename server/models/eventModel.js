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
    start:{
        type: DataTypes.DATE
    },
    end:{
        type: DataTypes.DATE
    },
    description:{
        type: DataTypes.STRING
    },
    backgroundColor:{
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    }
},{
    freezeTableName: true
});
 
export default Event;