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


    IPv4.isAddressInSubnet('192.168.1.10', '192.168.1.0', 24); // true
    IPv4.isAddressInSubnet('192.168.1.10', '192.168.1.0', '24'); // true
    IPv4.isAddressInSubnet('192.168.1.10', '192.168.1.0', '255.255.255.0'); // true
    
    
    IPv4.isAddressInSubnet('192.168.2.10', '192.168.1.0', 24); // false
    IPv4.isAddressInSubnet('192.168.2.10', '192.168.1.0', '24'); // false
    IPv4.isAddressInSubnet('192.168.2.10', '192.168.1.0', '255.255.255.0'); // false




### Object-oriented methods ###


#### IPv4.Subnet.isValidAddress ####


    new IPv4.Subnet('192.168.1.0', 24).isValidAddress('192.168.1.10'); // true
    new IPv4.Subnet('192.168.1.0', '24').isValidAddress('192.168.1.10'); // true
    new IPv4.Subnet('192.168.1.0', '255.255.255.0').isValidAddress('192.168.1.10'); // true


    new IPv4.Subnet('192.168.2.0', 24).isValidAddress('192.168.1.10'); // false
    new IPv4.Subnet('192.168.2.0', '24').isValidAddress('192.168.1.10'); // false
    new IPv4.Subnet('192.168.2.0', '255.255.255.0').isValidAddress('192.168.1.10'); // false


    new IPv4.Subnet(
            new IPv4.Address('192.168.1.0'),
            new IPv4.Mask('255.255.255.0')
        ).isValidAddress(
            new IPv4.Address('192.168.1.10')
        ); // true


    new IPv4.Subnet(
            new IPv4.Address('192.168.1.0'),
            new IPv4.Mask('255.255.255.0')
        ).isValidAddress(
            new IPv4.Address('192.168.2.10')
        ); // false


Benefits
--------




License
-------


