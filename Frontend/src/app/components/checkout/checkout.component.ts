import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { FormManagerService } from 'src/app/services/form-manager.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;

  totalPrice = 0;
  totalQuantity = 0;

  creditCardYears: number[];
  creditCardMounths: number[];

  countries :Country[]=[];
  states :State[]=[];

  shippingAddressStates:State[]=[];
  billingAddressStates:State[]=[];

  constructor(private formBuilder: FormBuilder, private formSerivce: FormManagerService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      // the key is customer
      customer: this.formBuilder.group({
        firstName: [''],
        lasttName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMounth: [''],
        expirationYear: ['']
      })
    });
    //
    //populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    this.formSerivce.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("credit card months" + JSON.stringify(data));
        this.creditCardMounths = data;
      }
    );
    //populate credit card years
    this.formSerivce.getCreditCardYears().subscribe(
      data => {
        console.log("credit card years" + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )

    //populate Countries
    this.formSerivce.getCountries().subscribe(
      data => {
        console.log('countries'+JSON.stringify(data));
        this.countries=data;
      }
    );

  }

  onSubmit() {
    console.log(this.checkoutFormGroup.get('customer').value);
  }

  copyShppingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    } else {
      // reset() to clear fields
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.formSerivce.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMounths=data
    );
  }

  getStates(formGroupName:string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    this.formSerivce.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates=data;
        }else{
          this.billingAddressStates=data;
        }
        //select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );
  }

}
