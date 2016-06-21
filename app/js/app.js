$.ready(function(){
  $.ajax({
    url: "http://spa-badge-api.herokuapp.com/teachers",
    type: "get"
  }).then(function(response) {
    var teachers = JSON.parse(response)
    var templateScript = SweetSelector.select("#teacher-template")[0].innerText
    var template = Handlebars.compile(templateScript);
    var context = {'teachers': teachers}
    var compiledTemplate = template(context)
    SweetSelector.select("#teacher-container")[0].innerHTML += compiledTemplate

    $(".teacher").on("click", function(event){
      event.preventDefault();
      var url = this.getAttribute("href")

      $.ajax({
        url: url,
        type: "get"
      }).then(function(response){
        var teacher = JSON.parse(response)
        var badges = teacher.badges
        var templateScript = SweetSelector.select("#badge-template")[0].innerText
        var template = Handlebars.compile(templateScript);
        var context = {'badges': badges}
        var compiledTemplate = template(context)
        SweetSelector.select("#badge-container" + teacher.id)[0].innerHTML = compiledTemplate
      })
    })
  })
})
