import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss'],
  imports: [MatCardModule, MatDividerModule, MatListModule, CurrencyPipe, NgIf, NgFor],
  standalone: true
})
export class InvoicePreviewComponent implements OnInit {
  items = this.invoiceService.getItems();
  company: any = null;

  constructor(private invoiceService: InvoiceService, private http: HttpClient) {}

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.count * item.price, 0);
  }

  ngOnInit(): void {
    this.http.get('/assets/company.json').subscribe(data => {
      this.company = data;
    });
  }
}