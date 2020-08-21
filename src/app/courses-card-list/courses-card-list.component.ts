import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'app/model/course';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {
    @Input() courses: Course[];

    constructor(private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    editCourse({ description, longDescription, category }: Course) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = {
            description, longDescription, category
        };

        this.dialog.open(CourseDialogComponent, dialogConfig);
    }
}
