import * as Sequelize from 'sequelize'
import * as fs from 'fs'
import * as env from 'dotenv'
import * as path from 'path'

env.config()
let db: any = {}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  define: {
    freezeTableName: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  logging: false,
  operatorAliases: false
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return ( file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'index.ts');
  })
  .forEach(file => {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db
