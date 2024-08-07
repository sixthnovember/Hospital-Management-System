import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nurse } from '../services/nurse.service';

@Component({
  selector: 'app-nurse-dialog',
  templateUrl: './nurse-dialog.component.html',
  styleUrls: ['./nurse-dialog.component.css']
})
export class NurseDialogComponent implements OnInit {
  nurseForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NurseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nurse: Nurse, editing: boolean },
    private fb: FormBuilder
  ) {
    this.nurseForm = this.fb.group({
      name: [data.nurse ? data.nurse.name : '', Validators.required],
      diploma: [data.nurse ? data.nurse.diploma : '', Validators.required],
      address: [data.nurse ? data.nurse.address : '', Validators.required],
      phone: [data.nurse ? data.nurse.phone : '', Validators.required]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.nurseForm.valid) {
      this.dialogRef.close(this.nurseForm.value);
    }
  }

}