import { FormControl } from "@angular/forms";
import { FilterTypeEnum } from "../../shared/Enums/filter-type.enum";

export class FilterData {
	name: string;
	control: FormControl;
	type: FilterTypeEnum;

	constructor(name: string, control: FormControl, type: FilterTypeEnum) {
		this.name = name;
		this.control = control;
		this.type = type;
	}
}