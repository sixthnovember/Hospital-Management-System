import { Component, OnInit } from '@angular/core';
import { NurseService, Nurse } from '../services/nurse.service';
import { MatDialog } from '@angular/material/dialog';
import { NurseDialogComponent } from '../nurse-dialog/nurse-dialog.component';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {
  nurses: Nurse[] = [];

  constructor(private nurseService: NurseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getNurses();
  }

  getNurses(): void {
    this.nurseService.getNurses().subscribe(nurses => this.nurses = nurses);
  }

  openDialog(nurse?: Nurse): void {
    const dialogRef = this.dialog.open(NurseDialogComponent, {
      width: '400px',
      data: { nurse: nurse || {}, editing: !!nurse }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (nurse && nurse._id) {
          this.updateNurse(nurse._id, result);
        } else {
          this.addNurse(result);
        }
      }
    });
  }

  addNurse(nurse: Nurse): void {
    this.nurseService.addNurse(nurse).subscribe(newNurse => {
      this.nurses = [...this.nurses, newNurse];
    });
  }

  updateNurse(id: string, nurse: Nurse): void {
    this.nurseService.updateNurse(id, nurse).subscribe(updatedNurse => {
      const index = this.nurses.findIndex(d => d._id === updatedNurse._id);
      if (index !== -1) {
        this.nurses[index] = updatedNurse;
        this.nurses = [...this.nurses];
      }
    });
  }

  deleteNurse(id: string): void {
    this.nurseService.deleteNurse(id).subscribe(() => {
      this.nurses = this.nurses.filter(nurse => nurse._id !== id);
    });
  }

}