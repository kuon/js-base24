![GitHub Workflow Status](https://img.shields.io/github/workflow/status/kuon/js-base24/CI)
![npm](https://img.shields.io/npm/v/base24)
![NPM](https://img.shields.io/npm/l/base24)


# Base24

An encoder/decoder for
[base24 binary-to-text encoding](https://www.kuon.ch/post/2020-02-27-base24/)
for JavaScript.


## Installation

```shell
$ npm add base24
```


## Usage

```javascript

const Base24 = require('base24')

// Encode
let bytes = new Uint8Array([0x88, 0x55, 0x33, 0x11]);

let str = Base24.encode24(bytes);

str == "5YEATXA" // true

let bytes = Base24.decode24(str);

```

## License

Licensed under either of

 * Apache License, Version 2.0
   ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
 * MIT license
   ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

at your option.

## Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in the work by you, as defined in the Apache-2.0 license, shall be
dual licensed as above, without any additional terms or conditions.

