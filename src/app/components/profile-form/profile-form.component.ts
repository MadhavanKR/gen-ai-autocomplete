import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { HttpclientService, PatientDetails } from 'src/app/services/httpclient.service';
import { ProfilePersonaComponentComponent } from '../profile-persona-component/profile-persona-component.component';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  form: FormGroup;
  medicalConditionList = ['Stroke', 'Pneumonia', 'Muscle pain', 'Bedsores', "Locked-In Syndrome"];
  medicationsList = [
    "Baclofen",
    "Tizanidine",
    "Diazepam (Valium)",
    "Gabapentin",
    "Heparin",
    "Glycopyrrolate",
    "Benzodiazepines"
  ];

  constructor(private fb: FormBuilder, private httpClientService: HttpclientService, private dialog: MatDialog) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      language: ['', Validators.required],
      medicalConditions: ['', Validators.required],
      medications: ['', Validators.required],
      allergies: ['', Validators.required],
      additionalDetails: ['']
    });
  }


  ngOnInit(): void {
    this.httpClientService.patientDetails.subscribe((response: PatientDetails) => {
      console.log('in ngOnInit')
      if (Object.keys(response).length == 0)
        return;

      this.form.patchValue({
        name: response.name,
        gender: '1',
        language: 'one',
        medicalConditions: response.diagnoses,
        medications: response.medications,
        allergies: response.allergies
      })
    });
  }



  onSubmit() {
    if (this.form.valid) {
      // alert('Form Submitted: ' + JSON.stringify(this.form.value));
    } else {
      alert('Please fill all required fields.');
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '60vw'; // or '80%'
        dialogConfig.height = '70vh'; // or 'auto'

        this.dialog.open(ProfilePersonaComponentComponent, dialogConfig);
  }
}
