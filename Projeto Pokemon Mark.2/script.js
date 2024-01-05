angular
    .module('myApp', []);
                                    .controller('myCtrl', function ($scope, $http) {

    $scope.xLoader = false;

    $scope.pokemons = [];
    $scope.pokemonModal = [];

    var pokemons;
    var url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";

    $scope.pegar = function (letra = "") {
        $scope.pokemons = [];

        $http.get(url).then(function (response) {
            if (!response.data.next) return;
            pokemons = response.data.results;

            pokemons.forEach(pokemon => {
                $http.get(pokemon.url).then(function (response) {
                    pokemon.data = response.data;
                    var string = pokemon.name;

                    if (letra != "") {
                        if (string.substr(0, 1) == letra) {
                            $scope.pokemons.push(pokemon);
                        }
                    } else {
                        $scope.pokemons.push(pokemon);
                    }
                });
            });

            $scope.xLoader = true;
        });
    };


    $scope.pegar();
    $scope.buscarPoke = function (id) {
        console.log(pokemons);
        $scope.pokemonModal = [];
        for (var e = 0; e < pokemons.length; e++) {
            if (pokemons[e].data.id == id) {
                $scope.pokemonModal.push(pokemons[e])
            }
        }
    }

});

var mybutton = document.getElementById("myBtn");

window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";

    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

function topFunction() {
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
