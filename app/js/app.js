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
        var context = {'badges': badges, teacher_id: teacher.id}
        var compiledTemplate = template(context)
        SweetSelector.select("#badge-container" + teacher.id)[0].innerHTML = compiledTemplate

        $("form").on("submit", function(event) {
          event.preventDefault();
          var phrase = this.children[1].value
          var teacher_id = this.children[0].value
          var url = this.getAttribute("action")
          $.ajax({
            url: url,
            type: "post",
            data: "phrase=" + phrase + "&votes=" + "0" + "&teacher_id=" + teacher_id
          }).then(function(response) {
            console.log(response)


          })
        })
      })
    })

  })
})
