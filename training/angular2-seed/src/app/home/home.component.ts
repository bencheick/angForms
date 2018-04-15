import {Component} from '@angular/core';
import { Employee } from '../models/employee.model'
import { FormPoster } from '../services/form-poster.service';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  //languages = ['English', 'Spanish', 'Other'];
  languages = [];
  model = new Employee('Darla', 'Smith', true, 'o2','English');
  //model = new Employee('', '', true, '','French');
  hasPrimaryLanguageError = false;

  constructor(private formPoster: FormPoster){
    this.formPoster.getLanguages()
        .subscribe(
          data => this.languages = data.languages,
          err => console.log('get error: ', err)
        );
  }
  
  submitForm(form: NgForm){
    //console.log('model',ngModel);
    //console.log('form', form.value);

    // validate Form
    this.validatePrimaryLanguage(this.model.primaryLanguage);
    //sthis.formPoster.postEmployeeForm(this.model);
    if(this.hasPrimaryLanguageError){
      return;
    }
    this.formPoster.postEmployeeForm(this.model)
    .subscribe(
      data => console.log('success: ', data),
      err => console.log('error: ', err)
    )

  }

  validatePrimaryLanguage(event) {
    //console.log('$event' + ' ' + event);
    if (event === 'French')
      this.hasPrimaryLanguageError = true;
    else
      this.hasPrimaryLanguageError = false;
  }
  
  firstNameToUpperCase(value: string) {
    if (value.length > 0)
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    else
      this.model.firstName = value;
  }
}
