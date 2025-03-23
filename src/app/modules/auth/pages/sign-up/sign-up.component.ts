import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableFilterService } from 'src/app/modules/uikit/pages/table/services/table-filter.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [FormsModule, RouterLink, AngularSvgIconModule, ButtonComponent, NgFor],
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
  constructor(
    public filterService: TableFilterService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

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
    this.cdr.detectChanges()
  }
}
