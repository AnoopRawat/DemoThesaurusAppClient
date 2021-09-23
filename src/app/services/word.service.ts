import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IWord } from '../interfaces/IWord';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http: HttpClient) { }

  getTotalWordsCount() {
    return this.http.get<number>(environment.backendUrl + 'api/words/count', httpOptions);
  }

  getAllWordsByPage(pageIndex: number, pageSize: number): Observable<IWord[]> {
    var queryParam = {
      pageNumber: pageIndex + 1,
      pageSize: pageSize
    }

    return this.http.get<IWord[]>(environment.backendUrl + 'api/words', { params: queryParam, headers: httpOptions.headers });
  }

  getWordByName(name: string) {
    return this.http.get<IWord>(environment.backendUrl + `api/words/${name}`, httpOptions);
  }

  addWord(word: IWord) {
    return this.http.post<IWord>(environment.backendUrl + 'api/words', word, httpOptions);
  }

  updateWord(word: IWord, existingWordName: string) {
    return this.http.put<IWord>(environment.backendUrl + `api/words/${existingWordName}`, word, httpOptions);
  }

  deleteWords(name: string) {
    return this.http.delete<boolean>(environment.backendUrl + `api/words/${name}`, httpOptions);
  }
}
