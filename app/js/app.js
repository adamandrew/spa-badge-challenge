$.ready(function(){
  $(".teacher").on("click", function(event){
    event.preventDefault();
    var url = this.getAttribute("href")
    var anchor = this

    $.ajax({
      url: url,
      type: "get"
    }).then(function(response){
      var object = JSON.parse(response)
      var badges = object.badges
      var templateScript = SweetSelector.select("#badge-template")[0].innerText
      var template = Handlebars.compile(templateScript);
      var context = {'badges': badges}
      var compiledTemplate = template(context)
      SweetSelector.select("#container")[0].innerHTML = compiledTemplate
    })
  })
})
