export const query = `
    PREFIX wikibase: <http://wikiba.se/ontology#>
    PREFIX wd: <http://www.wikidata.org/entity/>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?president ?cause ?dob ?dod WHERE {
        ?pid wdt:P39 wd:Q11696 .
        ?pid wdt:P509 ?cid .
        ?pid wdt:P569 ?dob .
        ?pid wdt:P570 ?dod .

        OPTIONAL {
        ?pid rdfs:label ?president filter (lang(?president) = "en") .s
    }
    OPTIONAL {
          ?cid rdfs:label ?cause filter (lang(?cause) = "en") .
    }
  }`
