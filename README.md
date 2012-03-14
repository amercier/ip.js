ip.js - Internet Protocol Javascript library
============================================


A JavaScript library to manipulate IPv4 addresses and subnets.


Overview
--------

The following static methods are available:

   * `IPv4.isAddressInSubnet`: check whether an IP address is in a subnet
   * `IPv4.isSubnetNetworkAddress`: check whether an IP address is the network address of a subnet
   * `IPv4.getSubnetNetworkAddress`: get the network address of a subnet
   * `IPv4.isSubnetBroadcastAddress`: check whether an IP address is the network address of a subnet
   * `IPv4.getSubnetBroadcastAddress`: get the broadcast address of a subnet



The following Class methods are available:

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

### Static methods ###

#### IPv4.isAddressInSubnet ####

```
IPv4.isAddressInSubnet('192.168.1.10', '192.168.1.0', 24); // true
IPv4.isAddressInSubnet('192.168.1.10', '192.168.1.0', '24'); // true
IPv4.isAddressInSubnet('192.168.1.10', '192.168.1.0', '255.255.255.0'); // true
```
```
IPv4.isAddressInSubnet('192.168.2.10', '192.168.1.0', 24); // false
IPv4.isAddressInSubnet('192.168.2.10', '192.168.1.0', '24'); // false
IPv4.isAddressInSubnet('192.168.2.10', '192.168.1.0', '255.255.255.0'); // false
```



### Object-oriented methods ###


#### IPv4.Subnet.isValidAddress ####

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


Benefits
--------

   - Full [RFC791](1) compliance
   - Ultra lightweight: only 2kB minified


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
