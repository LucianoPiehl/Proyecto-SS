import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
    productList = new Array<Product>()
    userList = new Array<User>()
    userForm : FormGroup
    user = new User()
    id2: number
    name2: string
    price2:number
    stock2:number
    description2:string
    userId: number
    constructor(private productService: ProductService, private userService: UserService, private modalService: NgbModal) { }

    ngOnInit(): void {
      this.userForm = new FormGroup({
        'name': new FormControl(this.user.name, Validators.required),
        'user': new FormControl(this.userId)
      })
      this.userService.getAll().subscribe(response => {
        this.userList = response
      }, error => {
        console.log(error)
      })
      this.getAll()
    }

  get name() { return this.userForm.get('name') }
  // get user() { return this.userForm.get('user') }
  getAll(){
    this.userService.getAll().subscribe((response)=>{

    this.userList = response
    document.getElementsByTagName('input')[0].focus()

    },(error)=>{

      console.log(error)
      
    })
    }

    viewUser(user: User, ver: any) {
      this.id2 = user.id
      this.name2 = user.name
      this.modalService.open(ver).result.then(() => {
        user.name = this.name2
        this.userService.updateUser(user).subscribe(() => {
          location.reload()
        }, error => {
          console.log(error)
        })
      }, error => {
        console.log(error)
      })
    }
  
    deleteUser(id: number) {
      this.userService.deleteUser(id).subscribe(() => {
        location.reload()
      }, error => {
        console.log(error)
      })
    }
    // insertUser() {
    //   this.user.name = this.name?.value
    //   this.userService.insertUser(this.user).subscribe(response => {
    //     this.userService.setUser(this.user?.value, response).subscribe(() => {
    //       location.reload()
    //     }, error => {
    //       console.log(error)
    //     })
    //   }, error => {
    //     console.log(error)
    //   })
    // }

}
