import { HttpParams } from "@angular/common/http";

export function toHttpParams(obj: any): HttpParams {
  let params = new HttpParams();
  Object.entries(obj).forEach(([key, value]) => {
    if (value != null) {
      params = params.set(key, JSON.stringify(value));
    }
  });

  return params;
}