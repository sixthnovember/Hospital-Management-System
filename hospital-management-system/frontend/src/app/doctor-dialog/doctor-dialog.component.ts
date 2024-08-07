import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../services/doctor.service';

@Component({
  selector: 'app-doctor-dialog',
  templateUrl: './doctor-dialog.component.html',
  styleUrls: ['./doctor-dialog.component.css']
})
export class DoctorDialogComponent implements OnInit {
  doctorForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DoctorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { doctor: Doctor, editing: boolean },
    private fb: FormBuilder
  ) {
    this.doctorForm = this.fb.group({
      name: [data.doctor ? data.doctor.name : '', Validators.required],
      specialization: [data.doctor ? data.doctor.specialization : '', Validators.required],
      address: [data.doctor ? data.doctor.address : '', Validators.required],
      phone: [data.doctor ? data.doctor.phone : '', Validators.required]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      this.dialogRef.close(this.doctorForm.value);
    }
  }

}