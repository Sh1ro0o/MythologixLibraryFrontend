import { Component, effect, input, output, signal, WritableSignal } from '@angular/core';
import { FilterData } from '../../../Models/data/filter-data';
import { FilterTypeEnum } from '../../Enums/filter-type.enum';
import { FormControl } from '@angular/forms';
import { KeyValue } from '../../../Models/data/key-value';

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
  filterChips: WritableSignal<KeyValue[]> = signal([]);


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
      const filterControlValue = filter.control?.value;
      const currentChips = this.filterChips();

      if (filterControlValue !== null && filterControlValue !== undefined && filterControlValue !== '') {
        const newFilterChip = new KeyValue(filter.name, filter.control?.value)

        this.filterChips.update(chipList => {
          //check if chip needs to change based on filter value change
          const existingIndex = currentChips.findIndex(x => x.key === filter.name);
          if (existingIndex !== -1) {
            if(chipList[existingIndex].value !== filterControlValue) {
              const updatedChips = [...chipList];
              updatedChips[existingIndex] = newFilterChip;

              return updatedChips;//update chip
            }
            return chipList; //no change needed
          }
          
          //if chip doesn't exist we add it
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
