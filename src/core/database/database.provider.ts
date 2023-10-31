import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './databse.config';
import { User } from 'src/user/model/user.entity';
import { Category } from 'src/category/model/category.entity';
import { Book } from 'src/book/model/book.entity';
import { Cart } from 'src/cart/model/cart.entity';
import { BookTransaction } from 'src/transaction/model/transaction.entity';
import { Subscribe } from 'src/subscribe/model/subscribe.entity';
import { SEQUELIZE } from '../constants';
import { Session } from '@nestjs/common';
import { UserSession } from 'src/session/model/session.entity';

let sequelize;
export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      sequelize = new Sequelize({... new databaseConfig().local,dialect: "postgres"});
      sequelize.addModels([
        Category, 
        User, 
        Book, 
        Cart,
        BookTransaction, 
        Subscribe,
        UserSession
      ]);
      await sequelize.sync({});
      return sequelize.models;
    },
  },
  {
    provide: "SQLIZE",
    useFactory: async() =>{
      return sequelize;
    }
  }
];