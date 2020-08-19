import { Component, OnInit } from '@angular/core';
import { Course } from 'app/model/course';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { MatTableDataSource } from '@angular/material/table';
import { Lesson } from 'app/model/lesson';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
    course: Course;
    dataSource = new MatTableDataSource([]);
    displayedColumns = ['seqNo', 'description', 'duration'];

    constructor(private route: ActivatedRoute, private coursesService: CoursesService) { }

    ngOnInit(): void {
        this.course = this.route.snapshot.data['course'];
        this.coursesService.findAllCourseLessons(this.course.id).subscribe(
            lessons => this.dataSource.data = lessons
        );
    }

    searchLessons(search) {
        this.dataSource.filter = search.toLowerCase().trim();
    }
}
