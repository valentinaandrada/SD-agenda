import { ChangeDetectorRef, Component, OnInit, ViewChild, ɵCurrencyIndex } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Person } from 'src/app/interfaces/person'
import { ContactService } from 'src/app/services/contact.service';
import { FormContactComponent } from '../form-contact/form-contact.component';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})

export class AgendaComponent {

  contactsList: Person[] = [];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'surname', 'age', 'dni', 'birthday', 'favouriteColour', 'gender', 'action'];

  constructor(
    private _contactService: ContactService,
    public _dialog: MatDialog,
    public _snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactsList = this._contactService.getContacts();
    this.dataSource = new MatTableDataSource(this.contactsList);
    this.changeDetectorRef.detectChanges()
  }

  removeContact(index: number) {
    this._contactService.removeContact(index)
    this.loadContacts()

    this._snackBar.open('The contact was successfully deleted', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  editContact(contact: Person) {
    this._dialog.open(FormContactComponent, {width: '30rem', data: contact}).afterClosed().subscribe(res => {
      this.loadContacts();
    })
  }

  openDialog() {
    this._dialog.open(FormContactComponent, {disableClose:true, width: '30rem'}).afterClosed().subscribe(res => {
      this.loadContacts();
    })
  }

}
