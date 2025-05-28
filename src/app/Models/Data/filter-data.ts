import { FormControl } from "@angular/forms";
import { FilterTypeEnum } from "../../shared/Enums/filter-type.enum";
import { CustomKeyValue } from "./key-value";

export class FilterData {
	name: string;
	control: FormControl<string> | FormControl<CustomKeyValue[]>;
	type: FilterTypeEnum;
	customKeyValue?: CustomKeyValue[];

	constructor(name: string, control: FormControl, type: FilterTypeEnum, customKeyValue?: CustomKeyValue[]) {
		this.name = name;
		this.control = control;
		this.type = type;
		this.customKeyValue = customKeyValue;
	}
}