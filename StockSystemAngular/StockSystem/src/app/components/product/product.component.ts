import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
    productList = new Array<Product>()
    userList = new Array<User>()
    productForm : FormGroup
    product = new Product()
    id2: number
    name2: string
    price2:number
    stock2:number
    description2:string
    userId: number
    constructor(private productService: ProductService, private userService: UserService, private modalService: NgbModal) { }

    ngOnInit(): void {
      this.name2 = ""
      this.id2 = 0
      this.price2 = 0
      this.stock2 = 0 
      this.description2 = ""
      this.userId = 0

      this.productForm = new FormGroup({
        'name': new FormControl(this.product.name, Validators.required),
        'user': new FormControl(this.userId)
      })
      this.userService.getAll().subscribe(response => {
        this.userList = response
      }, error => {
        console.log(error)
      })
      this.getAll()
    }

  get name() { return this.productForm.get('name') }
  get user() { return this.productForm.get('user') }

  getAll(){
    this.productService.getAll().subscribe((response)=>{

    this.productList = response
    document.getElementsByTagName('input')[0].focus()

    },(error)=>{

      console.log(error)
      
    })
    }

    viewProduct(product: Product, ver: any) {
      this.id2 = product.id
      this.name2 = product.name
      this.modalService.open(ver).result.then(() => {
        product.name = this.name2
        this.productService.updateProduct(product).subscribe(() => {
          location.reload()
        }, error => {
          console.log(error)
        })
      }, error => {
        console.log(error)
      })
    }
  
    deleteProduct(id: number) {
      this.productService.deleteProduct(id).subscribe(() => {
        location.reload()
      }, error => {
        console.log(error)
      })
    }
    insertProduct() {
      this.product.name = this.name?.value
      this.productService.insertProduct(this.product).subscribe(response => {
        this.userService.setProduct(this.user?.value, response).subscribe(() => {
          location.reload()
        }, error => {
          console.log(error)
        })
      }, error => {
        console.log(error)
      })
    }

}
