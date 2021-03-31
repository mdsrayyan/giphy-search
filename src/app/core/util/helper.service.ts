import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  nonEmptyPredicate(str: string): boolean {
    return !!str && str.trim().length > 0;
  }
}

