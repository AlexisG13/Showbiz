import { Injectable } from '@nestjs/common';
import { EntitySubscriberInterface, Connection, InsertEvent } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { Rent } from '../entities/rent.entity';

@Injectable()
export class NewRentSuscriber implements EntitySubscriberInterface {
  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo(): typeof Rent {
    return Rent;
  }

  afterInsert(event: InsertEvent<Rent>): void {
    console.log('Remove one from stock!');
  }
}
