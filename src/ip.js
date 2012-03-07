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

	// If the address is a number, consider it as the IP Address number representation
	if(/^[0-9]+$/.test(address)) {
		
		this.address = Number(address);
		
		if(this.address < -2147483648 || this.address > 2147483647) {
			throw 'Invalid IP address "' + this.address + '"';
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
IPv4.Address.toString = function() {
	return      ((this.mask >>> 24) % 256)
		+ '.' + ((this.mask >>> 16) % 256)
		+ '.' + ((this.mask >>> 8 ) % 256)
		+ '.' + ((this.mask       ) % 256)
		;
};

IPv4.Mask = function(mask) {
	
	// Retrieve the mask size (31 to 0)
	var maskSize = Number(/^[0-9]+$/.test(mask) ? mask : new IPv4.Address(mask).address);
	
	if(maskSize > 32) {
		throw 'Expecting mask size between 0 and 32, got ' + maskSize;
	}
	
	// Calculate the actual mask (-xxxx)
	// -1 is the full "ones" number, aka 1111 1111 1111 1111 in 16-bits
	this.mask = -1 << (32 - maskSize);
};

IPv4.Mask.getMaskSize = function() {
	
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
	return 32 - Math.log(~(this.mask) + 1)/Math.log(2);
};

IPv4.Mask.toString = function() {
	return new IPv4.Address(this.mask).toString();
};


IPv4.Subnet = function(network, mask) {
	this.network = network instanceof IPv4.Address ? network : new IPv4.Address(network);
	this.mask    = mask    instanceof IPv4.Mask    ? mask    : new IPv4.Mask(mask);
};

