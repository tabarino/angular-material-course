import { Component, OnInit } from '@angular/core';
import { Course } from 'app/model/course';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
    course: Course;

    constructor(private route: ActivatedRoute, private coursesService: CoursesService) { }

    ngOnInit(): void {
        this.course = this.route.snapshot.data['course'];
    }

}
