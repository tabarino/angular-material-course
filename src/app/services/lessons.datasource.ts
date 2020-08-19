import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Lesson } from '../model/lesson';
import { CoursesService } from './courses.service';
import { catchError } from 'rxjs/operators';

export class LessonsDataSource implements DataSource<Lesson> {
    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

    constructor(private courseServices: CoursesService) { }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
        return this.lessonsSubject.asObservable();
    }

    loadLessons(courseId: number, filter: string, sortDirection: string, pageIndex: number, pageSize: number) {
        this.courseServices.findLessons(courseId, filter, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([]))
            )
            .subscribe(lessons => this.lessonsSubject.next(lessons));
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
    }
}
