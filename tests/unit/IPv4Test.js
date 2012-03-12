module("IP v4");


test("Basic requirements", function() {
	expect(2);
	ok( Math, "Math" );
	ok( Math.log, "Math.log" );
});


/**
 * =============================================================================
 * IPv4.Address
 * =============================================================================
 */

test("new IPv4.Address()", function() {
	expect(6);
	
	var address1 = new IPv4.Address('192.168.0.1');
	var address2 = new IPv4.Address('255.255.255.0');
	var address3 = new IPv4.Address('0.0.0.0');
	var address4 = new IPv4.Address('255.255.255.255');
	
	ok(address1 instanceof IPv4.Address, "new IPv4.Address('192.168.0.1') instanceof IPv4.Mask");
	ok(address3 instanceof IPv4.Address, "new IPv4.Address('0.0.0.0') instanceof IPv4.Mask");
	ok(address4 instanceof IPv4.Address, "new IPv4.Address('255.255.255.255') instanceof IPv4.Mask");
	
	strictEqual(address2.address, -256, "new IPv4.Address('255.255.255.0').address == -256");
	strictEqual(address3.address, 0, "new IPv4.Address('0.0.0.0').address === 0");
	strictEqual(address4.address, -1, "new IPv4.Address('255.255.255.255').address === -1");
});


test('IPv4.Address.toString()', function() {
	expect(4);
	
	var address1 = new IPv4.Address('0.0.0.0');
	var address2 = new IPv4.Address('255.255.255.0');
	var address3 = new IPv4.Address('255.255.255.255');
	var address4 = new IPv4.Address('192.168.0.1');

	strictEqual(address1.toString(), '0.0.0.0'        , "new IPv4.Address('0.0.0.0').toString() == '0.0.0.0'");
	strictEqual(address2.toString(), '255.255.255.0'  , "new IPv4.Address('255.255.255.0').toString() == '255.255.255.0'");
	strictEqual(address3.toString(), '255.255.255.255', "new IPv4.Address('255.255.255.255').toString() == '255.255.255.255'");
	strictEqual(address4.toString(), '192.168.0.1'    , "new IPv4.Address('192.168.0.1').toString() == '192.168.0.1'");
});


/**
 * =============================================================================
 * IPv4.Mask
 * =============================================================================
 */

test("new IPv4.Mask()", function() {
	expect(18 + 33);
	
	var masks = [];
	for(var i = 0 ; i <= 32 ; i++) {
		masks[i] = new IPv4.Mask(i);
	}
	
	var mask11 = new IPv4.Mask(24);
	var mask12 = new IPv4.Mask('24');
	var mask13 = new IPv4.Mask('255.255.255.0');
	
	var mask21 = new IPv4.Mask(32);
	var mask22 = new IPv4.Mask('32');
	var mask23 = new IPv4.Mask('255.255.255.255');
	
	var mask31 = new IPv4.Mask(0);
	var mask32 = new IPv4.Mask('0');
	var mask33 = new IPv4.Mask('0.0.0.0');
	
	ok(mask11 instanceof IPv4.Mask, "new IPv4.Mask(24) instanceof IPv4.Mask");
	ok(mask12 instanceof IPv4.Mask, "new IPv4.Mask('24') instanceof IPv4.Mask");
	ok(mask13 instanceof IPv4.Mask, "new IPv4.Mask('255.255.255.0') instanceof IPv4.Mask");
	
	ok(mask21 instanceof IPv4.Mask, "new IPv4.Mask(32) instanceof IPv4.Mask");
	ok(mask22 instanceof IPv4.Mask, "new IPv4.Mask('32') instanceof IPv4.Mask");
	ok(mask23 instanceof IPv4.Mask, "new IPv4.Mask('255.255.255.255') instanceof IPv4.Mask");
	
	ok(mask31 instanceof IPv4.Mask, "new IPv4.Mask(0) instanceof IPv4.Mask");
	ok(mask32 instanceof IPv4.Mask, "new IPv4.Mask('0') instanceof IPv4.Mask");
	ok(mask33 instanceof IPv4.Mask, "new IPv4.Mask('0.0.0.0') instanceof IPv4.Mask");
	
	for(var i = 0 ; i <= 32 ; i++) {
		strictEqual(masks[i].mask, i == 0 ? 0 : -1 << (32 - i), 'new IPv4.Mask(' + i + ').mask === -1 << ' + (32 - i) + ' === ' + (i == 0 ? 0 : -1 << (32 - i)));
	}
	
	deepEqual(mask12, mask11, "new IPv4.Mask('24') == new IPv4.Mask(24)");
	deepEqual(mask13, mask11, "new IPv4.Mask('255.255.255.0') == new IPv4.Mask(24)");
	
	deepEqual(mask22, mask21, "new IPv4.Mask('32') == new IPv4.Mask(32)");
	deepEqual(mask23, mask21, "new IPv4.Mask('255.255.255.255') == new IPv4.Mask(32)");
	
	deepEqual(mask32, mask31, "new IPv4.Mask('0') == new IPv4.Mask(0)");
	deepEqual(mask33, mask31, "new IPv4.Mask('0.0.0.0') == new IPv4.Mask(0)");
	
	strictEqual(mask13.mask, -256, "new IPv4.Mask('255.255.255.0').mask == -256");
	strictEqual(mask23.mask, -1  , "new IPv4.Mask('255.255.255.255').mask == -1");
	strictEqual(mask33.mask, 0   , "new IPv4.Mask('0.0.0.0').mask == 0");
});


test('IPv4.Mask.toString()', function() {
	expect(4);
	
	var mask1 = new IPv4.Mask('255.255.255.0');
	var mask2 = new IPv4.Mask('0.0.0.0');
	var mask3 = new IPv4.Mask('255.255.255.255');
	var mask4 = new IPv4.Mask('192.168.0.14');
	
	strictEqual(mask1.toString(), '255.255.255.0', "new IPv4.Mask('255.255.255.0').toString() == '255.255.255.0'");
	strictEqual(mask2.toString(), '0.0.0.0', "new IPv4.Mask('0.0.0.0').toString() == '0.0.0.0'");
	strictEqual(mask3.toString(), '255.255.255.255', "new IPv4.Mask('255.255.255.255').toString() == '255.255.255.255'");
	strictEqual(mask4.toString(), '192.168.0.14', "new IPv4.Mask('192.168.0.14').toString() == '192.168.0.14'");
});


test('IPv4.Mask.getMaskSize()', function() {
	expect(33);
	
	var masks = [];
	for(var i = 0 ; i <= 32 ; i++) {
		masks[i] = new IPv4.Mask(i);
	}
	
	for(var i = 0 ; i <= 32 ; i++) {
		strictEqual(masks[i].getMaskSize(), i, 'new IPv4.Mask(' + i + ').getMaskSize() == ' + i);
	}
});


test('IPv4.Mask.apply()', function() {
	expect(4);
	
	var mask1    = new IPv4.Mask(16);
	var address1 = new IPv4.Address('192.168.0.0');
	
	deepEqual(mask1.apply('192.168.0.1'), address1, "new IPv4.Mask(16).apply('192.168.0.1') == '192.168.0.0'");
	deepEqual(mask1.apply('192.168.0.255'), address1, "new IPv4.Mask(16).apply('192.168.0.255') == '192.168.0.0'");
	deepEqual(mask1.apply('192.168.1.0'), address1, "new IPv4.Mask(16).apply('192.168.1.0') == '192.168.0.0'");
	deepEqual(mask1.apply('192.168.1.254'), address1, "new IPv4.Mask(16).apply('192.168.1.254') == '192.168.0.0'");
});


/**
 * =============================================================================
 * IPv4.Subnet
 * =============================================================================
 */

test("new IPv4.Subnet()", function() {
	expect(13);
	
	var subnet1 = new IPv4.Subnet('192.168.1.1', 32);
	var subnet2 = new IPv4.Subnet('192.168.1.0', 24);
	var subnet3 = new IPv4.Subnet('192.168.0.0', 16);
	var subnet4 = new IPv4.Subnet('0.0.0.0', 0);
	
	ok(subnet1 instanceof IPv4.Subnet, "new IPv4.Subnet('192.168.1.1', 32) instanceof IPv4.Subnet");
	ok(subnet2 instanceof IPv4.Subnet, "new IPv4.Subnet('192.168.1.0', 24) instanceof IPv4.Subnet");
	ok(subnet3 instanceof IPv4.Subnet, "new IPv4.Subnet('192.168.0.0', 16) instanceof IPv4.Subnet");
	ok(subnet4 instanceof IPv4.Subnet, "new IPv4.Subnet('0.0.0.0', 32) instanceof IPv4.Subnet");
	
	deepEqual(subnet1.network, new IPv4.Address('192.168.1.1'), "new IPv4.Subnet('192.168.1.1', 32).network == new IPv4.Address('192.168.1.1')");
	deepEqual(subnet2.network, new IPv4.Address('192.168.1.0'), "new IPv4.Subnet('192.168.1.0', 24).network == new IPv4.Address('192.168.1.0')");
	deepEqual(subnet3.network, new IPv4.Address('192.168.0.0'), "new IPv4.Subnet('192.168.0.0', 16).network == new IPv4.Address('192.168.0.0')");
	deepEqual(subnet4.network, new IPv4.Address('0.0.0.0'), "new IPv4.Subnet('192.168.1.1', 32).network == new IPv4.Address('192.168.1.1')");
	
	deepEqual(subnet1.mask, new IPv4.Mask('255.255.255.255'), "new IPv4.Subnet('192.168.1.1', 32).mask == new IPv4.Mask('255.255.255.255')");
	deepEqual(subnet2.mask, new IPv4.Mask('255.255.255.0'), "new IPv4.Subnet('192.168.1.0', 24).mask == new IPv4.Mask('255.255.255.0')");
	deepEqual(subnet3.mask, new IPv4.Mask('255.255.0.0'), "new IPv4.Subnet('192.168.0.0', 16).mask == new IPv4.Mask('255.255.0.0')");
	deepEqual(subnet4.mask, new IPv4.Mask('0.0.0.0'), "new IPv4.Subnet('0.0.0.0', 0).mask == new IPv4.Mask('0.0.0.0')");
	
	var wrongSubnet = function() {
		new IPv4.Subnet('192.168.1.0', '255.255.0.0');
	};
	
	raises(wrongSubnet, function(e) { return e === 'Invalid IPv4 Subnet "192.168.1.0/16", should be "192.168.0.0/16".'; }, "new IPv4.Subnet('192.168.1.0', '255.255.0.0') throws 'Invalid IPv4 Subnet \"192.168.1.0/16\", should be \"192.168.0.0/16\".'");
});


test("IPv4.isValidAddress()", function() {
	expect(7);
	
	var subnet1 = new IPv4.Subnet('192.168.0.0', 16);
	
	ok(subnet1.isValidAddress('192.168.0.1'), "new IPv4.Subnet('192.168.0.0', 16).isValidAddress('192.168.0.1') == true");
	ok(subnet1.isValidAddress('192.168.0.255'), "new IPv4.Subnet('192.168.0.0', 16).isValidAddress('192.168.0.255') == true");
	ok(subnet1.isValidAddress('192.168.1.0'), "new IPv4.Subnet('192.168.0.0', 16).isValidAddress('192.168.1.0') == true");
	
	ok(!subnet1.isValidAddress('192.168.0.0'), "new IPv4.Subnet('192.168.0.0', 16).isValidAddress('192.168.0.0') == false");
	ok(!subnet1.isValidAddress('192.168.255.255'), "new IPv4.Subnet('192.168.255.255', 16).isValidAddress('192.168.255.255') == false");
	ok(!subnet1.isValidAddress('192.167.255.255'), "new IPv4.Subnet('192.168.0.0', 16).isValidAddress('192.167.255.255') == false");
	ok(!subnet1.isValidAddress('192.169.0.0'), "new IPv4.Subnet('192.168.0.0', 16).isValidAddress('192.169.0.0') == false");
});