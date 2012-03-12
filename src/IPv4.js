/*! ip.js by Alexandre Mercier - https://github.com/amercier/ip.js */

/**
 * The operands of all bitwise operators are converted to signed 32-bit integers
 * in big-endian order and in two's complement format. Big-endian order means
 * that the most significant bit (the bit position with the greatest value) is
 * the left-most bit if the 32 bits are arranged in a horizontal line. Two's
 * complement format means that a number's negative counterpart (e.g. 5 vs. -5)
 * is all the number's bits inverted (bitwise NOT of the number, a.k.a. one's
 * complement of the number) plus one.
 */


var IPv4 = {};

/**
 * Create an IP address
 * 
 * @param {String/Number} address
 * @constructor
 */
IPv4.Address = function(address) {
	
	// Check parameter
	if(typeof address !== 'string' && typeof address !== 'number') {
		throw 'Expecting parameter to be a String/Number, "' + (typeof address) + '" given.';
	}
	
	// If the address is a number, consider it as the IP Address number representation
	if(/^-?[0-9]+$/.test(address)) {
		
		this.address = Number(address);
		
		if(this.address < -2147483648 || this.address > 2147483647) {
			throw 'Invalid IPv4 address "' + this.address + '"';
		}
		
	}
	// Otherwise, parse it as a string
	else {
		
		// Retrieve the different part
		var ip = address.match && address.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
		
		if(!ip || ip[1] > 255 || ip[2] > 255 || ip[3] > 255 || ip[4] > 255) {
			throw 'Invalid IPv4 Address "' + address + '"';
		}
		
		// Calculate the IP address number
		this.address = (+ip[1]<<24) + (+ip[2]<<16) + (+ip[3]<<8) + (+ip[4]);
	}
};

/**
 * Convert an {@link IPv4.Address IPv4 Address} into a String in the following
 * format:
 *     
 *     "ABC.DEF.GHI.JKL"
 *     
 * @return {String} Returns the standard String representation of the {@link IPv4.Address IPv4 Address}
 */
IPv4.Address.prototype.toString = function() {
	return      ((this.address >>> 24) % 256)
		+ '.' + ((this.address >>> 16) % 256)
		+ '.' + ((this.address >>> 8 ) % 256)
		+ '.' + ((this.address >>> 0 ) % 256)
		;
};

IPv4.Mask = function(mask) {
	
	// Mask size (Ex: 24)
	if(/^[0-9]+$/.test(mask)) {
		
		// Retrieve the mask size (31 to 0)
		var maskSize = Number(mask);
		if(maskSize > 32) {
			throw 'Expecting mask size between 0 and 32, got ' + maskSize;
		}
		
		// Calculate the actual mask (-xxxx)
		// -1 is the full "ones" number, aka 1111 1111 1111 1111 in 16-bits
		this.mask = maskSize == 0 ? 0 : (-1 << (32 - maskSize));
	}
	// Address (Ex: 255.255.255.0)
	else {
		this.mask = (mask instanceof IPv4.Address ? mask : new IPv4.Address(mask)).address;
	}
};

IPv4.Mask.prototype.getMaskSize = function() {
	
	/**
	 * mask        = 1111 1111 1111 0000
	 * ~(mask)     = 0000 0000 0000 1111
	 * ~(mask) + 1 = 0000 0000 0001 0000 = Math.pow(2, 32 - maskSize)
	 * 
	 * a = Math.pow(b,c)  <=>  c = Math.log(a)/Math.log(b)
	 * 
	 * a = Math.pow(2, 32 - maskSize)
	 * b = 2
	 * c = 32 - maskSize
	 * 
	 * ~(mask) + 1 = Math.pow(2, 32 - maskSize)  <=> 32 - maskSize = Math.log(~(this.mask) + 1)/Math.log(2)
	 *                                           <=> maskSize = 32 - Math.log(~(this.mask) + 1)/Math.log(2)
	 */
	switch(this.mask) {
		case -1: return 32; // Prevents returning Infinity (see Math.log)
		case  0: return 0; // Prevents returning 32
		default: return Math.round(32 - Math.log(~(this.mask) + 1)/Math.log(2));
	}
};

IPv4.Mask.prototype.apply = function(address) {
	return new IPv4.Address(this.mask & (address instanceof IPv4.Address ? address : new IPv4.Address(address)).address);
};

IPv4.Mask.prototype.toString = function() {
	return new IPv4.Address(this.mask).toString();
};

/** ========================================================================= */
/**
 * IP v4 Subnet
 * 
 * @class IPv4.Subnet
 */

/**
 * Create a new {@link IPv4.Subnet IP v4 Subnet}
 * 
 * @param {Number/String/IPv4.Address} network The subnet network address
 * @param {Number/String/IPv4.Mask}    network The subnet mask
 * @constructor
 */
IPv4.Subnet = function(network, mask) {
	this.network = this.getAddressAsObject(network);
	this.mask    = this.getMaskAsObject(mask);
	
	// Check the network/mask validity
	var networkAddress;
	if((networkAddress = this.mask.apply(this.network).address) != this.network.address) {
		throw 'Invalid IPv4 Subnet "' + this + '", should be "' + new IPv4.Subnet(networkAddress, mask) + '".';
	}
};

/**
 * Get an {@link IPv4.Address address} as an object
 * 
 * @param {String/Number/IPv4.Address} address The source address
 * 
 * @return {IPv4.Address} Returns a new {@link IPv4.Address} object if `address`
 * is a `String` or a `Number`, or the original {@link IPv4.Address} object otherwise
 */
IPv4.Subnet.prototype.getAddressAsObject = function(address) {
	return address instanceof IPv4.Address ? address : new IPv4.Address(address);
};

/**
 * Get a {@link IPv4.Mask mask} as an object
 * 
 * @param {String/Number/IPv4.Mask} mask The source mask
 * 
 * @return {IPv4.Address} Returns a new {@link IPv4.Mask} object if `mask`
 * is a `String` or a `Number`, or the original {@link IPv4.Mask} object otherwise
 */
IPv4.Subnet.prototype.getMaskAsObject = function(mask) {
	return mask instanceof IPv4.Mask ? mask : new IPv4.Mask(mask);
};

/**
 * Get the String representation of the Subnet in the following format:
 * 
 *     "<network>/<mask size>"
 *     
 * where `network` is the {@link IPv4.Address#toString String representation of the subnet network address}
 * and `mask size` is the {@link IPv4.Address#getMaskSize mask size of the subnet mask}
 * 
 * Example:
 * 
 *     var s = new IPv4.Subnet('192.168.1.0', '255.255.255.0');
 *     s.toString() // "192.168.1.0/24"
 * 
 * @return {String} Return the String representation of the Subnet
 */
IPv4.Subnet.prototype.toString = function() {
	return this.network.toString() + '/' + this.mask.getMaskSize();
};

/**
 * Get the broadcast address of this subnet
 * 
 * @return {IPv4.Address} Returns the broadcast address of this subnet
 */
IPv4.Subnet.prototype.getBroadcastAddress = function() {
	return new IPv4.Address(this.network.address | ~this.mask.mask);
};

/**
 * Determine whether an address is the network address of this subnet or not
 * 
 * @param {Number/String/IPv4.Address} address The address to check
 * @return {Boolean} Returns `true` if `address` is the network address of this subnet, `false` otherwise
 */
IPv4.Subnet.prototype.isNetworkAddress = function(address) {
	return this.getAddressAsObject(address).address === this.network.address;
};

/**
 * Determine whether an address is the broadcast address of this subnet or not
 * 
 * @param {Number/String/IPv4.Address} address The address to check
 * @return {Boolean} Returns `true` if `address` is the broadcast address of this subnet, `false` otherwise
 */
IPv4.Subnet.prototype.isBroadcastAddress = function(address) {
	return this.getAddressAsObject(address).address === this.getBroadcastAddress().address;
};

/**
 * Determine whether an IP address is valid within this subnet, or not. A valid
 * IP address matches the following conditions:
 * 
 *    1. the address belongs to this subnet
 *    2. the address IS NOT the network address (reserved)
 *    3. the address IS NOT the broadcast address (reserved)
 * 
 * @param {Number/String/IPv4.Address} address The address to check
 * @returns {Boolean} Returns `true` if the address is valid, `false` otherwise.
 */
IPv4.Subnet.prototype.isValidAddress = function(address) {
	var tmpAddress = this.getAddressAsObject(address);
	return this.mask.apply(tmpAddress).address == this.network.address
		&& !this.isNetworkAddress(tmpAddress)
		&& !this.isBroadcastAddress(tmpAddress)
		;
};