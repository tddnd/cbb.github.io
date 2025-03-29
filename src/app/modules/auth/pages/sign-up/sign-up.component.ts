import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableFilterService } from 'src/app/modules/uikit/pages/table/services/table-filter.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AngularSvgIconModule,
    ButtonComponent,
    NgFor,
    NgIf,
    NgClass
  ],
})
export class SignUpComponent implements OnInit {
  genderValue: string = ''
  levelValue: string = ''
  typeSignUpValue = 0
  typeSignUpStringPlayer = 'light'
  typeSignUpStringOrg = 'light'
  levelsArray = [
    { id: 1, value: 'h', label: 'H' },
    { id: 2, value: 'g', label: 'G' },
    { id: 3, value: 'f', label: 'F' },
    { id: 4, value: 'e', label: 'E' },
    { id: 5, value: 'd', label: 'D' },
    { id: 6, value: 'c', label: 'C' },
    { id: 7, value: 'b', label: 'B' },
    { id: 8, value: 'a', label: 'A' },
  ]
  form!: FormGroup
  submitted = false;
  passwordTextType!: boolean;
  loadingApi = false;
  constructor(
    public filterService: TableFilterService,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      nickname: [''],
      gender: ['', Validators.required],
      level: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.form.get('confirmPassword')?.setValidators([
      Validators.required,
      control =>
        control.value === this.form.get('password')?.value
          ? null
          : { mismatch: true }
    ]);
  }

  get passwordMismatch() {
    return this.form.errors?.['mismatch'] && this.form.touched;
  }

  get f() {
    return this.form.controls;
  }

  onGenderChange(value: Event) {
    const selectElement = value.target as HTMLSelectElement;
    this.genderValue = selectElement.value
    // this.filterService.statusField.set(selectElement.value);
  }

  onLevelChange(value: Event) {
    const selectElement = value.target as HTMLSelectElement;
    this.levelValue = selectElement.value
    // this.filterService.statusField.set(selectElement.value);
  }

  onTypeSignUpChange(value: number) {
    this.typeSignUpValue = value
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    this.loadingApi = true;
    const { email, password } = this.form.value;

    if (this.form.invalid) {
      this.loadingApi = false;
      return;
    }

    this._router.navigate(['/']);
  }
}
