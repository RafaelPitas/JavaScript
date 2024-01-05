var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {

    //define o array como vazio para carregar os pokemons dentro dele
    $scope.pokemons = [];
    //define o array da busca por id como vazio
    $scope.pokemonSelecionado = [];
    var pokemons;
    //define o loader como false para o loader aparecer
    $scope.xLoader = false;
    //var x = true;   define var = x e atribui true para o x (on scroll)

    //atribui para a variavel url o link para api
    var url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";
    // atribui o scope.pegar para a function com parametro = letra
    // letra = "" é um valor pré definido para a letra sucetível a alguma alteração
    $scope.pegar = function (letra = "") {   
        //define o array como vazio para limpar os pokemons quando carregados de novo
        $scope.pokemons = [];

        // x = false; atribui o x para false (on scroll)

        //get (pegar) o url .then (possui argumentos sucesso ou fracasso) nesse caso para o get do url
        //e passa para a function que vai analizar caso deu certo
        $http.get(url).then(function (response) {
            // x = true; atribui o x para true (on scroll)

            //se o get deu certo continua se não return e tenta de novo até success
            if (!response.data.next) return;
            // var pokemons = sucesso do get
            pokemons = response.data.results;
            //para carregar os pokemons sem precisar clicar nos "filtros de letra"
            //se tiver uma letra faz o filtro
            if (letra != "") {
                //percorre (foreach) o pokemon = get url atrás de...
                pokemons.forEach(pokemon => {
                    //de outro get usando o pokemon url 
                    $http.get(pokemon.url).then(function (response) {
                        //...
                        pokemon.data = response.data;
                        //atribui a var string pokemon name que vem do get do url 
                        var string = pokemon.name;
                        //se a primeira letra (0,1) do nome do pokemon for = a letra enviada pelo click no html
                        //substr transfroma algo em uma sub stringh de (tal tamanho)
                        if (string.substr(0, 1) == letra) {
                            //postar na tela os que forem true para essa afirmação 
                            //push o que a API nos entrega. Nesse caso o pokemon
                            $scope.pokemons.push(pokemon);
                        }
                    });
                });
                //se não tiver uma letra so carrega todos os pokemons
            } else {
                //percorre (foreach) o pokemon = get url atrás de...
                pokemons.forEach(pokemon => {
                    //de outro get usando o pokemon url 
                    $http.get(pokemon.url).then(function (response) {
                        //...
                        pokemon.data = response.data;
                        //atribui a var string pokemon name que vem do get do url 
                        var string = pokemon.name;
                            //postar na tela os que forem true para essa afirmação 
                            //push o que a API nos entrega. Nesse caso o pokemon
                            $scope.pokemons.push(pokemon);
                    });
                     
                });
            }
            //encerrra o loader e carrega a página
            $scope.xLoader = true;
        });
    };
    

    //chama a function pegar e posa na tela os resutlados do código feito acima
    $scope.pegar();
    //pega o id do url para o modal
    $scope.buscarPoke = function (id) { 
        console.log(pokemons);
        $scope.pokemonSelecionado = [];
      //for do modal para comparar de o id é igual o id chamado e dar o push
        for (var e = 0; e < pokemons.length; e++) {
            if (pokemons[e].data.id == id) {
                $scope.pokemonSelecionado.push(pokemons[e])
            }
        }
    }

    //    window.onscroll = function () {
    //
    //        if (window.scrollY + 2000 >= document.body.clientHeight) {
    //
    //            if (x) {
    //
    //                $scope.pegar();
    //            }
    //        }
    //    }

});

var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};
//sobe a página por um button
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";

  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
