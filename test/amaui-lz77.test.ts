/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate } from '../utils/js/test/utils';

import AmauiLz77 from '../src';

group('@amaui/lz77', () => {

  to('AmauiLZ77Response', async () => {
    const value = new AmauiLz77.AmauiLZ77Response(
      'a',
      14,
      1,
      1.14,
      14.4,
      true,
      1.04,
      '1 milliseconds'
    );

    const valueBrowsers = await evaluate((window: any) => {
      const value = new window.AmauiLz77.AmauiLZ77Response(
        'a',
        14,
        1,
        1.14,
        14.4,
        true,
        1.04,
        '1 milliseconds'
      );

      return value;
    });
    const valueNode = value;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql({
      value: 'a',
      original_byte_size: 14,
      value_byte_size: 1,
      compression_ratio: 1.14,
      compression_percentage: 14.4,
      positive: true,
      performance_milliseconds: 1.04,
      performance: '1 milliseconds',
    }));
  });

  group('AmauiLz77', () => {

    group('AmauiLz77', () => {

      to('AmauiLZ77Response', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return [
            new window.AmauiLz77.AmauiLZ77Response() instanceof window.AmauiLz77.AmauiLZ77Response,
          ];
        });
        const valueNode = [
          new AmauiLz77.AmauiLZ77Response() instanceof AmauiLz77.AmauiLZ77Response,
        ];
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          true,
        ]));
      });

      to('decode', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return [
            window.AmauiLz77.decode('').value,
            window.AmauiLz77.decode(' ').value,
            window.AmauiLz77.decode('  ').value,
            window.AmauiLz77.decode('   ').value,
            window.AmauiLz77.decode(' a').value,
            window.AmauiLz77.decode(' Lorem a ipsum dolor sit amet, consectetur adipiscing elit. Fusce`1f,8`em, facilisis sed erat`23,b`pharetra blandit augue. Sed id placerat felis, malesuada rutrum nisl. In ultrices sed mauris finibus m`1i,8`. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat. Proin egestas`6c,8`elit,`9d,9` molestie nisi semper at. Cras interdum massa nec m`1d,8`rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.').value,
          ];
        });
        const valueNode = [
          AmauiLz77.decode('').value,
          AmauiLz77.decode(' ').value,
          AmauiLz77.decode('  ').value,
          AmauiLz77.decode('   ').value,
          AmauiLz77.decode(' a').value,
          AmauiLz77.decode(' Lorem a ipsum dolor sit amet, consectetur adipiscing elit. Fusce`1f,8`em, facilisis sed erat`23,b`pharetra blandit augue. Sed id placerat felis, malesuada rutrum nisl. In ultrices sed mauris finibus m`1i,8`. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat. Proin egestas`6c,8`elit,`9d,9` molestie nisi semper at. Cras interdum massa nec m`1d,8`rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.').value,
        ];
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          '',
          '',
          ' ',
          '  ',
          'a',
          'Lorem a ipsum dolor sit amet, consectetur adipiscing elit. Fusce dolor sem, facilisis sed erat sit amet, pharetra blandit augue. Sed id placerat felis, malesuada rutrum nisl. In ultrices sed mauris finibus malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat. Proin egestas mauris elit, sit amet molestie nisi semper at. Cras interdum massa nec molestie rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.'
        ]));

      });

      to('prefix', async () => {
        const special = ['`', `'`, `"`, '(', ')', '|', ',', '+', '*', '-', '.', '^', ';', ':', '=', '?', '[', ']', '_'];

        const valueBrowsers = await evaluate((window: any) => {
          const special = ['`', `'`, `"`, '(', ')', '|', ',', '+', '*', '-', '.', '^', ';', ':', '=', '?', '[', ']', '_'];

          return [
            window.AmauiLz77.prefix(''),
            window.AmauiLz77.prefix('a'),
            window.AmauiLz77.prefix('a `1a,4` u uuvu'),
            window.AmauiLz77.prefix(special.reduce((result, item) => result += ` ${item}1a,4${item} `, '')),
          ];
        });
        const valueNode = [
          AmauiLz77.prefix(''),
          AmauiLz77.prefix('a'),
          AmauiLz77.prefix('a `1a,4` u uuvu'),
          AmauiLz77.prefix(special.reduce((result, item) => result += ` ${item}1a,4${item} `, '')),
        ];
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          '`',
          '`',
          `'`,
          '``'
        ]));
      });

    });

    group('amauiLZ77Response', () => {

      to('response', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return [
            new window.AmauiLz77('').response,
            new window.AmauiLz77(4 as any).response,
            new window.AmauiLz77(' ').response,
            new window.AmauiLz77('  ').response,
            new window.AmauiLz77('a').response,
            new window.AmauiLz77('Lorem u ipsum dolor sit amet, consectetur adipiscing elit.Fuscem dolor em, facilisis sed eratr sit amet,pharetra blandit augue.Sed id placerat felis, malesuada rutrum nisl.In ultrices sed mauris finibus mmalesuad.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat.Proin egestassed maurelit, eratr sit molestie nisi semper at.Cras interdum massa nec mmolestierutrum.Duis commodo venenatis justo, ac porta tellus pellentesque sed.Donec et nisi aumus.').response,
            new window.AmauiLz77(new Uint8Array([97, 97, 97])).response,
          ]
            .map(item => {
              delete item.performance;
              delete item.performance_milliseconds;

              return item;
            });
        });
        const valueNode = [
          new AmauiLz77('').response,
          new AmauiLz77(4 as any).response,
          new AmauiLz77(' ').response,
          new AmauiLz77('  ').response,
          new AmauiLz77('a').response,
          new AmauiLz77('Lorem u ipsum dolor sit amet, consectetur adipiscing elit.Fuscem dolor em, facilisis sed eratr sit amet,pharetra blandit augue.Sed id placerat felis, malesuada rutrum nisl.In ultrices sed mauris finibus mmalesuad.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat.Proin egestassed maurelit, eratr sit molestie nisi semper at.Cras interdum massa nec mmolestierutrum.Duis commodo venenatis justo, ac porta tellus pellentesque sed.Donec et nisi aumus.').response,
          new AmauiLz77(new Uint8Array([97, 97, 97])).response,
          new AmauiLz77(Buffer.from([97, 97, 97])).response,
        ]
          .map(item => {
            delete item.performance;
            delete item.performance_milliseconds;

            return item;
          });
        const values = [valueNode.slice(0, 7), ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          {
            value: ' ',
            original_byte_size: 0,
            value_byte_size: 1,
            compression_ratio: 0,
            compression_percentage: -100,
            positive: false
          },
          {
            value: '',
            original_byte_size: undefined,
            value_byte_size: undefined,
            compression_ratio: undefined,
            compression_percentage: undefined,
            positive: undefined
          },
          {
            value: '  ',
            original_byte_size: 1,
            value_byte_size: 2,
            compression_ratio: 0.5,
            compression_percentage: -100,
            positive: false
          },
          {
            value: '   ',
            original_byte_size: 2,
            value_byte_size: 3,
            compression_ratio: 0.67,
            compression_percentage: -50,
            positive: false
          },
          {
            value: ' a',
            original_byte_size: 1,
            value_byte_size: 2,
            compression_ratio: 0.5,
            compression_percentage: -100,
            positive: false
          },
          {
            value: ' Lorem u ipsum dolor sit amet, consectetur adipiscing elit.Fusce`1f,8`em, facilisis sed erat`23,b`pharetra blandit augue.Sed id placerat felis, malesuada rutrum nisl.In ultrices sed mauris finibus m`1i,8`.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat.Proin egestas`6c,8`elit,`9d,b`molestie nisi semper at.Cras interdum massa nec m`1d,8`rutrum.Duis commodo venenatis justo, ac porta tellus pellentesque sed.Donec et nisi aumus.',
            original_byte_size: 583,
            value_byte_size: 566,
            compression_ratio: 1.03,
            compression_percentage: 2.92,
            positive: true
          },
          {
            value: '2 aaa',
            original_byte_size: 3,
            value_byte_size: 5,
            compression_ratio: 0.6,
            compression_percentage: -66.67,
            positive: false
          }
        ]));

        assert(valueNode[7]).eql({
          value: '1 aaa',
          original_byte_size: 3,
          value_byte_size: 5,
          compression_ratio: 0.6,
          compression_percentage: -66.67,
          positive: false
        });
      });

      to('encode', async () => {
        let amauiLz77: any = [
          new AmauiLz77(''),
          new AmauiLz77(' '),
          new AmauiLz77('  '),
          new AmauiLz77('a'),
          new AmauiLz77('Lorem u ipsum dolor sit amet, consectetur adipiscing elit.Fuscem dolor em, facilisis sed eratr sit amet,pharetra blandit augue.Sed id placerat felis, malesuada rutrum nisl.In ultrices sed mauris finibus mmalesuad.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat.Proin egestassed maurelit, eratr sit molestie nisi semper at.Cras interdum massa nec mmolestierutrum.Duis commodo venenatis justo, ac porta tellus pellentesque sed.Donec et nisi aumus.'),
          new AmauiLz77(new Uint8Array([97, 97, 97])),
          new AmauiLz77(Buffer.from([97, 97, 97])),
        ];

        amauiLz77 = amauiLz77.map(item => {
          item.getVariant();

          if (typeof item.value === 'string') {
            item.valueInit = item.value as string;

            item.value = new TextEncoder().encode(item.value as string);
          }

          if (Buffer.isBuffer(item.value)) item.valueInit = (item.value as Buffer).toString('utf-8');
          if (item.value instanceof Uint8Array) item.valueInit = new TextDecoder().decode(item.value as Uint8Array);

          item.encode();

          return item.response;
        });

        const valueBrowsers = await evaluate((window: any) => {
          let amauiLz77 = [
            new window.AmauiLz77(''),
            new window.AmauiLz77(' '),
            new window.AmauiLz77('  '),
            new window.AmauiLz77('a'),
            new window.AmauiLz77('Lorem u ipsum dolor sit amet, consectetur adipiscing elit.Fuscem dolor em, facilisis sed eratr sit amet,pharetra blandit augue.Sed id placerat felis, malesuada rutrum nisl.In ultrices sed mauris finibus mmalesuad.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat.Proin egestassed maurelit, eratr sit molestie nisi semper at.Cras interdum massa nec mmolestierutrum.Duis commodo venenatis justo, ac porta tellus pellentesque sed.Donec et nisi aumus.'),
            new window.AmauiLz77(new Uint8Array([97, 97, 97])),
          ];

          amauiLz77 = amauiLz77.map(item => {
            item.getVariant();

            if (typeof item.value === 'string') {
              item.valueInit = item.value as string;

              item.value = new TextEncoder().encode(item.value as string);
            }

            if (item.value instanceof Uint8Array) item.valueInit = new TextDecoder().decode(item.value as Uint8Array);

            item.encode();

            return item.response;
          });

          return amauiLz77
            .map(item => {
              delete item.performance;
              delete item.performance_milliseconds;

              return item;
            });
        });
        const valueNode = amauiLz77
          .map(item => {
            delete item.performance;
            delete item.performance_milliseconds;

            return item;
          });
        const values = [valueNode.slice(0, 6), ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          {
            value: ' ',
            original_byte_size: 0,
            value_byte_size: 1,
            compression_ratio: 0,
            compression_percentage: -100,
            positive: false
          },
          {
            value: '  ',
            original_byte_size: 1,
            value_byte_size: 2,
            compression_ratio: 0.5,
            compression_percentage: -100,
            positive: false
          },
          {
            value: '   ',
            original_byte_size: 2,
            value_byte_size: 3,
            compression_ratio: 0.67,
            compression_percentage: -50,
            positive: false
          },
          {
            value: ' a',
            original_byte_size: 1,
            value_byte_size: 2,
            compression_ratio: 0.5,
            compression_percentage: -100,
            positive: false
          },
          {
            value: ' Lorem u ipsum dolor sit amet, consectetur adipiscing elit.Fusce`1f,8`em, facilisis sed erat`23,b`pharetra blandit augue.Sed id placerat felis, malesuada rutrum nisl.In ultrices sed mauris finibus m`1i,8`.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat.Proin egestas`6c,8`elit,`9d,b`molestie nisi semper at.Cras interdum massa nec m`1d,8`rutrum.Duis commodo venenatis justo, ac porta tellus pellentesque sed.Donec et nisi aumus.',
            original_byte_size: 583,
            value_byte_size: 566,
            compression_ratio: 1.03,
            compression_percentage: 2.92,
            positive: true
          },
          {
            value: '2 aaa',
            original_byte_size: 3,
            value_byte_size: 5,
            compression_ratio: 0.6,
            compression_percentage: -66.67,
            positive: false
          }
        ]));

        assert(valueNode[6]).eql({
          value: '1 aaa',
          original_byte_size: 3,
          value_byte_size: 5,
          compression_ratio: 0.6,
          compression_percentage: -66.67,
          positive: false
        });
      });

      to('decode', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new window.AmauiLz77().decode('').value,
            new window.AmauiLz77().decode(' ').value,
            new window.AmauiLz77().decode('  ').value,
            new window.AmauiLz77().decode('   ').value,
            new window.AmauiLz77().decode(' a').value,
            new window.AmauiLz77().decode(' Lorem u ipsum dolor sit amet, consectetur adipiscing elit. Fusce`1f,8`em, facilisis sed erat`23,b`pharetra blandit augue. Sed id placerat felis, malesuada rutrum nisl. In ultrices sed mauris finibus m`1i,8`. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat. Proin egestas`6c,8`elit,`9d,9` molestie nisi semper at. Cras interdum massa nec m`1d,8`rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.').value,
          ];

          const uint8Array = new window.AmauiLz77().decode('1 aaa').value;
          const uint8Array1 = new window.AmauiLz77().decode('2 aaa').value;

          [uint8Array, uint8Array1].forEach(item => values_.push([
            item instanceof Uint8Array,
            [...item],
          ]));

          return values_;
        });
        const values_ = [
          new AmauiLz77().decode('').value,
          new AmauiLz77().decode(' ').value,
          new AmauiLz77().decode('  ').value,
          new AmauiLz77().decode('   ').value,
          new AmauiLz77().decode(' a').value,
          new AmauiLz77().decode(' Lorem u ipsum dolor sit amet, consectetur adipiscing elit. Fusce`1f,8`em, facilisis sed erat`23,b`pharetra blandit augue. Sed id placerat felis, malesuada rutrum nisl. In ultrices sed mauris finibus m`1i,8`. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat. Proin egestas`6c,8`elit,`9d,9` molestie nisi semper at. Cras interdum massa nec m`1d,8`rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.').value,
        ];

        const buffer = new AmauiLz77().decode('1 aaa').value;
        const uint8Array = new AmauiLz77().decode('2 aaa').value;

        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers.map(item => item.slice(0, 6))];

        values.forEach(value => assert(value).eql([
          '',
          '',
          ' ',
          '  ',
          'a',
          'Lorem u ipsum dolor sit amet, consectetur adipiscing elit. Fusce dolor sem, facilisis sed erat sit amet, pharetra blandit augue. Sed id placerat felis, malesuada rutrum nisl. In ultrices sed mauris finibus malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat. Proin egestas mauris elit, sit amet molestie nisi semper at. Cras interdum massa nec molestie rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.'
        ]));

        [[uint8Array instanceof Uint8Array, [...uint8Array]], ...valueBrowsers.flatMap(item => item.slice(6))].forEach(value => assert(value).eql([true, [97, 97, 97]]));

        assert(buffer instanceof Buffer).eq(true);
        assert([...buffer]).eql([97, 97, 97]);
      });

    });

  });

});
