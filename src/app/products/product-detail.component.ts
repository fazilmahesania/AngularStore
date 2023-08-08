import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  pageTitle: string = 'Product Detail';
  imageWidth: number = 30;
  imageMargin: number = 2;
  alignCenter: string ='center';
  sub!: Subscription;
  errorMessage: string = '';
  product: IProduct | undefined;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  products: IProduct[] = [];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProducts().subscribe({
      next: (products) => {
          this.products = products;
          this.product = this.products.find(product => product.productId === id);;
      },
      error: (err: string) => this.errorMessage = err
  });
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }
 
  ngOnDestroy() {
      if (this.sub) {
      this.sub.unsubscribe();
      }
  }
  onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message + ' Rating';
  }

}
