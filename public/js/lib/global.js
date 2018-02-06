// AJUSTAR TAMANHO
function adjustSize(parent, position){
    var biggerHeight = [],
        itens = parent.find('.changeSize');

    itens.find('>*').css('position','relative')

    itens.each(function(index, el) {
        biggerHeight.push( $(el).height() )
    });
    biggerHeight = Math.max.apply(null, biggerHeight);

    itens.height(biggerHeight).find('>*').css('position', position);

}

function createCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

//getCookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function colocaAltoContraste(){
	var alto=getCookie("altoContraste");	
	if(alto != ""){		
		//alert("Colocando alto contraste");
		$('body').toggleClass('ac')
	}
}

function applyLegenda() {
	$('[longdesc]').each(function(){
		var jThis = $(this);
		isLink = false,
			parent = jThis.parent();
		if(jThis.attr('longdesc') != ""){
			
			if(parent.is('a')){
				var boxImage = '<div class="thumbText pull-'+jThis.css('float')+'"  style="width:'+jThis.width()+'px">'
				+ 		'<a href="'+parent.attr('href')+'" title="'+parent.attr('title')+'">'
				+ 			'<img src="'+jThis.attr('src')+'" alt="'+jThis.attr('alt')+'" class="img-responsive" width="'+jThis.width()+'" height="'+jThis.height()+'">'
				+ 		'</a>'
				+  	'<div class="caption">'
				+       	'<p>'+jThis.attr('longdesc')+'</p>'
				+  	'</div>'
				+  '</div>'
				
				parent.after(boxImage);
				parent.remove();
			}else{
				var boxImage = '<div class="thumbText pull-'+jThis.css('float')+'"  style="width:'+jThis.width()+'px">'
				+ 		'<img src="'+jThis.attr('src')+'" alt="'+jThis.attr('alt')+'" class="img-responsive" width="'+jThis.width()+'" height="'+jThis.height()+'">'
				+  	'<div class="caption">'
				+       	'<p>'+jThis.attr('longdesc')+'</p>'
				+  	'</div>'
				+  '</div>'
				
				jThis.after(boxImage);
				jThis.remove();
			}
		}
	});
}

//SOMENTE NUMEROS
function SomenteNumero(e){
    var tecla=(window.event)?event.keyCode:e.which;
    if((tecla>47 && tecla<58)) return true;
    else{
    	if (tecla==8 || tecla==0  || tecla==13) return true;
	else  return false;
    }
}

//TAMANHO FOOTER DINAMICO
function changefooter(){
	$('body').css('padding-bottom', $('footer').height());
	setTimeout(function(){
		changefooter();
	},100)
}

//PLACEHOLDER CROSS BROWSER
function placeholder(){
	$('input[placeholder]').placeholder();
}

 $('.servicosContainer').each(function(){
    	adjustSize($(this), 'relative');
   	});
	
function paddingColuna (elm){
    $('.paddingColuna').find(elm+':nth-of-type(3n+1)').addClass('first').end()
        .find(elm+':nth-of-type(3n+2)').addClass('middle').end()
        .find(elm+':nth-of-type(3n+3)').addClass('last');
}

// IF IE
if((navigator.appVersion.indexOf("MSIE")!=-1)||(navigator.appVersion.indexOf("Trident")!=-1)){
	$('body').addClass('ie')
}

// TOGGLE ITEM
function useToggle (toggle){
	toggle.click(function(e){
		var active = true;

		if(!$(this).is(':checkbox')){
			e.preventDefault();
			var jThis = $(this);
		}else{
			active = $(this).is(':checked');
			var	jThis = $(this).parent();
		}
		
		var classe = jThis.attr('class');
		
		if (classe.indexOf('uniqueItem')>-1){
			console.log('asd')
			jThis.parent().siblings('.toggleContent').find('>div').last().slideUp();
		}
		
		jThis.next().stop(true, true).slideToggle("fast");

		if (!active){
			jThis.next().find('input').attr('checked',false)
		}

		if (classe.indexOf('changeIcon-Y')>-1){
			jThis.find('.glyphicon').toggleClass('glyphicon-triangle-bottom').toggleClass(' glyphicon-triangle-top');
		}else if (classe.indexOf('parentChange')>-1) {
			jThis.parent().toggleClass('active')
		};

	});
}

// TAMANHO FILHO     
function childSize(parent){
    var maxHeight = [];
    // TAMANHO ITENS
    setTimeout(function(){
	    parent.find('.changeSize').each(function(){
	        var jThis = $(this);
	    	jThis.height('auto');
	        maxHeight.push(jThis.height())
	    }).each(function(){
	        $(this).height(Math.max.apply(null, maxHeight));
	    });
    },100);
}

$(document).ready(function() {
	//FORMATANDO BREADCRUMB
	$(".breadcrumb").find(".cms-collector-info").remove();
	
	if(getCookie("altoContraste") != ""){		
		colocaAltoContraste();
	}else{
		eraseCookie("altoContraste");
	}	
	
	
	//ABRIR MENU AO CARREGAR A PÁGINA
	if($("#open").val() == "true"){
		$(".active").closest(".nivel2").css("background-color", "#EAEBEE");
		$(".active").parent().css("display", "block");
	}
	
	// AJUSTAR TAMANHO
    $('.linhaCategoria').each(function(){
    	adjustSize($(this), 'relative');
   	});
http://srvmcti01.squadra.com.br:8080/mctic/opencms/system/workplace/editors/editor_main.jsp?resource=%2Fsystem%2Fmodules%2Fbr.com.squadra.principal%2Fresources%2Fjs%2Fglobal.js&resourcelist=#	$('.boxCategoria').find('.text').addClass('alignMiddle')

	if($('img[longdesc]').length > 0){
		applyLegenda();
	}
	
	$('.tableChildren').hide();
    $('.arquivoParent').click(function(){
        $(this).addClass('active');
        $('.tableChildren').toggle();
    })

	// clearInput ();
	placeholder();

	// TOOLTIP
	$('[data-toggle="tooltip"]').tooltip()

//	// HEADER
//	$('header').load('include/header.html',function(){
//		placeholder();
//
//		// ALTO CONTRASTE
		$('.toggleAC').click(function(e){
			e.preventDefault();	
			if(getCookie("altoContraste")== "" ){
				createCookie("altoContraste", "true",1);
				colocaAltoContraste();			
			}else{
				eraseCookie("altoContraste");
				$('body').toggleClass('ac');
			}
			
		});	
//
//		// IR PARA
//		$('#irParaBusca').click(function(e){
//			e.preventDefault();
//			$('#buscar').focus()
//		})
//	});

	if( $('.searchFile').length > 0 ){
		$('.searchFile').click(function(e) {
			e.preventDefault();

			$(this).siblings('[type=file]').click()
		});

		$('[type=file]').change(function() {
			$('.searchInput').val( $(this).val() )
		});
	}
	
		useToggle ($('nav').find('.toggleNext').parent());

		
		$('.msgAviso').find('.close').click(function(event) {
			$(this).parent().slideToggle(function(){
				$(this).remove()
			})
		});

	changefooter();
	
	
	// ASIDE
	var aside = $('aside'),
		asideType = $('aside').attr('title');

		switch (asideType){
			case 'filtro' :
				// MARCAR / DESMARCAR TODOS
				$('.checkAll').find('input').click(function(){
					var jThis = $(this);
					if(jThis.prop('checked')){
						jThis.parent().siblings().find('input').prop('checked',true)
					}else{
						jThis.parent().siblings().find('input').prop('checked',false)
					}
				});
				break;
			case 'check' :
				useToggle ($('aside').find('.toggleNext'));
				break;
			case 'filtroLista' :
				//CHOSEN
				$(".chosen").chosen({
					disable_search_threshold: 100,
					width:'100%'
				});

				// DATEPICKER
				aside.find('.dataContent').each(function(){
					initDateTime($(this).find('.dataInicio'),$(this).find('.dataFim'));
				});

				aside.find(".date").datepicker( "option", "changeMonth", true )
								   .datepicker( "option", "changeYear", true )
								   .datepicker( "option", "showOn", "focus" );
				break;	
				
			case 'buscaAvancada' :
				// DATEPICKER
				aside.find('.dataContent').each(function(){
					initDateTime($(this).find('.dataInicio'),$(this).find('.dataFim'));
				});

				aside.find(".date").datepicker( "option", "changeMonth", true )
								   .datepicker( "option", "changeYear", true )
								   .datepicker( "option", "showOn", "focus" );

				//CHOSEN
				$(".chosen").chosen({
					disable_search_threshold: 100,
					width:'100%'
				});

				// MARCAR / DESMARCAR TODOS
				$('.checkAll').find('input').click(function(){
					var jThis = $(this);
					if(jThis.prop('checked')){
						jThis.parent().siblings().find('input').prop('checked',true)
					}else{
						jThis.parent().siblings().find('input').prop('checked',false)
					}
				});
				break;
				
			default:
				// TWITTER
				if($('#populateTwitter').length > 0){
			    	$('#populateTwitter').html('<a class="twitter-timeline" width="100%" height="265" href="https://twitter.com/MCTIC" data-chrome="noheader nofooter">Tweets by MCTIC</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>')
			  	}
	  	}
	
	
	
	//CONTROLE ICO PRINT
	// if($('.bottomPrint').length==0){
	// 	$('#global').find('>.contentPrint').hide()
	// }

	if( $('.calculateCaption').length > 0 ){
		$('.calculateCaption').find('.caption').width( $('.calculateCaption').find('img').width()-26 )
	}

	// CHOSEN
	if($(".chosen").length!=0){
		$(".chosen").find('option:first-child').text('').end().chosen({
			disable_search_threshold: 100,
			no_results_text: "Nenhum resultado encontrado!",
			width:'100%'
		}).change(function(event) {
			$(this).siblings('.chosen-container').find('>a').removeClass('error')
		});;

		// $('.validateForm').find('select[required]').show().css('position','absolute').css('width',0).css('box-shadow', '0 0 0 0');
		
	};
	
	useToggle ($('.contentInfo').find('>h3'));

	// TWITTER
	if($('#populateTwitter').length > 0){
    	$('#populateTwitter').html('<a class="twitter-timeline" width="100%" height="265" href="https://twitter.com/MCTIC" data-chrome="noheader nofooter">Tweets by MCTIC</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>')
  	}

  	// VIDEO INTERNO
  	if($('.video-js').length > 0){
  		$('.video-js').each(function(){
  			$(this).append(' <span class="glyphicon glyphicon-play visible-print-block playVideo"></span>')
  		})
  	}

  	// VIDEO EXTERNO
  	if($('.ytVideo').length > 0){
  		$('.ytVideo').each(function(){
  			var jThis = $(this);
  			jThis.after('<div class="ytPrint visible-print-block"><img src="https://i.ytimg.com/vi/'+jThis.attr('src').split('https://www.youtube.com/embed/')[1]+'/hqdefault.jpg" alt="thumbYT" /> <span class="glyphicon glyphicon-play playVideo"></span> </div>');
  		})
  	}

  	if( $('.panel.toggleContent').length > 0 ){
  		useToggle ( $('.panel.toggleContent').find('.panel-heading') );
  	}
	
	$('.checkPublicacao').find('input[type=checkbox]').click(function(){
    	var jThis = $(this);
    	jThis.parent().parent().siblings('input').prop('checked',true);
		    if(jThis.siblings('ul').length > 0) {
		        if (!jThis.prop('checked')){
		            jThis.siblings('ul').find('input').prop('checked',false)
		        }
		    }
	});
  	
});

$(window).resize(function() {
	changefooter();
	adjustSize($('.categoriaContainer'), 'relative');

	if( $('.calculateCaption').length > 0 ){
		$('.calculateCaption').find('img').width('auto').end()
							  .find('.caption').width('auto').end()
							  .find('.caption').width( $('.calculateCaption').find('img').width()-26 )
	}
});

$(document).ready(function() {
	//DOWNLOAD DE TODOS OS LINKS
	$("#downloadAll").click(function(e){
		e.preventDefault()
	    var numDownloads = $(".downloadClass").size();
	    for(var i=0; i < numDownloads; i++){ 
			var links = i+1;
	        document.getElementById('link-'+links).click();
	    }
	});
});