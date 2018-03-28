$(document).ready(function(){

    const USERS_URL_REDIRECT = "http://localhost:3000/users/";


    ////////----------------EVENTS----------------------////////

    $(document).on("click",'.js-remove-user', function(e){
        e.preventDefault();
        removeUser($(this).attr("href"));
    })


    $('.modal').on('shown.bs.modal', function (e) {
        fillModalWithData($(this));
    })

    $(document).on('submit', '.js-form-modify-user', function(e){
        e.preventDefault();
        updateUser($(this), $(this).attr("action"));
    })

    $(document).on('submit', '#js-form-add-user', function(e){
        e.preventDefault();
        addUser($(this), $(this).attr("action"));
    })


    ////////----------------END EVENTS----------------------////////


    ////////----------------AJAX REQUESTS----------------------////////


    function addUser(form,url){
        $.ajax({
            method: "POST",
            url: url,
            data: $(form).serialize(),
            datatype: 'json'
        })
            .done(function( msg ) {
                if(msg.error == null){
                    window.location.href = USERS_URL_REDIRECT;
                }else{
                    alert("une erreur s'est produite, merci de contacter l'administrateur");
                }
            })
            .fail(function(err){
                alert("une erreur s'est produite, merci de contacter l'administrateur");
            })
    }

    function updateUser(form,url){
        $.ajax({
            method: "POST",
            url: url,
            data: $(form).serialize(),
            datatype: 'json'
        })
            .done(function( msg ) {
                if(msg.error == null){
                    updateDomUser(msg.user);
                }else{
                    alert("une erreur s'est produite, merci de contacter l'administrateur");
                }
            })
            .fail(function(err){
                alert("une erreur s'est produite, merci de contacter l'administrateur");
            })
    }


    function removeUser(url){
        $.ajax({
            method: "GET",
            url: url,
        })
            .done(function( msg ) {
                if(msg.error == null){
                     removeDomUser(url.substr(url.indexOf("=")+1));
                }else{
                     alert(msg.error);
                }
        })
            .fail(function(err){
                alert("erreur, merci de contacter l'administrateur");
            })
    }

    ////////----------------END AJAX REQUESTS----------------------////////




    function fillModalWithData($this){
        let userId = $($this).attr('id').substr($($this).attr('id').indexOf("-")+1);
        let containerData = $("tr[data-id='" + userId + "']");
        let pseudo = $(containerData).attr('data-pseudo');
        let password = $(containerData).attr('data-password');
        let role = $(containerData).attr('data-role');
        $("#pseudo"+userId).val(pseudo);
        $("#password"+userId).val(password);
        $("#role"+userId).val(role);
    }


    function removeDomUser(id){
        $("tr[data-id='" + id + "']").fadeOut(400,);
    }

    function updateDomUser(user){
        $("#js-user-pseudo-"+user.id).text(user.pseudo);
        $("#js-user-password-"+user.id).text(user.password);
        $("#js-user-role-"+user.id).text(user.role);
        $("#modal-"+user.id).modal('hide');
        $('.table-line').attr("data-pseudo", user.pseudo);
        $('.table-line').attr("data-password", user.password);
        $('.table-line').attr("data-role", user.role);
    }


});