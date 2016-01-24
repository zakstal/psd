var Must = require('mustache');
var fs = require('fs');

module.exports = function (templatePath, data) {
    template = fs.readFileSync(templatePath, 'utf8');
    // Rendering the mustache template
    return Must.render(template, data);
};