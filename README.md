ip.js - Internet Protocol Javascript library
============================================


A JavaScript library to manipulate IPv4 addresses and subnets.


Overview
--------

The following methods are available:

   * **IPv4.Mask:**
       * `new IPv4.Mask(...)`
       * `IPV4.Mask.toString()`
   * **IPv4.Address:**
       * `new IPv4.Address(...)`
       * `IPV4.Address.toString()`
   * **IPv4.Subnet:**
       * `new IPv4.Subnet(...)`
       * `IPV4.Subnet.toString()`
       

Usage
-----


### IPv4.Subnet.isValidAddress ###

```
new IPv4.Subnet('192.168.1.0', 24).isValidAddress('192.168.1.10'); // true
new IPv4.Subnet('192.168.1.0', '24').isValidAddress('192.168.1.10'); // true
new IPv4.Subnet('192.168.1.0', '255.255.255.0').isValidAddress('192.168.1.10'); // true
```
```
new IPv4.Subnet('192.168.2.0', 24).isValidAddress('192.168.1.10'); // false
new IPv4.Subnet('192.168.2.0', '24').isValidAddress('192.168.1.10'); // false
new IPv4.Subnet('192.168.2.0', '255.255.255.0').isValidAddress('192.168.1.10'); // false
```
```
new IPv4.Subnet(
		new IPv4.Address('192.168.1.0'),
		new IPv4.Mask('255.255.255.0')
	).isValidAddress(
		new IPv4.Address('192.168.1.10')
	);  // true
```
```
new IPv4.Subnet(
		new IPv4.Address('192.168.1.0'),
		new IPv4.Mask('255.255.255.0')
	).isValidAddress(
		new IPv4.Address('192.168.2.10')
	);  // false
```


### IPv4.Pool.getFirstAvailable/getLastAvailable ###


```
var pool1 = new IPv4.Subnet('192.168.0.0', 29).toPool();
pool1.getFirstAvailable(); // '192.168.0.1'
pool1.getLastAvailable(); // '192.168.0.6'
```

```
var pool2 = new IPv4.Subnet('192.168.0.0', 29).toPool();
pool2
	.allocate('192.168.0.1')
	.allocate('192.168.0.2')
	.allocate('192.168.0.5')
	.allocate('192.168.0.6');
pool1.getFirstAvailable(); // '192.168.0.3'
pool1.getLastAvailable(); // '192.168.0.4'
```

```
var pool3 = new IPv4.Subnet('192.168.0.0', 29).toPool();
pool3.allocate(['192.168.0.1', '192.168.0.2', '192.168.0.3', '192.168.0.4', '192.168.0.5', '192.168.0.6']);
pool3.getFirstAvailable(); // null (none available)
pool3.getLastAvailable(); // null (none available)
```


Benefits
--------

   - Full [RFC791](1) compliance
   - Ultra lightweight: only 5kB minified


License
-------

Copyright (C) 2012 Alexandre Mercier

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[1]: (http://tools.ietf.org/html/rfc791)
