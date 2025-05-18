import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingCircleDirective } from "./directives/loading-circle.directive";

@NgModule({
  declarations: [LoadingCircleDirective],
  imports: [CommonModule],
  exports: [LoadingCircleDirective]
})
export class SharedModule {}