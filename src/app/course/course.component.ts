import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Course } from 'app/model/course';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { LessonsDataSource } from '../services/lessons.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';

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

    @ViewChild(MatSort)
    sort: MatSort;

    constructor(private route: ActivatedRoute, private coursesService: CoursesService) { }

    ngOnInit(): void {
        this.course = this.route.snapshot.data['course'];
        this.dataSource = new LessonsDataSource(this.coursesService);
        this.dataSource.loadLessons(this.course.id, '', 'asc', 0, 3);
    }

    ngAfterViewInit(): void {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => {
                this.dataSource.loadLessons(
                    this.course.id, '',
                    this.sort.direction,
                    this.paginator.pageIndex,
                    this.paginator.pageSize
                );
            })
        ).subscribe();
    }

    searchLessons(search) {
        // this.dataSource.filter = search.toLowerCase().trim();
    }
}
