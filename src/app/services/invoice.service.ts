import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface InvoiceItem {
  name: string;
  count: number;
  price: number;
}

export interface CompanyInfo {
  name: string;
  country: string;
  phones: string[];
}

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private itemsSubject = new BehaviorSubject<InvoiceItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  setItems(items: InvoiceItem[]): void {
    this.itemsSubject.next(items);
  }

  getItems(): Observable<InvoiceItem[]> {
    return this.items$;
  }

  getCompanyInfo(): Observable<CompanyInfo> {
    return this.http.get<CompanyInfo>('/assets/company.json');
  }
}
