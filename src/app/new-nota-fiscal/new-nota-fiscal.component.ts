import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-nota-fiscal',
  templateUrl: './new-nota-fiscal.component.html',
  styleUrls: ['./new-nota-fiscal.component.scss']
})
export class NewNotaFiscalComponent implements OnInit {

  exampleForm: FormGroup;

  validation_messages = {
   'date': [
     { type: 'required', message: 'Date is required.' },
   ]
 };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      desc: ['', Validators.required ],
      data: ['', Validators.required ]
    });
  }

  resetFields(){
    this.exampleForm = this.fb.group({
      data: new FormControl('', Validators.required),
    });
  }

  onSubmit(value){
    this.firebaseService.createNotaFiscal(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}
