import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import Product from '../app/models/Product'
import User from '../app/models/User'
import Category from '../app/models/category'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(
      'postgresql://postgres:1b5GE*6GAE-2-ccc3aecC3g-Eeb*cfcg@viaduct.proxy.rlwy.net:48396/railway',
    )
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:14Ggh3bCCGA-4eAf531H-eA3E6f1C35H@viaduct.proxy.rlwy.net:58747',
    )
  }
}

export default new Database()
