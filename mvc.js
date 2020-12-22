// ini tempata router berproses
// manggil fungsi

;(function(w, d) {
	var _viewElement = null,
	    _defaultRoute = null,
	    _rendered = false;

	    var jsMvc =  function() {
	    	this._routeMap = {};
	    }

	    jsMvc.prototype.AddRoute = function(controller, route, template) {
	    	 this._routeMap[route] = new routeObj(controller, route, template);
	    }

	    jsMvc.prototype.Initialize = function(){
	    	// create the update view delegate
	    	var updateViewDelegate = updateView.bind(this);
	    	// get the view element reference
	    	_viewElement = d.querySelector(['view']);
	    	if (!_viewElement) return;
	    	// set a _default
	    	_defaultRoute = this._routeMap[Object.getOwnPropertyNames(this._routeMap)[0]];
	    	// wire up the hash change event the update view delegate
	    	w.onhashchange = updateViewDelegate;
	    	// call the update view delegate
	    	updateViewDelegate();
	    }

	    function updateView(){
	       // get the route name from the adsress bar hash
	       var pageHash = w.location.hash.replace('#',''),
	       routeName = null,
	       routeObj = null;

	       routeName = pageHash.replace('/', '');

	       _rendered = false;
	       // fetch the route object using the remot name
	       routeObj = this._routeMap[routeName];
	       if(!routeObj)
	       {
	       	routeObj = _defaultRoute;
	       }
	       // route name is not found then use default route
	       // render the view html associated with the route
	    }

	    function loadTemplate(routeObject, viewElement)
	    {
	    	var xmlhttp;
	    	if (window.XMLHttpRequest)
	    	{ //CODE FOR ie7+, Firefox, Safari, Opera, Chrome
	    		xmlhttp = new XMLHttpRequest();
	    	}
	    	else
	    	{// code for IE6,IE5
	    		xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
	    	}

	    	xmlhttp.onreadystatechange = function() {
	    		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    			//load the view
	    		}
	    	}

	    	xmlhttp.open('GET', routeObject.template,true);
	    	xmlhttp.send();
	    }

	    function loadView(routeObject, viewElement, viewHtml){
	    	// create the model object
	    	var mode = {};
	    	// call the controller
	    	routeObject.controller(model);
	    	// replace
	    	viewHtml = replaceTokens(viewHtml, model);
	    	// render
	    	if(!_rendered)
	    	{
	    		viewElement.innerHTML = viewHtml;
	    		_rendered = true; 
	    	}
	    }

	    function replaceTokens(viewHtml, model){
	    	var modelProps = Object.getOwnPropertyNames(model);

	    	modelProps.forEach(function (element, index, array)
	    	{
	    		viewHtml = viewHtml.replace('{{' + element + '}}', model[element]);
	    	});
	    }


	    var routeObj =  function (c, r, t) {
	    	this.controller = c;
	    	this.route = r;
	    	this.template = t;
	    }

	    w['jsMvc'] = new jsMvc();
})(window, document);