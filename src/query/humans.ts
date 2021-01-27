import {useQuery} from "react-query";
import {Wikidata} from "../api/wikidata";

const humansQuery = `
        SELECT ?item ?itemLabel WHERE {
          ?item wdt:P106 wd:Q2736.
          ?item wdt:P18 ?img 
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],nl". }
        }
        LIMIT 10
        
    `

const humanInfoQuery = (id: string) =>
    `
        SELECT ?property ?value WHERE {
          ${id} ?property ?value.
        }
    `

const propertyInfoQuery = (id: string) =>
    `
        SELECT *
        WHERE {
             SERVICE wikibase:label { bd:serviceParam wikibase:language "en".
                  wd:${id} rdfs:label         ?label.
                  wd:${id} schema:description ?description.
              }
        }
    `


export function useAllHumansIds(){
   return useQuery('humans', () =>
        Wikidata.sendQuery(humansQuery)
    )
}

export function useHumanById(humanId: string){
    return useQuery(humanId && ['human', humanId], () =>
        Wikidata.sendQuery(humanInfoQuery(humanId))
    )
}

export function usePropertyInfo(propertyId: string){
    return useQuery(propertyId && ['property', propertyId], () =>
        Wikidata.sendQuery(propertyInfoQuery(propertyId))
    )
}

