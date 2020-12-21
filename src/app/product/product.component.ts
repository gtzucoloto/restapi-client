import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt, 'pt')

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit {

  constructor(public productService: ProductService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productService.getAll();
  }

  populateForm(selectedRecord: Product) {
    this.productService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.productService.delete(id)
        .subscribe(
          () => {
            this.productService.getAll();
            this.toastr.error("Deleted successfully", 'Product Register');
          },
          err => { console.log(err) }
        )
    }
  }

}
