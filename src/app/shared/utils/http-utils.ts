import { HttpParams } from '@angular/common/http';

export function toHttpParams(obj: any): HttpParams {
  let params = new HttpParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value != null) {
      if (Array.isArray(value)) {
        value.forEach(item => {
          params = params.append(key, String(item));
        });
      } else if (typeof value === 'object') {
        params = params.set(key, JSON.stringify(value));
      } else {
        params = params.set(key, String(value));
      }
    }
  });

  return params;
}

