import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { ProductService } from '../product.service';
import { Cart } from '../cart/Cart';
import { Product } from '../product';
import { LoginService } from 'src/app/login/login.service';

@Component({
    templateUrl: 'product-list.component.html',
    styleUrls: ['product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    chkman: any = [];
    chkmanos: any = [];
    rate: number = 0;
    pageTitle = 'GoVeggies';
    imageWidth = 200;
    imageHeight = 200;
    imageMargin = 12;
    showImage = false;
    listFilter: string = '';
    errorMessage: string = '';
    products: any = [];
    selectedItems: any = 0;
    cart!: Cart;
    total = 0;
    orderId = 0;
    sub: any;
    i = 0;
    sortoption = '';
    chkmanosprice: any = [];

    @ViewChild('loginEl')
    loginVal!: ElementRef;
    @ViewChild('welcomeEl')
    welcomeVal!: ElementRef;

    // Fetches the products data from service class
    constructor(private productService: ProductService, private loginService: LoginService, private renderer: Renderer2) {
    }
    ngAfterViewInit() {
        this.loginVal = this.loginService.loginElement;
        // console.log(this.loginVal);
        this.welcomeVal = this.loginService.welcomeElement;    
        // console.log(this.welcomeVal);
        this.renderer.setProperty(this.loginVal.nativeElement, 'innerText', 'Logout');
       this.renderer.setStyle(this.welcomeVal.nativeElement, 'display', 'inline');
        let welcomeText="Welcome "+this.loginService.username+ "  "; 
        this.renderer.setProperty(this.welcomeVal.nativeElement, 'innerText', welcomeText);
       this.renderer.setStyle(this.welcomeVal.nativeElement, 'color', '#ff0080');

    }
    ngOnInit() {

        this.orderId++;

        this.productService.getProducts()
            .subscribe({
                next:products => {
                    this.productService.products = products;
                    this.products = this.productService.products; 
                    this.chkmanosprice =this.products
                },
                error:error => this.errorMessage = error});

        if (this.productService.selectedProducts.length > 0) {
            this.selectedItems = Number(sessionStorage.getItem('selectedItems'));
            this.total = Number(sessionStorage.getItem('grandTotal'));
        }
    }

    
    // filtering functionality
    filter(name: any) {      
        let checkedProducts: any[];
        this.chkman = [];
        this.chkmanos = [];
        this.chkmanosprice = [];
        const index = 0;
        checkedProducts = this.productService.products;     
      
        name.checked = (name.checked) ? false : true;     
        this.products = this.chkmanosprice;
    }


    // Invoked when user clicks on Add to Cart button
    // Adds selected product details to service class variable 
    // called selectedProducts
    addCart(id: number) {
        this.cart = new Cart();
        this.selectedItems += 1;

        // fetching selected product details
        const product = this.productService.products.filter((currProduct: any) => currProduct.productId === id)[0];
        this.total += product.price;
        sessionStorage.setItem('selectedItems', this.selectedItems);
        const sp = this.productService.selectedProducts.filter((currProduct: any) => currProduct.productId === id)[0];
        if (sp) {
            const index = this.productService.selectedProducts.findIndex((currProduct: any) => currProduct.productId === id);
            this.productService.selectedProducts[index].quantity += 1;
            this.productService.selectedProducts[index].totalPrice += product.price;
        } else {
            this.cart.orderId = 'ORD_' + this.orderId;
            this.cart.productId = id;
            this.cart.userId = sessionStorage.getItem('username') + '';
            this.cart.productName = product.productName;
            this.cart.price = product.price;
            this.cart.quantity = 1;
            this.cart.dateOfPurchase = new Date().toString();
            this.cart.totalPrice = product.price * this.cart.quantity;
            this.productService.selectedProducts.push(this.cart);
            sessionStorage.setItem('selectedProducts', JSON.stringify(this.productService.selectedProducts));
            this.orderId++;
        }
    }

    // Search box functionality
    // Searches based on manufacturer name
    searchtext() {
        this.products = this.productService.products;
        if (this.listFilter.length > 0) {
            this.products = this.products.filter((product: Product) =>
                product.productName.toLowerCase().indexOf(this.listFilter) !== -1);
        }
    }

    // Invoked when a tab (Tablets/Mobiles) is clicked
    // Displays tablets or mobiles data accordingly
    tabselect(producttype: string) {


        this.products = [];
        this.productService.producttype = producttype;
        this.productService.getProducts().subscribe({
            next: products => {        
                this.products = products;
                this.sortoption='';
            },
            error: error => this.errorMessage = error
        });
      
    }

    // Invoked when user select an option in sort drop down
    // changes the sortoption value accordingly
    onChange(value: string) {
        this.sortoption = value;
    }
}


