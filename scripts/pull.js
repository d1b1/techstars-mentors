

const _ = require('lodash');
const https = require('https');
const axios = require('axios');
const fs = require('fs');

(async () => {
    const out = [];

    for (let i = 1; i <= 21; i++) {
        var url = `https://websearch.techstars.com/collections/mentors/documents/search?x-typesense-api-key=rGlcUJRbfJofJrynCngiBoMZturrg1Of&page=${i}&per_page=250&q=&query_by=first_name,last_name,program_names,company_name&sort_by=website_order:asc&filter_by=&facet_by=program_names&max_facet_values=100`

        const response = await axios.get(url);
        _.forEach(response.data.hits, item => {
            var d = item.document
            d.objectID = d.id
            out.push(d)
        })
    }

    fs.writeFile('./output.json', JSON.stringify(out), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File written successfully.');
        }
    });

})();



