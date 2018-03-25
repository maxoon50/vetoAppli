$(document).ready(function(){


    ////////----------------EVENTS----------------------////////

    $(document).on("click",'.js-remove-user', function(e){
        e.preventDefault();
        removeUser($(this).attr("href"));
    })


    $('.modal').on('shown.bs.modal', function (e) {
        fillModalWithData($(this));
    })


    ////////----------------END EVENTS----------------------////////


    function fillModalWithData($this){
        let userId = $($this).attr('id').substr($($this).attr('id').indexOf("-")+1);
        let containerData = $("tr[data-id='" + userId + "']");
        let pseudo = $(containerData).attr('data-pseudo');
        let password = $(containerData).attr('data-password');
        let role = $(containerData).attr('data-role');
        $("#email"+userId).val(pseudo);
        $("#password"+userId).val(password);
        $("#role"+userId).val(role);
    }


    function removeUser(url){
        removeDomUser(url.substr(url.indexOf("=")+1));
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
        $("tr[data-id='" + id + "']").fadeOut(400,);
    }



});