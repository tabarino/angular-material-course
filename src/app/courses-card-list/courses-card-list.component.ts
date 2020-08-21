import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'app/model/course';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {
    @Input()
    courses: Course[];

    constructor() { }

    ngOnInit(): void {
    }

    editCourse({description, longDescription, category}: Course) {

    }
}
