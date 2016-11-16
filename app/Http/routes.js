'use strict'

const Route = use('Route')

//Főoldal megjelenítése
Route.get('/', 'SightController.index')

//Látványosságok listázása
Route.get('/sights','SightController.list')

//Látványosság megtekintése
Route.get('/sight/:id', 'SightController.show')

//Új Látványosság

//Látványosság törlése

//Szűrés a találatok között
