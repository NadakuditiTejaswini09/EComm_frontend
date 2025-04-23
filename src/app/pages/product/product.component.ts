import { CommonModule  } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { RouterModule ,Router, ActivatedRoute} from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from './product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterModule ],
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService, private router: Router,private cartService: CartService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      console.log(data)
      this.products = data;
      this.filteredProducts = data; // Initialize filteredProducts

      this.route.queryParams.subscribe(params => {
        const searchQuery = params['search'];
        if (searchQuery) {
          this.filterBySearchQuery(searchQuery);
        }
      });
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
      this.filteredProducts = this.filteredProducts.filter(product => product.id !== id);
    });
  }
  addToCart(product:Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart successfully`);
  }
  filterByCategory(event: Event): void {
    const category = (event.target as HTMLSelectElement).value;
    if (category) {
      this.filteredProducts = this.products.filter(product => product.category === category);
      console.log(this.filteredProducts);
    } else {
      this.filteredProducts = this.products;
    }
  }
  filterBySearchQuery(query: string): void {
    if(query!=null && query!="")
    {
    this.filteredProducts = this.filteredProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    }
    console.log(this.filteredProducts);
  }
}
  

