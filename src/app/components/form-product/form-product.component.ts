import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.css',
})
export class FormProductComponent implements OnInit {
  items: any[] = [];
  newItemId: any = '';
  newItemName = '';
  newItemDescription = '';
  newItemLogo = '';
  newItemFechaLib = '';
  newItemFechaRestr = '';

  constructor(
    private productosService: ProductosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.newItemId = null;
      if (params.id) {
        this.productosService.getItemById(params.id).subscribe({
          next: (item: any) => {
            this.newItemId = item?.id;
            this.newItemName = item?.name;
            this.newItemDescription = item?.descripcion;
            this.newItemLogo = item?.newItemLogo;
            this.newItemFechaLib = item?.fechaLiberacion;
            this.newItemFechaRestr = item?.fechaRestructuracion;
          },
          error: (e) => {
            console.error(e);
          },
        });
      }
    });
  }

  enviarItem(): void {
    if (this.newItemId) {
      this.editItem();
    } else {
      this.addItem();
    }
  }

  addItem(): void {
    this.productosService
      .createItem({
        name: this.newItemName,
        descripcion: this.newItemDescription,
        logo: this.newItemLogo,
        fechaLiberacion: this.newItemFechaLib,
        fechaRestructuracion: this.newItemFechaRestr,
      })
      .subscribe(() => {
        this.newItemId = '';
        this.newItemName = '';
        this.newItemDescription = '';
        this.newItemLogo = '';
        this.newItemFechaLib = '';
        this.newItemFechaRestr = '';
      });
  }

  editItem(): void {
    this.productosService
      .updateItem(this.newItemId, {
        name: this.newItemName,
        descripcion: this.newItemDescription,
        logo: this.newItemLogo,
        fechaLiberacion: this.newItemFechaLib,
        fechaRestructuracion: this.newItemFechaRestr,
      })
      .subscribe(() => {
        this.newItemId = '';
        this.newItemName = '';
        this.newItemDescription = '';
        this.newItemLogo = '';
        this.newItemFechaLib = '';
        this.newItemFechaRestr = '';
      });
  }

  resetForm(): void {
    this.newItemId = '';
    this.newItemName = '';
    this.newItemDescription = '';
    this.newItemLogo = '';
    this.newItemFechaLib = '';
    this.newItemFechaRestr = '';
  }

  volver() {
    this.router.navigate(['']);
  }
}
