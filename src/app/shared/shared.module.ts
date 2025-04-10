import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from './directives/role.directive';

@NgModule({
  imports: [CommonModule, RoleDirective],
  exports: [RoleDirective]
})
export class SharedModule { }
