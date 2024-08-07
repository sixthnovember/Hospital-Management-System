import { Component, OnInit } from '@angular/core';
import { DoctorService, Doctor } from '../services/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { DoctorDialogComponent } from '../doctor-dialog/doctor-dialog.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(): void {
    this.doctorService.getDoctors().subscribe(doctors => this.doctors = doctors);
  }

  openDialog(doctor?: Doctor): void {
    const dialogRef = this.dialog.open(DoctorDialogComponent, {
      width: '400px',
      data: { doctor: doctor || {}, editing: !!doctor }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (doctor && doctor._id) {
          this.updateDoctor(doctor._id, result);
        } else {
          this.addDoctor(result);
        }
      }
    });
  }

  addDoctor(doctor: Doctor): void {
    this.doctorService.addDoctor(doctor).subscribe(newDoctor => {
      this.doctors = [...this.doctors, newDoctor];
    });
  }

  updateDoctor(id: string, doctor: Doctor): void {
    this.doctorService.updateDoctor(id, doctor).subscribe(updatedDoctor => {
      const index = this.doctors.findIndex(d => d._id === updatedDoctor._id);
      if (index !== -1) {
        this.doctors[index] = updatedDoctor;
        this.doctors = [...this.doctors];
      }
    });
  }

  deleteDoctor(id: string): void {
    this.doctorService.deleteDoctor(id).subscribe(() => {
      this.doctors = this.doctors.filter(doctor => doctor._id !== id);
    });
  }
  
}