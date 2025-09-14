# Uputstvo za pokretanje demo primera pomocu dockera

1. raspakovati zip i otvoriti terminal u dobijenom folderu
2. pokrenuti iz terminala docker-compose up --build -d
    2.1 [u slucaju da keycloak zahteva https]
    docker exec -it CONTAINER-ID bash 
    cd /opt/keycloak/bin
    ./kcadm.sh config credentials --server http://localhost:8080/ --realm master --user admin
    uneti password: admin
    ./kcadm.sh update realms/master -s sslRequired=NONE
3. otvoriti keycloak admin ui na http://localhost:8080/
4. na Manage realms/Create realm kartici, moguce je upload-ovati vec pripremljen realm sa jednim klijentom, admin rolom i potrebnim podesavanjima za komunikaciju (fajl realm-export.json)
5. testirati primer na http://localhost:3000

Dostupne funkcionalnosti:
- registracija korisnika (pristupa joj se sa login forme - Register now)
- prijava na sistem
- test Profile API-ja (dostupan autentifikovanim korisnicima)
- test admin API-ja (dostupan samo administratoru)

Napomene:
- Korisniku je potrebno dodeliti ADMIN rolu kroz keycloak admin UI
- trajanje tokena je 5m
- token moze da se dobije i pomocu 
	POST http://localhost:8080/realms/iam-example/protocol/openid-connect/token
	Content-Type: application/x-www-form-urlencoded
	Body: form url encoded
	client_id iam-backend
	username {username}
	password {password}
	grant_type password

# Opcija 2 (bez docker-compose)
preduslovi za SpringBoot:
spring 3.5.5
maven 3.8+
java jdk17

preduslovi za NextJS React:
node v18

komande za pokretanje:
npm install 
npm run dev

Keycloak: 
docker run -p 127.0.0.1:8080:8080 -e
KC_BOOTSTRAP_ADMIN_USERNAME=admin -e
KC_BOOTSTRAP_ADMIN_PASSWORD=admin
quay.io/keycloak/keycloak:26.3.3 start-dev

* za opciju 2, potreno je takođe pokrenuti instancu postgresql prema parametrima iz application.properties

