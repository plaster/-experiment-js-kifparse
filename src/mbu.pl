#!/usr/bin/perl
use utf8;
binmode STDIN, ':utf8';;
binmode STDOUT;
local $/;

my $whole = <STDIN>;
for (my $i = 0; $i < length($whole); ++$i) {
	my $c = substr($whole, $i, 1);
	if (ord($c) < 0x80) {
		print $c;
	} else {
		printf("\\u%04x", ord($c));
	}
}
exit;
