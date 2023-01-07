import is from '@amaui/utils/is';
import isEnvironment from '@amaui/utils/isEnvironment';
import to from '@amaui/utils/to';
import castParam from '@amaui/utils/castParam';
import AmauiDate from '@amaui/date/amaui-date';
import duration from '@amaui/date/duration';

export type TVariant = Buffer | Uint8Array | string;

class AmauiLZ77Response {

  public constructor(
    public value: any = '',
    public original_byte_size?: number,
    public value_byte_size?: number,
    public compression_ratio?: number,
    public compression_percentage?: number,
    public positive?: boolean,
    public performance_milliseconds?: number,
    public performance?: string
  ) { }

}

class AmauiLZ77 {
  public variant: TVariant;
  public response: AmauiLZ77Response = new AmauiLZ77Response();
  public valueString: string;
  public valueEncoded: Uint8Array | Buffer;

  public static get AmauiLZ77Response() { return AmauiLZ77Response; }

  public static decode(value: string) {
    return new AmauiLZ77().decode(value);
  }

  public static prefix(value: string): string {
    if (!is('string', value)) return '`';

    const special = ['`', `'`, `"`, '(', ')', '|', ',', '+', '*', '-', '.', '^', ';', ':', '=', '?', '[', ']', '_'];

    let index = 0;
    let amount = 1;
    let prefix = '';

    while (true) {
      prefix = special[index].repeat(amount);

      const regexp = new RegExp(`\\${prefix}[^\\${prefix}]{1,4},[^\\${prefix}]{1,4}\\${prefix}`);

      const match = value.match(regexp);

      if (!match) break;

      // Increment
      if (index === special.length - 1) {
        index = 0;
        amount++;
      }
      else index++;
    }

    return prefix;
  }

  public get encoded(): AmauiLZ77Response {
    return this.response;
  }

  public constructor(
    public value?: TVariant
  ) {
    if (this.value !== undefined) this.into();
  }

  private into(): void {
    if (['uint8array', 'buffer', 'string'].some(item => is(item, this.value))) {
      this.getVariant();

      if (is('string', this.value)) {
        this.valueString = this.value as string;

        this.valueEncoded = new TextEncoder().encode(this.value as string);
      }
      else this.valueEncoded = this.value as Uint8Array | Buffer;

      if (is('buffer', this.value)) this.valueString = (this.value as Buffer).toString('utf-8');
      if (is('uint8array', this.value)) this.valueString = new TextDecoder().decode(this.value as Uint8Array);

      // Encode
      this.encode();
    }
  }

  public encode(): AmauiLZ77Response {
    const startTime = AmauiDate.milliseconds;

    const prefix = AmauiLZ77.prefix(this.valueString);

    const windowLength = 32e4;

    const searchIndexes = { start: -1, end: 0 };
    let search = (this.valueEncoded as Uint8Array).subarray(searchIndexes.start, searchIndexes.end);

    const lookaheadIndexes = { start: 0, end: this.valueEncoded.length > windowLength ? windowLength : this.valueEncoded.length };
    let lookahead = (this.valueEncoded as Uint8Array).subarray(lookaheadIndexes.start, lookaheadIndexes.end);

    let output: any = [];

    const getItem = () => {
      const allFirstMatches = [];

      for (let i = searchIndexes.end - 1; i > -1; i--) {
        if (this.valueEncoded[i] === lookahead[0]) allFirstMatches.push(i);
      }

      if (!allFirstMatches.length) return [0, 0, lookaheadIndexes.start, lookaheadIndexes.start];

      let matchLongest = [];

      allFirstMatches.sort();

      for (let i = 0; i < allFirstMatches.length; i++) {
        const start = allFirstMatches[i];
        let offset = 2;

        let equal = this.equal((this.valueEncoded as Uint8Array).subarray(start, start + offset), (this.valueEncoded as Uint8Array).subarray(lookaheadIndexes.start, lookaheadIndexes.start + offset));

        while (equal) {
          offset += 1;

          equal = this.equal((this.valueEncoded as Uint8Array).subarray(start, start + offset), (this.valueEncoded as Uint8Array).subarray(lookaheadIndexes.start, lookaheadIndexes.start + offset));
        }

        if (!matchLongest.length || (offset >= matchLongest[1])) matchLongest = [start, offset];
      }

      return [lookaheadIndexes.start - matchLongest[0], matchLongest[1] - 1, lookaheadIndexes.start, lookaheadIndexes.start + matchLongest[1] - 1];
    };

    while (lookahead.length) {
      const [start, offset, lookaheadStartIndex, lookaheadEndIndex] = getItem();

      const diff = Math.abs(start - offset);

      let value = '';

      const valueToAppend = this.valueEncoded[lookaheadEndIndex];

      const actualValue: Uint8Array = (this.valueEncoded as Uint8Array).subarray(lookaheadStartIndex - start, lookaheadStartIndex - start + offset);

      if (!(start === 0 && offset === 0)) value = `${prefix}${start === offset ? this.valueEncode(start) : `${this.valueEncode(start)},${this.valueEncode(offset)}`}${prefix}`;

      output.push(...(to(actualValue.reduce((result, item) => result += String.fromCharCode(item), ''), 'byte-size') <= to(value, 'byte-size') ? actualValue : [value]), valueToAppend);

      const move = lookaheadEndIndex - lookaheadStartIndex + diff;

      searchIndexes.start = search.length + lookahead.length >= windowLength ? searchIndexes.start + move : 0;
      searchIndexes.end = lookaheadEndIndex + 1;

      lookaheadIndexes.start = searchIndexes.end;
      lookaheadIndexes.end += move;

      search = (this.valueEncoded as Uint8Array).subarray(searchIndexes.start, searchIndexes.end);
      lookahead = (this.valueEncoded as Uint8Array).subarray(lookaheadIndexes.start, lookaheadIndexes.end);
    }

    output = output.map((item: any) => is('number', item) ? String.fromCharCode(item) : item).join('');

    output = ` ${output}`;

    const variantCodeValue = this.variantToValue();

    if (variantCodeValue > 0 || prefix !== '`') {
      if (prefix !== '`') output = `${prefix}${output}`;

      if (variantCodeValue > 0) output = `${variantCodeValue}${output}`;
    }

    const response: AmauiLZ77Response = new AmauiLZ77Response(output);

    response.performance_milliseconds = AmauiDate.milliseconds - startTime;
    response.performance = duration(response.performance_milliseconds) || '0 milliseconds';
    response.original_byte_size = to(this.valueEncoded, 'byte-size') as number;
    response.value_byte_size = to(response.value, 'byte-size') as number;
    response.compression_ratio = Number((((response.value_byte_size + response.original_byte_size) / response.value_byte_size) - 1).toFixed(2));
    response.compression_percentage = response.original_byte_size === 0 ? response.value_byte_size === 0 ? 0 : response.value_byte_size * -100 : Number(((((response.original_byte_size - response.value_byte_size) / response.original_byte_size)) * 100).toFixed(2));
    response.positive = response.compression_ratio > 1;

    this.response = response;

    return response;
  }

  public decode(value_: string): AmauiLZ77Response {
    const response = new AmauiLZ77Response();

    const startTime = AmauiDate.milliseconds;

    if (is('string', value_)) {
      let meta = '';
      let value: any = value_;

      const indexSeparator = value_.indexOf(' ');

      meta = value_.substring(0, indexSeparator);

      value = value_.substring(indexSeparator + 1);

      let variant = '0';
      let prefix = '`';

      if (['1', '2'].indexOf(meta[0]) > -1) {
        variant = meta[0];
        meta = meta.substring(1);
      }

      if (meta.length) prefix = meta;

      const regexp = new RegExp(`\\${prefix}[^\\${prefix}]{1,4},[^\\${prefix}]{1,4}\\${prefix}`, 'g');

      const abbrs = value.match(regexp) || [];

      for (const abbr of abbrs) {
        let [position, offset] = abbr.slice(1, -1).split(',') as any;

        [position, offset] = [position, offset].map(item => this.valueDecode(item));

        const index = value.indexOf(abbr);
        const addStartIndex = index - position;
        const addEndIndex = addStartIndex + offset;

        const array = [];

        if (offset > position) {
          let left = offset;

          while (left > 0) {
            const add = value.substring(addStartIndex, left < position ? addStartIndex + left : addStartIndex + position);

            array.push(add);

            left -= position;
          }
        }
        else {
          const add = value.substring(addStartIndex, addEndIndex);

          array.push(add);
        }

        const itemValue = array.join('');

        value = value.replace(abbr, itemValue);
      }

      value = this.valueToVariant(value, variant);

      // Convert value back from UTF-16 -> Utf8Array -> Text decoded
      // ie. back to Japanese characters
      if (is('string', value)) {
        const array = [];

        value.split('').forEach(item => array.push(item.charCodeAt(0)));

        value = new TextDecoder().decode(new Uint8Array(array));
      }

      response.value = value;
      response.performance_milliseconds = AmauiDate.milliseconds - startTime;
      response.performance = duration(response.performance_milliseconds) || '0 milliseconds';
      response.original_byte_size = to(value, 'byte-size') as number;
      response.value_byte_size = to(value_, 'byte-size') as number;
    }

    return response;
  }

  private valueToVariant(value: string, variant_: string): TVariant {
    const variant = castParam(variant_);

    if (isEnvironment('nodejs') && variant === 1) return Buffer.from(value);

    if ((isEnvironment('browser') && variant === 1) || variant === 2) return new TextEncoder().encode(value);

    return value;
  }

  private variantToValue() {
    let value = 0;

    if (isEnvironment('nodejs') && (this.variant as any) === Buffer) value = 1;
    else if ((this.variant as any) === Uint8Array) value = 2;

    return value;
  }

  private valueEncode(value: string | number | bigint): string {
    return Number(value).toString(36);
  }

  private valueDecode(value: string): number {
    return parseInt(value, 36);
  }

  private getVariant(): void {
    if (isEnvironment('nodejs') && Buffer.isBuffer(this.value)) this.variant = Buffer as any;
    else if (is('uint8array', this.value)) this.variant = Uint8Array as any;
    else this.variant = String as any;
  }

  private equal(value: Uint8Array, value1: Uint8Array): boolean {
    return value.join('') === value1.join('');
  }
}

export default AmauiLZ77;
