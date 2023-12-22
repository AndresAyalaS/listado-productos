import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
})
export class ListProductComponent implements OnInit {
  items: any[] = [];
  newItemName = '';
  newItemDescription = '';
  editItemId: number | null = null;
  editItemName = '';
  editItemDescription = '';

  terminoBusqueda: string = '';

  constructor(private productosService: ProductosService, private router: Router) {}
  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.productosService.getItems().subscribe((response) => {
      this.items = response;
    });
  }

  agregarItem() {
    this.router.navigate(['/agregar']);
  }

  confirmarEliminar(item: any) {
    if (confirm(`¿Estás seguro que quieres eliminar el producto ${item.name}?`)) {
      this.deleteItem(item.id);
    }
  }
  deleteItem(id: number): void {
    this.productosService.deleteItem(id).subscribe(() => {
      this.loadItems();
    });
  }
}
