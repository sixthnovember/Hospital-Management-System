import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../services/patient.service';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css']
})
export class PatientDialogComponent implements OnInit {
  patientForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patient: Patient, editing: boolean },
    private fb: FormBuilder
  ) {
    this.patientForm = this.fb.group({
      name: [data.patient ? data.patient.name : '', Validators.required],
      disease: [data.patient ? data.patient.disease : '', Validators.required],
      admission: [data.patient ? data.patient.admission : '', Validators.required],
      medication: [data.patient ? data.patient.medication : '', Validators.required]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      this.dialogRef.close(this.patientForm.value);
    }
  }

}