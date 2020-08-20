import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Course } from 'app/model/course';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { LessonsDataSource } from '../services/lessons.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { startWith, tap } from 'rxjs/operators';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {
    course: Course;
    dataSource: LessonsDataSource;
    displayedColumns = ['seqNo', 'description', 'duration'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(private route: ActivatedRoute, private coursesService: CoursesService) { }

    ngOnInit(): void {
        this.course = this.route.snapshot.data['course'];
        this.dataSource = new LessonsDataSource(this.coursesService);
        this.dataSource.loadLessons(this.course.id, '', 'asc', 0, 3);
    }

    ngAfterViewInit(): void {
        this.paginator.page.pipe(
            startWith(null),
            tap(() => {
                this.dataSource.loadLessons(
                    this.course.id, '', 'asc', this.paginator.pageIndex, this.paginator.pageSize
                );
            })
        ).subscribe();
    }

    searchLessons(search) {
        // this.dataSource.filter = search.toLowerCase().trim();
    }
}
