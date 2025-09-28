
</br>
</br>

<p align='center'>
  <a target='_blank' rel='noopener noreferrer' href='#'>
    <img width='auto' height='84' src='https://raw.githubusercontent.com/onesy-me/onesy/refs/heads/main/utils/images/logo.png' alt='onesy logo' />
  </a>
</p>

<h1 align='center'>onesy LZ77</h1>

<h3 align='center'>
  <sub>MIT license&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Production ready&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>UMD 10.6kb gzipped&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>100% test cov&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Browser and Nodejs</sub>
</h3>

<p align='center'>
  <sub>Very simple code&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Modern code&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Junior friendly&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Typescript&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Made with :yellow_heart:</sub>
</p>

<br />

## Getting started

### Add

```sh
yarn add @onesy/lz77
```

### Use

```javascript
  import OnesyLz77 from '@onesy/lz77';

  // Make a new lz77 instance with a value
  const onesyLz77 = new OnesyLz77('Lorem u ipsum dolor sit amet amet amet amet amet amet amet, consectetur adipiscing elit. Proin egestas mauris elit, sit amet molestie nisi semper at. Cras interdum massa nec molestie rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus. Proin egestas mauris elit, sit amet molestie nisi semper at. Cras interdum massa nec molestie rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus. Proin egestas mauris elit, sit amet molestie nisi semper at. Cras interdum massa nec molestie rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus. Proin egestas mauris elit, sit amet molestie nisi semper at. Cras interdum massa nec molestie rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.');

  // Encoded
  // or very simply onesyLz77.response
  const response = onesyLz77.encoded;

  // {
  //   "value": " Lorem u ipsum dolor sit ame`5,v`, consectetur adipiscing elit. Proin egestas mauris elit,`2o,a`molestie nisi semper at. Cras interdum massa nec `1d,9`rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.`57,fl`",
  //   "original_byte_size": 836,
  //   "value_byte_size": 250,
  //   "compression_ratio": 3.34,
  //   "compression_percentage": 70.1,
  //   "positive": true,
  //   "performance_milliseconds": 14,
  //   "performance": "14 milliseconds"
  // }

  // Decode
  // with onesyLz77.decode or onesyLz77.decode a static method
  OnesyLz77.decode(response.value);

  // {
  //   "value": "Lorem u ipsum dolor sit amet amet amet amet amet amet amet, consectetur adipiscing elit. Proin egestas mauris elit, sit amet molestie nisi semper at. Cras interdum massa nec molestie rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus. Proin egestas mauris elit, sit amet molestie nisi semper at. Cras interdum massa nec molestie rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus. Proin egestas mauris elit, sit amet molestie nisi semper at. Cras interdum massa nec molestie rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus. Proin egestas mauris elit, sit amet molestie nisi semper at. Cras interdum massa nec molestie rutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.",
  //   "original_byte_size": 836,
  //   "value_byte_size": 250,
  //   "performance_milliseconds": 1,
  //   "performance": "1 millisecond"
  // }
```

### Dev

Install

```sh
yarn
```

Test

```sh
yarn test
```

### Prod

Build

```sh
yarn build
```
