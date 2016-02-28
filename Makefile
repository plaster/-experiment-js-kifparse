dist/kifparse.js: src/kifparse.js.in src/jsmbu/mbu.pl
	mkdir -p dist
	perl src/jsmbu/mbu.pl < $< > $@
