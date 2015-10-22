var diretiva = angular.module('QuadroBranco.directives', []);

diretiva.directive('quadroBranco', function(){

	return {
		restrict : 'E',
		scope: {
			id: '@',
			width: '@',
			height: '@',
			cor: '=',
			limpar: '=',
			aceleracao: '=',
			salvarImagem: '&'
		},
		//template: '<div></div>',
		templateUrl: 'views/quadro.html',

		link: function(scope, elemento, atributos){

			var canvas = elemento.children().children();

			atributos.id = atributos.id || 'quadro';
			atributos.width = atributos.width || window.innerWidth;
			atributos.height = atributos.height || window.innerHeight;

			canvas[0].width = atributos.width;
			canvas[0].height = atributos.height;

			var contexto = canvas[0].getContext('2d');

			var ultimoX;
			var ultimoY;

			scope.apertou = function(evento){

				var toque = buscaToques(evento.gesture.touches[0]);
				
				ultimoX = toque.x;
				ultimoY = toque.y;

				contexto.beginPath();
			}

			scope.arrastou = function(evento){

				var toque = buscaToques(evento.gesture.touches[0]);

				var atualX = toque.x;
				var atualY = toque.y;

				desenhar(ultimoX, ultimoY, atualX, atualY);

				ultimoX = atualX;
				ultimoY = atualY;

			}

			scope.doisCliques = function() {
				var chamaController = scope.salvarImagem();
				chamaController(canvas[0]);
			}

			function buscaToques(toques){

				var elemento = toques.target;
				var posicaoX = 0;
				var posicaoY = 0;

				while(elemento) {
					posicaoX += (elemento.offsetLeft - elemento.scrollLeft + elemento.clientLeft);
					posicaoY += (elemento.offsetTop - elemento.scrollTop + elemento.clientTop);
					elemento = elemento.offsetParent;
				}

				var x = toques.clientX || toques.pageX || toques.screenX || 0;
				var y = toques.clientY || toques.pageY || toques.screenY || 0;

				return {'x' : x - posicaoX, 'y' : y - posicaoY};

			}


			function desenhar(inicialX, inicialY, finalX, finalY) {
				
				contexto.moveTo(inicialX,  inicialY);
				contexto.lineTo(finalX, finalY);
				contexto.lineWidth = 2;
				contexto.strokeStyle = scope.cor;
				contexto.stroke();
			}
			

			scope.$watch('limpar', function(limpar){

				if(limpar == true){

					contexto.beginPath();
					contexto.clearRect(0, 0, atributos.width, atributos.height);

					scope.limpar = false;
				}

			});

			var x = (atributos.width/2);
			var y = 0;
			scope.$watch('aceleracao', function(aceleracao){
				
				if(aceleracao) {

					if(y >= atributos.height)
						y = 0;

					if(x >= atributos.width) {
						x = 0;
						y = 0;
					}

					var novoY = (y+4);
					var novoX = (x+aceleracao.x)+4;

					desenhar(x, y, novoX, novoY);

					x = novoX;
					y = novoY;

				}
			})
		}
	};
});