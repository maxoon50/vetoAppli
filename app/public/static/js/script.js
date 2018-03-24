$(document).ready(function(){


    $(document).on("click",'.js-remove-user', function(e){
        e.preventDefault();
        removeUser($(this).attr("href"));
    })



    function removeUser(url){

        $.ajax({
            method: "GET",
            url: url,
        })
            .done(function( msg ) {
                if(msg.error == null){
                     removeDomUser(url.substr(url.indexOf("="+1)));
                }else{
                     alert(msg.error);
                }
        })
            .fail(function(err){
                alert("erreur, merci de contacter l'administrateur");
            })
    }


    function removeDomUser(id){
    console.log(id);
    }



});