import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
    formCourseDialog: FormGroup;
    description: string;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) {
            description, longDescription, category
        }
    ) {
        this.description = description;
        this.formCourseDialog = this.fb.group({
            description: [description, Validators.required]
        });
    }

    ngOnInit(): void {
    }

    close(): void {
        this.dialogRef.close();
    }
}
