import { toHttpParams } from './http-utils';

describe('toHttpParams', () => {
  let object: {};

  beforeEach(() => {
    object = {
      stringValue: 'test',
      numberValue: 123,
      booleanValue: true,
      dateValue: new Date('2023-01-01'),
      arrayValue: [1, 2, 3],
      nestedObject: { key: 'value' },
      nullValue: null,
      undefinedValue: undefined
    };
  })

  it('should convert object to json', () => {
    //Arrange

    //Act
    const params = toHttpParams(object);

    //Assert
    expect(params.get('stringValue')).toBe('test');
    expect(params.get('numberValue')).toBe('123');
    expect(params.get('booleanValue')).toBe('true');
    expect(params.get('dateValue')).toBe(new Date('2023-01-01').toISOString());
    expect(params.getAll('arrayValue')).toEqual(['1', '2', '3']);
    expect(params.get('nestedObject')).toBe('{"key":"value"}');
    expect(params.get('nullValue')).toBeNull();
    expect(params.get('undefinedValue')).toBeNull();
  });
});