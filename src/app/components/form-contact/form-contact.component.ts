import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Person } from 'src/app/interfaces/person';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from 'src/app/services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-form-contact.',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css']
})

export class FormContactComponent implements OnInit {

  contactForm: FormGroup;
  gender = [
    { id:1, value:'Male'},
    { id:2, value: 'Female'},
    { id:3, value: 'Nonconforming'},
    { id:4, value: 'Other'}
  ]
  actionBtn: String = 'Add';

  constructor(
    private fb: FormBuilder,
    private _contactService: ContactService,
    public _dialogRef: MatDialogRef<FormContactComponent>,
    public _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData : any,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(125)]],
      dni: ['', [Validators.required, Validators.minLength(9), , Validators.maxLength(9)]],
      birthday: ['', [Validators.required]],
      favouriteColour: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
    if(this.editData){
      this.actionBtn = 'Update'
      this.contactForm.controls['name'].setValue(this.editData.name);
      this.contactForm.controls['surname'].setValue(this.editData.surname);
      this.contactForm.controls['age'].setValue(this.editData.age);
      this.contactForm.controls['dni'].setValue(this.editData.dni);
      this.contactForm.controls['birthday'].setValue(this.editData.birthday);
      this.contactForm.controls['favouriteColour'].setValue(this.editData.favouriteColour);
      this.contactForm.controls['gender'].setValue(this.editData.gender);
      console.log(this.contactForm.controls['birthday'].value)
      console.log(this.editData.birthday)
    }

  }

  addContact() {
    if(!this.editData) {
      const contact: Person = {
        name: this.contactForm.value.name,
        surname: this.contactForm.value.surname,
        age: this.contactForm.value.age,
        dni: this.contactForm.value.dni,
        birthday: this._contactService.formatDate(this.contactForm.value.birthday),
        favouriteColour: this.contactForm.value.favouriteColour,
        gender: this.contactForm.value.gender,
      }
      this._contactService.addContact(contact)
      this.closeDialog();
      this._snackBar.open('The contact was successfully added', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    } else {
      this.updateContact();
    }
  }

  updateContact() {
    const index = this._contactService.listContacts.indexOf(this.editData)
    const updatedContact = this._contactService.getContact(index)

    updatedContact.name = this.contactForm.value.name;
    updatedContact.surname = this.contactForm.value.surname;
    updatedContact.age = this.contactForm.value.age;
    updatedContact.dni = this.contactForm.value.dni;
    updatedContact.birthday = this._contactService.formatDate(this.contactForm.value.birthday);
    updatedContact.favouriteColour = this.contactForm.value.favouriteColour;
    updatedContact.gender = this.contactForm.value.gender;

    this.closeDialog()
    this._snackBar.open('The contact was successfully edited', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  closeDialog() {
    this._dialogRef.close({event:'cancel'})
  }
}
