import { Component, effect, input, output, signal, WritableSignal } from '@angular/core';
import { FilterData } from '../../../Models/data/filter-data';
import { FilterTypeEnum } from '../../Enums/filter-type.enum';
import { FormControl } from '@angular/forms';
import { FilterChipData } from '../../../Models/data/filter-chip-data';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})

export class FilterComponent {
  //Input
  filterData = input.required<FilterData[]>();
  //Output
  applyFilters = output<FilterData[]>();

  isFiltering: boolean = false;
  filterTypeEnum = FilterTypeEnum;
  localFilters: WritableSignal<FilterData[]> = signal([]);
  filterChips: WritableSignal<FilterChipData[]> = signal([]);


  constructor() {
    effect(() => {
      //deep copy with FormControl
      const clonedFilters = this.filterData().map(data => ({
        name: data.name,
        type: data.type,
        control: new FormControl(data.control.value),
      }));

      this.localFilters.set(clonedFilters);
    });
  }

  onApplyFilters() {
    //create chips
    this.createChips()

    //notify parent
    this.applyFilters.emit(this.localFilters());
  }

  onResetFilters() {
    this.localFilters.update(filters =>
      filters.map(filter => {
        // Reset each control
        filter.control.reset();

        // Return the same filter (control is already updated)
        return filter;
      })
    );

    //clear chips
    this.filterChips.set([]);

    //notify parent
    this.applyFilters.emit(this.localFilters());
  }

  createChips() {
    this.localFilters().forEach(filter => {
      //if control value isnt empty and a filter doesn't already exist then we add a chip
      if ((filter.control?.value != '' && filter.control?.value != null) && !this.filterChips().some(x => x.key == filter.name)) {
        this.filterChips.update(chipList => {
          const newFilterChip = new FilterChipData(filter.name, filter.control?.value)
          return [...chipList, newFilterChip];
        });
      }
    });
  }

  removeChip(chipKey: string) {
    //remove chip
    this.filterChips.update(chipList =>
      chipList.filter(x => x.key != chipKey)
    );

    //update filters
    this.localFilters.update(filters => {
      return filters.map(filter => {
        if (filter.name === chipKey) {
          filter.control.reset();
        }

        return filter;
      });
    });

    //notify parent
    this.applyFilters.emit(this.localFilters());
  }
}
