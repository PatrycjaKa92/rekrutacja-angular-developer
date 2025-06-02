import { Component, OnInit } from '@angular/core';
import { InvoiceService, InvoiceItem, CompanyInfo } from '../services/invoice.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss'],
  imports: [MatCardModule, MatDividerModule, MatListModule, CurrencyPipe, NgIf, NgFor, AsyncPipe],
  standalone: true
})
export class InvoicePreviewComponent implements OnInit {
  items$: Observable<InvoiceItem[]>;
  company$: Observable<CompanyInfo>;

  total$: Observable<number>;

  constructor(private invoiceService: InvoiceService) {
    this.items$ = this.invoiceService.getItems();
    this.company$ = this.invoiceService.getCompanyInfo();

    this.total$ = this.items$.pipe(
      map(items => items.reduce((sum, item) => sum + item.count * item.price, 0))
    );
  }

  ngOnInit(): void {}
}