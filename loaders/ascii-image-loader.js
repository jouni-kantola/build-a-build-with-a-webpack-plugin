const asciify = require("../utils/asciify-image");
const Convert = require("ansi-to-html");

module.exports = function(content) {
  const callback = this.async();

  asciify(
    content,
    {
      fit: "box",
      width: 30,
      height: 30
    },
    function(asciified) {
      var convert = new Convert({
        newline: true
      });
      
      const html = JSON.stringify(convert.toHtml(asciified));

      const result = `module.exports = function() { 
          var logo = document.createElement('div');
          logo.style.fontFamily = "monospace";
          logo.innerHTML = ${html};
          return logo;
        };`;
      
      callback(null, result);
    }
  );
};

module.exports.raw = true;
