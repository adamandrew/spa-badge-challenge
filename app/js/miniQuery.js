var SweetSelector = {
  select: function(tag) {
    if (tag[0] === "#")
      return [document.getElementById(tag.substr(1, tag.length))]
    else if (tag[0] === ".")
      return document.getElementsByClassName(tag.substr(1, tag.length))
    else
      return document.getElementsByTagName(tag)
  }

};

var DOM = {
  hide: function(tag) {
    var elements = SweetSelector.select(tag)
    for (i = 0; i < elements.length; i++) {
      elements[i].setAttribute("style", "display: none;");
    }
  },
  show: function(tag) {
    var elements = SweetSelector.select(tag)
    for (i = 0; i < elements.length; i++) {
      elements[i].setAttribute("style", "display: block;");
    }
  },
  addClass: function(tag, new_class) {
    var elements = SweetSelector.select(tag)
    for (i = 0; i < elements.length; i++) {
      var classes = elements[i].getAttribute("class") + " " + new_class
      elements[i].setAttribute("class", classes);
    }
  },
  removeClass: function(tag, remove_class) {
    var elements = SweetSelector.select(tag)
    for (i = 0; i < elements.length; i++) {
      var classes = elements[i].getAttribute("class").replace(remove_class, "")
      elements[i].setAttribute("class", classes);
    }
  }

};

var EventDispatcher = {
  on: function(target, event, call_back) {
    var elem = SweetSelector.select(target);
    for (i = 0; i < elem.length; i++) {
      elem[i].addEventListener(event, call_back)
    }
  },

  trigger: function(target, event) {
    var e = new Event(event)
    var elem = SweetSelector.select(target);
    for (i = 0; i < elem.length; i++) {
      elem[i].dispatchEvent(e)
    }
  }
};

var AjaxWrapper = {
  request: function(params) {
    return new Promise(function(resolve, reject){
      var oReq = new XMLHttpRequest();
      oReq.open(params.type, params.url);
      oReq.onload = function() {

        if (oReq.status == 200){
          resolve(oReq.response);
        }
        else {
          reject(Error(oReq.statusText));
        }
      }
      oReq.send();
    })
  }
};


var miniQuery = function(target) {
  return {
    hide: function() { DOM.hide(target) },
    show: function() { DOM.show(target) },
    addClass: function(new_class) { DOM.addClass(target, new_class) },
    removeClass: function(old_class) { DOM.removeClass(target, old_class) },
    on: function(event, call_back) { EventDispatcher.on(target, event, call_back) },
    trigger: function(event) { EventDispatcher.trigger(target, event) },
  }
}

miniQuery.ajax = function(params){
  return AjaxWrapper.request(params)

}

miniQuery.ready = function(call_back) {
  if (document.readyState === "complete") {
    call_back()
  } else {
    document.addEventListener("DOMContentLoaded", function(event) {
      call_back()
    });
  }
}

$ = miniQuery
