import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpclientService, PatientPersonaDetails } from 'src/app/services/httpclient.service';

@Component({
    selector: 'app-profile-persona-component',
    templateUrl: './profile-persona-component.component.html',
    styleUrls: ['./profile-persona-component.component.scss'],
    standalone: false
})
export class ProfilePersonaComponentComponent implements OnInit {
  form: FormGroup;
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading$: Observable<boolean> = this.loading.asObservable();

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ProfilePersonaComponentComponent>, private httpClientService: HttpclientService, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      patientPersona: ['', Validators.required],
      diagnosisDetails: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.loading.next(true);
    this.httpClientService.patientPersonaDetails.subscribe((response: PatientPersonaDetails) => {
      if (response.diagnosisDetails) {
        this.form.patchValue(response);
        this.loading.next(false);
      }
    })
  }

  save() {
    this.httpClientService.savePatientPersona(this.form.get('patientPersona')?.value, this.form.get('diagnosisDetails')?.value);
    // this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  generatePersona() {
    this.loading.next(true);
    this.httpClientService.getPatientPersona(true);
  }
}
