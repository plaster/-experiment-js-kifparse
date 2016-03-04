CPP=/usr/bin/cpp -P -undef -Wundef -std=c99 -nostdinc -Wtrigraphs -fdollars-in-identifiers -C

dist/kifparse.js: med/kifparse.js util/jsmbu/mbu.pl
	@mkdir -p dist
	perl util/jsmbu/mbu.pl < $< > $@

med/kifparse.js: src/kifparse.js
	@mkdir -p med
	$(CPP) -Isrc < $< > $@
