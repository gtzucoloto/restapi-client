import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styles: [
  ]
})
export class ProductFormComponent implements OnInit {

  constructor(public productService: ProductService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.productService.formData.id == 0)
      this.create(form);
    else
      this.update(form);
  }

  create(form: NgForm) {
    this.productService.post().subscribe(
      () => {
        this.resetForm(form);
        this.productService.getAll();
        this.toastr.success('Created successfully', 'Product Register')
      },
      err => { console.log(err); }
    );
  }

  update(form: NgForm) {
    this.productService.put().subscribe(
      () => {
        this.resetForm(form);
        this.productService.getAll();
        this.toastr.info('Updated successfully', 'Product Register')
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.productService.formData = new Product();
  }

}
