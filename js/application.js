"use strict"; 

window.Application = function(){
	this.createInterface();
} 

window.Application.prototype = {
	history: [],
	url: "index.html",

	createInterface: function(){
		var self = this;

		$(".fa.fa-remove").click(function(){
			self.close();
		})

		$("body").on("click", "a", function(e){
			if( $(this).hasClass("link") ){
				self.open( $(this).attr("href"), {
					left: $(this).offset().left,
					top: $(this).offset().top,
					width: $(this).width(),
					height: $(this).height(),
				});

				e.preventDefault();
			}

		})	
	},

	open: function( url, position ){
		this.loadAndShow(url, position, "normal");
	},
	close: function(){
		var top;

		if( top = this.history.pop() ){
			this.loadAndShow( top.url, top.position, "reverse");		
		}

	},
	loadAndShow: function( url, position, direction ){
		var self = this;

		$.ajax({
			url: url,
			method: "POST",
		 	dataType: "html"
		}).done(function( msg ) {
			var currentTable = $("#table");
		 	var table = $("<div>").append($(msg)).find("#table");
		 	var keyframes, style;
		 	var start, end;

		 	if(table.length == 1){
		 		table.attr("url", url)
		 		
				$("body").append(table);

				table.css({
					position: "absolute",
					width: currentTable.width(),
		 		 	"transform-origin": "left top",
				})

				start = position;
			 	end = {
					top: currentTable.position().top,
					left: currentTable.position().left,
					width: currentTable.width(),
					height: table.height(),
				};

				self.createAnimation("scale", start, end);

				currentTable.css({
					position: "absolute",
					width: currentTable.width(),
					"transform-origin": (start.left-end.left) + "px " + (start.top-end.top) + "px"
				})
				currentTable.css({		  		  
	    	 		"animation-name": "scale-old",
	    	 		"animation-duration": "1s",
	    	 		"animation-direction": direction
			  	})
			  	table.css({		  		  
	    			"animation-name": "scale-new",
	    			"animation-duration": "1s",
	    			"animation-direction": direction
			  	})

			  	table.on('animationend',  function(e) {
		    		console.log("end")
		    		currentTable.remove();
		    		table.css({
		    			position: "relative",
		    			width: "initial"
		    		})
		    		if( direction == "normal" ){
			    		self.history.push({
			    			url: self.url,
			    			position: position
			    		})
			    	}
			    	self.url = url;
		  		});
		 	}
		 	else{
		 		alert( "Request failed: bad content" );	
		 	}

		}).fail(function( jqXHR, textStatus ) {
			alert( "Request failed: " + textStatus );
		});
	},

	createAnimation: function(name, start, end){
		var style;

		var scaleX = start.width/end.width;
		var scaleY = start.height/end.height ;

		var keyframes = "@keyframes " + name + "-new {"+
	    	"from {" + 
	    		"top: " + start.top + "px; left: " + start.left + "px;" + 
	    		"transform: scale(" + ( start.width/end.width ) + "," + ( start.height/end.height ) + ");" +
	    	"}" +
	        "to {" + 
	    		"top: " + end.top + "px; left: " + end.left + "px;" + 
	    		"transform: scale(1,1);" +
	    	"}" +
	    "}";

		style = document.createElement( 'style' );
		style.innerHTML = keyframes;
		document.getElementsByTagName( 'head' )[ 0 ].appendChild( style );

		keyframes = "@keyframes " + name + "-old {"+
	    	"from {" + 
	    		"top: " + end.top + "px; left: " + end.left + "px;" + 
	    		"transform: scale(1, 1);" +
	    	"}" +
	        "to {" + 
	        	"left: " + (-start.left+2*end.left ) + "px;" +
				"top: " +(-start.top+2*end.top) + "px;" +
	    		"transform: scale(" + ( 1/scaleX ) + "," + ( 1/scaleY ) + ");" +
	    	"}" +
	    "}";

		style = document.createElement( 'style' );
		style.innerHTML = keyframes;
		document.getElementsByTagName( 'head' )[ 0 ].appendChild( style );

	}


};
