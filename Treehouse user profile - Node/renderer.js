var fs = require('fs');

function mergeValues(values, content) {
    //Cycle over the keys
          
    for(var key in values) {
        //Replace all {{keys}} with the values from the value objects
        content = content.replace('{{' + key + '}}', values[key]);
    }
        //return merged content 
        return content;   
}

function view(templateName, values, response) {
        //read from template files
        var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: 'utf8'});
        //Insert values into the contents
        fileContents = mergeValues(values, fileContents);
        //Write out the contents to the response
        response.write(fileContents);     
    }

    module.exports.view = view;