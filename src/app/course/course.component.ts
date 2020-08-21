import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Course } from 'app/model/course';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { LessonsDataSource } from '../services/lessons.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { debounce, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {
    course: Course;
    dataSource: LessonsDataSource;
    displayedColumns = ['seqNo', 'description', 'duration'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('search') search: ElementRef;

    constructor(private route: ActivatedRoute, private coursesService: CoursesService) { }

    ngOnInit(): void {
        this.course = this.route.snapshot.data['course'];
        this.dataSource = new LessonsDataSource(this.coursesService);
        this.dataSource.loadLessons(this.course.id, '', 'asc', 0, 3);
    }

    ngAfterViewInit(): void {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        fromEvent(this.search.nativeElement, 'keyup').pipe(
            debounceTime(150),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadLessonsPage();
            })
        ).subscribe();

        merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => this.loadLessonsPage())
        ).subscribe();
    }

    loadLessonsPage(): void {
        this.dataSource.loadLessons(
            this.course.id,
            this.search.nativeElement.value,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize
        );
    }
}
