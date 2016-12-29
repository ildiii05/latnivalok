# Dokumentáció
## Látványosságok

Készítette: Madák Ildikó


### 1. Követelményanalízis
#### 1.1 Célkitűzés
Az alkalmazás célja megjeleníteni a felhasználók által beküldött látványosságok adatait. Az adatok védelme érdekében lehetőség van regisztrációra, majd bejelentkezésre. Bejelentkezett felhasználó új helyszíneket adhat hozzá a már meglévőkhöz, lehetősége van értékelni a mások által beküldött helyszíneket, valamint az önmaga által beküldötteket módosítani, törölni.
Az adminisztrátornak lehetősége van bármely beküldött helyszínt módosítani, vagy akár törölni.

#### Funkcionális követelmények
* Vendégek által elérhető funkciók
  - Regisztráció
  - Bejelentkezés
  - A főoldalon megtekinteni a legjobb értékelésű nevezetességeket
  - Látványosságok között szűrni név, elhelyezkedés alapján
* Bejelentkezett felhasználók által elérhető funkciók
  - Új látványosság hozzáadása
  - Látványosságok értékelése
  - Saját látványosság adatainak módosítása
  - Saját látványosság törlése
* Admin felhasználó által elérhető funkciók
  - Bármely látványosság törlése
  - Bármely látványosság adatainak módosítása
  - Új látványosság hozzáadása

#### Nem funkcionális követelmények
- Könnyű áttekinthetőség: színek használata a keresés megkönnyítéséhez, ésszerű elrendezés, hibásan bevitt adatok esetén a hiba egyértelmű jelzése
- Megbízhatóság: jelszóval védett funkciók

#### 1.2 Szakterületi fogalomjegyzék
- **Nehézség:** túrák osztályozása fizikai szükséglet szerint.
Például egy hegyvidéki kilátó több ponttal rendelkezik mint egy kis túraútvonal a völgyben
- **Jelleg:** a nevezetesség csoportosítása célcsoport, tematika szerint 
Például megkülönböztet tanösvényeket, múzeumokat, szabadidős programokat

#### 1.3 Használatieset-modell, funkcionális követelmények
- **Vendég:** Csak a publikus oldalakat éri el: főoldal, bejelentkezés, regisztráció
- **Bejelentkezett felhasználó:** A publikus oldalak elérésén kívül egyéb funkciókhoz is hozzájut: új nevezetesség felvétele, meglévő nevezetesség törlése/módosítása/értékelése
- **Bejelentkezett adminisztrátor:** Bármelyik nevezetességet módosíthatja, törölheti vagy új látványosságokat vehet fel.

![](./images/usecase.png)

Egy folyamat szemléltetése:

**Meglévő látványosság szerkesztése:**

![](./images/session.png)

### 2. Tervezés
#### 2.1 Architektúra terv
##### 2.1.1 Komponensdiagram
![](./images/component.png)
##### 2.1.2 Oldaltérkép
**Publikus:**
- Főoldal
- Látványosságok listázása
- Látványosságok között keresés
- Bejelentkezés
- Regisztráció

**Bejelentkezett:**
- Főoldal
- Új látványosság felvétele
- Saját nevezetesség kezelése
- Más által megadott nevezetesség értékelése

#### 2.1.3 Végpontok
- GET/: főoldal
- GET/login: bejelentkező oldal
- POST/login: bejelentkező adatok felküldése
- GET/home: bejelentkezettek főoldala
- GET/logout: kijelentkező oldal
- GET/regist: regisztrációs oldal
- POST/regist: regisztrációs adatok felküldése
- GET/sights: látványosságok listázása
- GET/sights/search: szűrés a látványosságok között
- GET/sights/create: új látványosság létrehozása
- POST/sights/create: új látványosság adatainak felküldése
- GET/sights/:id : látványosság megtekintése
- POST/sights/:id : látványosság értékelésének adatainak felküldése
- GET/sights/:id/delete: látványosság törlése
- GET/sights/:id/edit: látványosság adatainak szerkesztése
- POST/sights/:id/edit: látványosság új adatainak felküldése
- GET/sights/:id/editImage: látványossághoz tartozó kép módosítása
- POST/sights/:id/editImage: módosított adatok felküldése

#### 2.2 Felhasználói-felület modell
##### 2.2.1 Oldalvázlatok:

![](./images/index.jpg)

Kezdőlap

![](./images/list.jpg)

Látványosságok listázása


![](./images/search.jpg)

Keresés a látványosságok között


![](./images/regist.jpg)

Regisztráció

![](./images/login.jpg)

Bejelentkezés

![](./images/sights.jpg)

Bejelentkezett felhasználóhoz tartozó látványosságok

![](./images/create.jpg)

Látványosság hozzáadása

![](./images/sight.jpg)

Látványosság adatainak megtekintése, értékelése (bejelentkezett felhasználóként)

##### 2.2.2 Designtervek (végső megvalósítás kinézete):
![](./images/home.PNG)

Kezdőlap

![](./images/list.PNG)

Látványosságok listázása


![](./images/search.PNG)

Keresés a látványosságok között


![](./images/regist.PNG)

Regisztráció


![](./images/login.PNG)

Bejelentkezés

![](./images/sights.PNG)

Bejelentkezett felhasználóhoz tartozó látványosságok

![](./images/new.PNG)

Látványosság hozzáadása

![](./images/sight.PNG)

Látványosság adatainak megtekintése, értékelése (bejelentkezett felhasználóként)

##### 2.2.3 Osztálymodell:
![](./images/class.png)
##### 2.2.4 Dinamikus működés:
**Szekvenciadiagramm**

![](./images/sequence.png)

### 3. Implementáció
##### 3.1.1 Fejlesztőkörnyezet
- GitHub account szükséges
- Belépés után új repository létrehozása
- Ezután elkezdhetjük a kód írását
- git add paranccsal kiválaszthatunk egy fájlt verzionálásra
- git commit -m "commit" paranccsal feltehetjük a fájlokat a github oldalunkra
- A Github oldalán ellenőrizhetjük a munkánkat.

##### 3.1.2 Könyvtárstruktúra, funkciók:
- latnivalok
    - app
      - Http
        - Controllers
          - SightController
          - UserController
        - routes.js
      - Model
        - Category
        - County
        - Point
        - Sight
        - Token
        - User
    - database
      - migrations
      development.sqlite
    - images //dokumentációban szereplő képek//
    - public
      - images //Látványosságokhoz tartozó képek//
    - resources
      - views
        - countyShow
        - editImageSight
        - editSight
        - error
        - home
        - layout
        - list
        - login
        - main
        - newSight
        - regist
        - sightSearch
        - sightShow
      
### 4. Tesztelés
#### 4.1 Tesztelési környezetek

#### 4.2 Tesztállomány

#### 4.3 Tesztesetek

### 5. Felhasználói dokumentáció
**Futtatáshoz szükséges operációs rendszer:** Tetszőleges operációs rendszer

**A futtatáshoz szükséges hardver:** Operációs rendszerek szerint megadva.

**Egyéb követelmény:** tetszőleges böngésző telepítése, JavaScript ajánlott

**Program használata**

1. Böngészőben nyissuk meg a főoldalt
2. Jobb felső sarokban kattintsunk a Bejelentkezés gombra
3. Bejelentkezés (Regisztráció) után a Listaoldalon találjuk magunkat, ahol megtekinthetjük és szerkeszthetjük az általunk megadott nevezetességeket.
4. A felső menüsoron megjelent egy új gomb, a látványosság hozzáadása, erre kattintva tudunk új nevezetességet létrehozni
5. Töltsük ki megfelelően az űrlapot.
6. Hibás adatok esetén az űrlap felhívja a figyelmünket a hibára.
7. Mentés gombra kattintva mentsük el az adatokat.
8. A lista oldalon lévő funkciók: látványosság szerkesztése, kép módosítása valamint törlése
9. Mások által létrehozott látványosságoknál lehetőségünk van azokat értékelni, majd a főoldalon a legjobb értékeléssel rendelkező helyeket megtekinteni.

### 6. Felhasználói élmény javítása JavaScript segítségével
**1. funkció:**
Regisztráció validáció - az űrlapmezőket üresen ne lehessen felküldeni
- a felhasználónévnek minimum 4 karakterből kell állnia
- email formátum ellenőrzése
- a jelszónak minimum 6 karakternek kell lennie

**2. funkció:**
Új látványosság felvitele és szerkesztése esetén ellenőrzés, hogy ne legyenek nem megengedett adatok
- a látványosság nevének maximum 50 karakter adható meg
- a leírás és a megközelíthetőség megadásához minimum 20 karakterből álló leírást kell megadni
- a kategória és a megye kiválasztása kötelező

**3. funkció (AJAX):**
Bejelentkező ablak feldobása bármelyik oldalon a fejlécre kattintva
- hibás adatok esetén a hiba kiírása
- a mégse gombra kattintva a felugró ablak eltűntetése

**4. funkció (AJAX):**
Regisztrációs ablak feldobása bármelyik oldalon a fejlécre kattintva
- hibás adatok esetén a hiba kiírása
- a mégse gombra kattintva a felugró ablak eltűntetése

**5. funkció (AJAX):**
Látványosság törlése ajax segítségével
- bejelentkezés után a listaoldalon a törlés gombra kattintva a művelet ajax kérés segítségével hajtódik végre

####A funkciók végrehajtásához szükséges állományok:

1. Regisztráció validálás

1.1 regist.njk átalakítása

2. Látványosság validálás

2.1 editSight.njk átalakítása

2.2 newSight.njk átalakítása

3. Bejelentkezés

3.1 /scripts/login.js importálása a layout.njk-ba

4. Regisztráció

4.1 /scripts/regist.js importálása a layout.njk-ba

5. törlés

5.1 bejelentkezés után /home oldalon a törlés gombra kattintva a /scripts/delete.js állomány hívódik meg

6. routes.js-be ajaxos végpontok felvétele

7. SightController.js és UserController.js fájlokba az ajaxos funkciók felvétele