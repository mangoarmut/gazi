$(document).ready(function()
{
    var canSubmitContactForm = true;
    $("#submit-complaint-form").on("click", function(e)
    {
        e.preventDefault();
        if(canSubmitContactForm)
        {
            canSubmitContactForm = false;
            var self = this;
            $(self).attr("disabled", true);
            $("#submit-complaint-form span").text($("[name=sending-loading-text]").val());
            var data = {
                _token: $("#complaint-form [name=_token]").val(),
                name: $("#complaint-form [name=name]").val(),
                phone: $("#complaint-form [name=phone]").val(),
                email: $("#complaint-form [name=email]").val(),
                subject: $("#complaint-form [name=subject]").val(),
                msg: $("#complaint-form [name=msg]").val()
            };
            $.ajax({
                url: $("[name=send-complaint-message-url]").val(),
                type: "POST",
                data: data,
                success: function(response)
                {
                    if(response.status == 1)
                    {
                        $("#complaint-form [name=name]").val("");
                        $("#complaint-form [name=phone]").val("");
                        $("#complaint-form [name=email]").val("");
                        $("#complaint-form [name=subject]").val("");
                        $("#complaint-form [name=msg]").val("");
                    }
                    alert(response.message);
                    $(self).attr("disabled", false);
                    $("#submit-complaint-form span").text($("[name=send-text]").val());
                    canSubmitContactForm = true;
                },
                error: function(e)
                {
                    alert($("[name=fill-form-error-text]").val());
                    $(self).attr("disabled", false);
                    $("#submit-complaint-form span").text($("[name=send-text]").val());
                    canSubmitContactForm = true;
                }
            });
        }
    });
});