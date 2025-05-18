import { finalize, Observable } from "rxjs";
import { LoadingService } from "../../Services/loading.service";

export function withLoading<T>(loadingService: LoadingService) {
    return (source$: Observable<T>): Observable<T> => {
    loadingService.show();
    return source$.pipe(
      finalize(() => loadingService.hide())
    );
  };
}