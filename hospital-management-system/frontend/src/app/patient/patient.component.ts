import { Component, OnInit } from '@angular/core';
import { PatientService, Patient } from '../services/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { PatientDialogComponent } from '../patient-dialog/patient-dialog.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe(patients => this.patients = patients);
  }

  openDialog(patient?: Patient): void {
    const dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '400px',
      data: { patient: patient || {}, editing: !!patient }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (patient && patient._id) {
          this.updatePatient(patient._id, result);
        } else {
          this.addPatient(result);
        }
      }
    });
  }

  addPatient(patient: Patient): void {
    this.patientService.addPatient(patient).subscribe(newPatient => {
      this.patients = [...this.patients, newPatient];
    });
  }

  updatePatient(id: string, patient: Patient): void {
    this.patientService.updatePatient(id, patient).subscribe(updatedPatient => {
      const index = this.patients.findIndex(d => d._id === updatedPatient._id);
      if (index !== -1) {
        this.patients[index] = updatedPatient;
        this.patients = [...this.patients];
      }
    });
  }

  deletePatient(id: string): void {
    this.patientService.deletePatient(id).subscribe(() => {
      this.patients = this.patients.filter(patient => patient._id !== id);
    });
  }

}