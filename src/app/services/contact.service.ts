import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root',
})

export class ContactService {

  listContacts: Array<Person> = [];

  constructor(private datePipe: DatePipe) {}

  getContacts() {
    return this.listContacts;
  }

  getContact(index: number) {
    return this.listContacts[index];
  }

  removeContact(index: number): void {
    this.listContacts.splice(index, 1);
  }

  addContact(contact: Person): void {
    this.listContacts.push(contact);
  }

  editContact(contact: Person) {
    console.log(contact);
    return contact;
  }

  formatDate(date: any) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}
