export class FilterChipData {
    key: string;
    value: string | number | object;

    constructor(key: string, value: string | number | object) {
		this.key = key;
		this.value = value;
	}
}