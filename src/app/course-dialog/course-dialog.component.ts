import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
    description: string;

    constructor(@Inject(MAT_DIALOG_DATA) {
        description, longDescription, category
    }) {
        this.description = description;
    }

    ngOnInit(): void {
    }
}
