$.ready(function(){
  $("a").on("click", function(event){
    event.preventDefault();
    var url = this.getAttribute("href")
    var anchor = this
    console.log(url);

    $.ajax({
      url: url,
      type: "get"
    }).then(function(response){
      var object = JSON.parse(response)
      var badges = object.badges

      for (i = 0; i < badges.length; i++) {
        var phrase = badges[i].phrase
        var textnode = document.createTextNode(phrase);
        console.log(phrase)

        anchor.parentElement.appendChild(textnode);
      }

    })


  })
})
