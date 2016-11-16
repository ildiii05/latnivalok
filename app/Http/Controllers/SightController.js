'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const County = use('App/Model/County')
const Sight = use('App/Model/Sight')
const User = use('App/Model/User')

class SightController {
    *index(request, response){
        yield response.sendView('main')
    }

    *list(request, response){
        const counties = yield County.all()
        const categories = yield Category.all()

        for(let county of counties){
            const sights = yield county.sights().fetch()
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

        yield sight.related(category).load()
        yield sight.related(county).load()

        yield response.sendView('sightShow', {
            sight: sight.toJSON()
        })
    }
}

module.exports = SightController
