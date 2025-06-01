import { Component } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { NgFor, NgIf } from "@angular/common";
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';


@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss'],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatTooltipModule,
        ReactiveFormsModule,
        NgIf,
        NgFor,
    ],
    standalone:true,
})
export class InvoiceComponent {
    invoiceForm: FormGroup;
    errorMessage = '';

    constructor(private fb: FormBuilder, private router: Router, private invoiceService: InvoiceService) {
      this.invoiceForm = this.fb.group({
        items: this.fb.array([])
      });
    }
  
    get items(): FormArray {
      return this.invoiceForm.get('items') as FormArray;
    }
  
    createItem(): FormGroup {
      return this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        count: [null, [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern('^[0-9]+$')]],
        price: [null, [Validators.required, Validators.min(1), Validators.max(1000000), Validators.pattern('^[0-9]+$')]]
      });
    }
  
    addItem(): void {
      this.items.push(this.createItem());
    }
  
    removeItem(index: number): void {
      this.items.removeAt(index);
    }
  
    onSubmit(): void {
        this.errorMessage = '';

        if (this.items.length === 0) {
          this.errorMessage = 'Please add items';
          return;
        }
    
        if (this.invoiceForm.invalid) {
          this.invoiceForm.markAllAsTouched();
          this.errorMessage = 'Form contains errors';
          return;
        }
    
        this.invoiceService.setItems(this.items.value);
        this.router.navigate(['/preview']);
      }
}