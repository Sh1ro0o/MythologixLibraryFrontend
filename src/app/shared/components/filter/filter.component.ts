import { Component, effect, input, output, signal, WritableSignal } from '@angular/core';
import { FilterData } from '../../../Models/data/filter-data';
import { FilterTypeEnum } from '../../enums/filter-type.enum';
import { FormControl } from '@angular/forms';
import { CustomKeyValue } from '../../../Models/data/key-value';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})

export class FilterComponent {
  //Input - List of filters passed from the parent component
  //Each filter contains a name, type, and FormControl
  //For FilterTypeEnum.Checkbox display filter should contain a CustomKeyValue[] (key: id, value: string to display to user)
  filterData = input.required<FilterData[]>();
  
  //Output - Emits the current filter state (after applying or resetting),
  applyFilters = output<FilterData[]>();

  isFiltering: boolean = false;
  filterTypeEnum = FilterTypeEnum;
  localFilters: WritableSignal<FilterData[]> = signal([]);
  
  filterChips: WritableSignal<CustomKeyValue[]> = signal([]);

  constructor() {
    //create new local array from input signal
    effect(() => {
      const clonedFilters: FilterData[] = this.filterData().map(data => {
        const isCheckbox = data.type === FilterTypeEnum.Checkbox;

        //clone value based on expected type
        let clonedControl: FormControl<string | CustomKeyValue[]>; 
        if (isCheckbox) {
          clonedControl = new FormControl<CustomKeyValue[]>([...data.control.value as CustomKeyValue[] ?? []], { nonNullable: true });
        }
        else {
          clonedControl = new FormControl<string>(data.control.value as string ?? '', { nonNullable: true });
        }

        return new FilterData(
          data.name,
          clonedControl,
          data.type,
          [...data.customKeyValue ?? []]
        );
      });

      this.localFilters.set(clonedFilters);
      
      //setup eventlistener for trimming of formcontrol string values
      clonedFilters.forEach(filter => {
      if (filter.type === FilterTypeEnum.String) {
          const control = filter.control as FormControl<string>;
          control.valueChanges.subscribe(value => {
            const trimmed = value?.trim() ?? '';
            if (value !== trimmed) {
              control.setValue(trimmed, { emitEvent: false });
            }
          });
        }
      });
    });
  }

  /*
  *   Called when user clicks "Apply Filters" button
  * - Creates chips for active filters
  * - Emits current filter state to parent
  */
  onApplyFilters() {
    this.createChips()
    this.applyFilters.emit(this.localFilters());
  }

  /*
  *   Called when user clicks "Reset Filters"
  * - Resets all FormControls to initial state
  * - Clears all filter chips
  * - Emits cleared filter state to parent
  */
  onResetFilters() {
    //reset form controls
    this.localFilters.update(filters =>
      filters.map(filter => {
        filter.control.reset();

        return filter;
      })
    );

    //clear chips
    this.filterChips.set([]);

    //notify parent
    this.applyFilters.emit(this.localFilters());
  }

  /*
  *   Builds/updates the chip list based on the current state of filters
  * - Avoids duplicates
  * - Updates chip value if the filter value has changed
  */
  createChips() {
    this.localFilters().forEach(filter => {
      const currentChips = this.filterChips();
      
      //format the value correctly based on filter type
      let filterControlValue: string;
      if (filter.type === this.filterTypeEnum.Checkbox) {
        let checkboxControlValue = filter.control as FormControl<CustomKeyValue[]>;
        filterControlValue = checkboxControlValue?.value?.map((keyValue: CustomKeyValue) => keyValue.value).join(', ');
      } else {
        let stringControlValue = filter.control as FormControl<string>;
        filterControlValue = stringControlValue?.value;
      }

      //if user sets filter to empty string remove the chip
      if (filterControlValue === '') {
        this.removeChip(filter.name);
      }
      else if (filterControlValue !== null && filterControlValue !== undefined) {
        const newFilterChip = new CustomKeyValue(filter.name, filterControlValue)

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

  /*
  *   Removes a chip and resets the corresponding filter
  * - Removes visual chip
  * - Resets matching FormControl
  * - Emits updated filters to parent
  */
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

  onCheckboxChange(event: MatCheckboxChange, control: FormControl, checkboxKeyValue: CustomKeyValue) {
    const checkboxControl = control as FormControl<CustomKeyValue[]>;
    const currentValues = checkboxControl.value || [];

    if (event.checked) {
      control.setValue([...currentValues, checkboxKeyValue]);
    } else {
      control.setValue(currentValues.filter(x => x !== checkboxKeyValue));
    }
  }

  isCheckboxChecked(control: FormControl, checkboxKeyValue: CustomKeyValue) {
    const checkboxControl = control as FormControl<CustomKeyValue[]>;

    if (Array.isArray(checkboxControl.value)) {
      return checkboxControl.value.some(item => item.key === checkboxKeyValue.key);
    }

    return false;
  }
}
