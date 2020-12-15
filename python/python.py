zrodlo = open('../../../../../plik.conf').readlines()
cel = open('../../../../../plik.conf', 'w')
for s in zrodlo:
	cel.write(s.replace("na co", "co zamienic"))
cel.close()