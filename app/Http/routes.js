'use strict'

const Route = use('Route')
const User = use('App/Model/User')
const Hash = use('Hash')

/* A bejelentkezéshez kötött funkciók levédését nem a middleware segítségével oldottam meg,
mert nem sikerült megoldást találnom arra, hogy a hibaüzenetet "szépen" jelenítsem meg. 
Ezért a kérdéses funkciók esetén a művelet végrehajtása előtt ellenőrzöm, hogy bejelentkezett-e a felhasználó*/

//Főoldal megjelenítése
Route.get('/', 'SightController.index')

//Látványosságok listázása
Route.get('/sights','SightController.list')

//Szűrés a találatok között
Route.get('/sights/search', 'SightController.search')

//Új Látványosság
Route.get('/sights/create', 'SightController.create')
Route.post('sights/create', 'SightController.doCreate')

//Látványosság megtekintése, értékelése
Route.get('/sights/:id', 'SightController.show')
Route.post('/sights/:id', 'SightController.vote')

//Látványosságok listázása megyénként
Route.get('/county/:id', 'SightController.countyShow')

//Látványosság törlése
Route.get('/sights/:id/delete', 'SightController.delete')

//Látványosság szerkesztése
Route.get('/sights/:id/edit', 'SightController.edit')
Route.post('/sights/:id/edit', 'SightController.doEdit').middleware('auth')
Route.get('/sights/:id/editImage','SightController.editImage')
Route.post('/sights/:id/editImage','SightController.doeditImage').middleware('auth')

//Regisztráció
Route.get('/regist', 'UserController.regist')
Route.post('/regist', 'UserController.doRegist')

//Bejelentkezés
Route.get('/home', 'SightController.home')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')

//Kijelentkezés
Route.get('/logout', 'UserController.logout')

//AJAX
Route.group('ajax', function () {
  Route.get('/sights/:id/delete', 'SightController.ajaxDelete').middleware('auth')
  Route.post('/login', 'UserController.ajaxLogin')
  Route.post('/regist', 'UserController.ajaxRegister')
}).prefix('/ajax')