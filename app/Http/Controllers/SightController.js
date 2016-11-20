'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const County = use('App/Model/County')
const Sight = use('App/Model/Sight')
const User = use('App/Model/User')
const Point = use('App/Model/Point')
const Validator = use('Validator')

class SightController {
    *index(request, response){
        const sights = yield Database.table('sights').orderBy('point', 'desc').limit(5)
        yield response.sendView('main',{
            sights:sights
        })
    }

    *list(request, response){
        const counties = yield County.all()
        const categories = yield Category.all()

        for(let county of counties){
            const sights = yield county.sights().orderBy('point', 'desc').limit(2).fetch()
            county.sight = sights.toJSON()
        }
        
        yield response.sendView('list',{
            counties: counties.toJSON(),
            categories: categories.toJSON()
        })
    }

    *show(request, response){
        const id = request.param('id')
        const sight = yield Sight.find(id)
        var user_id=null
        var points=null
        if(request.currentUser != null){
            user_id = request.currentUser.id

            points = yield Point.query()
            .where(function () {
                if (user_id> 0) this.where('user_id', user_id)
                if (id > 0) this.where('sight_id', id)
            })
        }    

        if (!sight) {
            yield response.redirect('back')
            return
        }

        yield sight.related('category').load()
        yield sight.related('county').load()
        yield sight.related('user').load()
        yield response.sendView('sightShow', {
            sight: sight.toJSON(),
            points:points
        })
    }

    *create(request, response){
        const counties = yield County.all()
        const categories = yield Category.all()
        
        if(request.currentUser == null){
            yield response.sendView('error',{
                error:'Új látványosság létrehozása csak bejelentkezett felhasználók számára elérhető!'
            })
            return
        }
        yield response.sendView('newSight',{
            counties: counties.toJSON(),
            categories: categories.toJSON()
        })
        
    }

    *doCreate(request, response){
        const sightData = request.except('_csrf')

        const rules ={
            name: 'required',
            county_id: 'required',
            approach: 'required',
            details: 'required',
            category_id:'required'
        }

        const validation = yield Validator.validateAll(sightData, rules)

        if (validation.fails()) {
        yield request
            .withAll()
            .andWith({errors: validation.messages()})
            .flash()
        response.redirect('back')
        return
        }

        const avatars = request.files('image')

        sightData.user_id=request.currentUser.id
        sightData.point=0
        const sight = yield Sight.create(sightData)

        const avatar = avatars[0]
        var filename=""   
        const kiterjesztes = avatar.extension()
        if(kiterjesztes == 'png' || kiterjesztes == 'jpg' || kiterjesztes == 'jpeg' || kiterjesztes == 'JPG' || kiterjesztes == 'PNG' || kiterjesztes == 'JPEG'){
            filename = `${sight.id}.${avatar.extension()}`
            yield avatar.move('public\\images', filename)
            if (!avatar.moved()) {
                response.badRequest(avatar.errors())
                return
                }
            var eleresi = avatar.uploadPath().split('public')
            sight.imagepath=eleresi[1]
        }       
        yield sight.save()
        response.redirect('/')

    }

    *search(request, response){
        const filters = {
            name: request.input('inputname') || '',
            category: request.input('category') || 0,
            county: request.input('county') || 0
        }

        const sights = yield Sight.query()
        .where(function () {
            if (filters.category > 0) this.where('category_id', filters.category)
            if (filters.county > 0) this.where('county_id', filters.county)
            if (filters.name.length > 0) this.where('name', 'LIKE', `%${filters.name}%`)
        })

        const categories = yield Category.all()
        const counties = yield County.all()
        yield response.sendView('sightSearch', {
            sights: sights,
            categories: categories.toJSON(),
            counties: counties.toJSON(),
            filters
        })
    }

    *countyShow(request, response){
        const id = request.param('id')
        const county = yield County.find(id)
        
        if (!county) {
            yield response.redirect('back')
            return
        }
        const sights = yield Sight.query()
        .where(function () {
            this.where('county_id', id)
        })
        .orderBy('name')

        yield response.sendView('countyShow',{
            county:county,
            sights:sights
        })
    }

    *edit(request, response){
        const id = request.param('id')
        const sight = yield Sight.find(id)
        const counties = yield County.all()
        const categories = yield Category.all()

        if(request.currentUser == null){
            yield response.sendView('error',{
                error:'Látványosság szerkesztése csak bejelentkezett felhasználók számára elérhető!'
            })
            return
        }

        if (request.currentUser.id !== sight.user_id && request.currentUser.id != 1) {
            yield response.sendView('error',{
                error:'Csak a saját látványosságodat szerkesztheted!'
            })
            return
        }

        yield response.sendView('editSight',{
            counties: counties.toJSON(),
            categories: categories.toJSON(),
            sight:sight.toJSON()
        })
    }
    
    *doEdit(request, response){
        const sightData = request.except('_csrf')
        
        
        const rules ={
            name: 'required',
            county_id: 'required',
            approach: 'required',
            details: 'required',
            category_id:'required'
        }

        const validation = yield Validator.validateAll(sightData, rules)

        if (validation.fails()) {
        yield request
            .withAll()
            .andWith({errors: validation.messages()})
            .flash()
        response.redirect('back')
        return
        }

        const id = request.param('id')
        const sight = yield Sight.find(id)

        if (request.currentUser.id !== sight.user_id && request.currentUser.id != 1) {
            yield response.sendView('error',{
                error:'Csak a saját látványosságodat szerkesztheted!'
            })
            return
        }

        Object.assign(sight, sightData)
        yield sight.save()
        response.redirect('/')
    }

    *editImage(request, response){
        const id = request.param('id')
        const sight = yield Sight.find(id)

        if(request.currentUser == null){
            yield response.sendView('error',{
                error:'Látványosság szerkesztése csak bejelentkezett felhasználók számára elérhető!'
            })
            return
        }

        if (request.currentUser.id !== sight.user_id && request.currentUser.id != 1) {
            yield response.sendView('error',{
                error:'Csak a saját látványosságodat szerkesztheted!'
            })
            return
        }

        yield response.sendView('editImageSight',{
            sight:sight.toJSON()
        })
    }

    *doeditImage(request, response){
        const id = request.param('id')
        const sight = yield Sight.find(id)

        if(request.currentUser == null){
            yield response.sendView('error',{
                error:'Látványosság szerkesztése csak bejelentkezett felhasználók számára elérhető!'
            })
            return
        }

        if (request.currentUser.id !== sight.user_id && request.currentUser.id != 1) {
            yield response.sendView('error',{
                error:'Csak a saját látványosságodat szerkesztheted!'
            })
            return
        }
        const avatars = request.files('image')
        const avatar = avatars[0]
        var filename=""   
        const kiterjesztes = avatar.extension()
        if(kiterjesztes == 'png' || kiterjesztes == 'jpg' || kiterjesztes == 'jpeg' || kiterjesztes == 'JPG' || kiterjesztes == 'PNG' || kiterjesztes == 'JPEG'){
            filename = `${sight.id}.${avatar.extension()}`
            yield avatar.move('public\\images', filename)
            if (!avatar.moved()) {
                response.badRequest(avatar.errors())
                return
                }
            var eleresi = avatar.uploadPath().split('public')
            sight.imagepath=eleresi[1]
        }       
        yield sight.save()
        response.redirect('/')

    }

    *delete(request, response){
        const id = request.param('id')
        const sight = yield Sight.find(id)

        if(request.currentUser == null){
            yield response.sendView('error',{
                error:'Látványosság törlése csak bejelentkezett felhasználók számára elérhető!'
            })
            return
        }

        if (request.currentUser.id !== sight.user_id && request.currentUser.id != 1) {
            yield response.sendView('error',{
                error:'Csak a saját látványosságodat törölheted!'
            })
            return
        }
        
        yield sight.delete()
        response.redirect('/')
    }

    *home(request, response){
        const currentUser = request.currentUser
        var sights

        if(currentUser.id == 1){
            sights=yield Sight.all()
            sights=sights.toJSON()
        }
        else{
            sights = yield Sight.query()
            .where(function () {
             this.where('user_id', currentUser.id)
         })
        }  

        yield response.sendView('home',{
            sights:sights
        })
        
    }

    *vote(request, response){
        const id = request.param('id')
        const sight = yield Sight.find(id)

        const sightData = request.except('_csrf')
        const rules ={
            point: 'required',
        }
        const validation = yield Validator.validateAll(sightData, rules)
        if (validation.fails()) {
        yield request
            .withAll()
            .andWith({errors: validation.messages()})
            .flash()
        response.redirect('back')
        return
        }

        const user_id = request.currentUser.id
        sightData.user_id=user_id
        sightData.sight_id=id

        const point = yield Point.create(sightData)

       //raiting érték meghatározása:
        const points = yield Point.query()
        .where(function () {
            if (id > 0) this.where('sight_id', id)
        })

       const hossz = points.length
       var ossz=0
       for(var i=0;i<hossz;i++){
           ossz = ossz + points[i].point
       }
       const ertekeles = ossz / hossz
       sight.point=ertekeles

       yield sight.save()
       yield response.redirect('back')
    }
    
}

module.exports = SightController
