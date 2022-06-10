const path = require("path")
const electron = require('electron')
const fs = require('fs');
let loadedLanguage;
let app = electron.app ? electron.app : electron.remote.app

module.exports = i18n;

function i18n() {
    if(fs.existsSync(path.join(__dirname, app.getLocale() + '.json'))) {
         loadedLanguage = loadLanguage(app.getLocale());
    }
    else {
         loadedLanguage = loadLanguage("en");
    }
}
function loadLanguage(LOCALE_NAME){
    return JSON.parse(fs.readFileSync(path.join(__dirname, `${LOCALE_NAME}.json`), 'utf8'))
}

i18n.prototype.__ = function(phrase) {
    let translation = loadedLanguage[phrase]
    if(translation === undefined) {
         translation = phrase
    }
    return translation
}
