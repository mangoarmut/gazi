$(document).ready(function()
{
    var canSubmitContactForm = true;
    $("#submit-contact-form").on("click", function(e)
    {
        e.preventDefault();
        if(canSubmitContactForm)
        {
            canSubmitContactForm = false;
            var self = this;
            $(self).attr("disabled", true);
            $("#submit-contact-form span").text($("[name=sending-loading-text]").val());
            var data = {
                _token: $("#contact-form [name=_token]").val(),
                name: $("#contact-form [name=name]").val(),
                phone: $("#contact-form [name=phone]").val(),
                email: $("#contact-form [name=email]").val(),
                subject: $("#contact-form [name=subject]").val(),
                msg: $("#contact-form [name=msg]").val()
            };
            $.ajax({
                url: $("[name=send-contact-message-url]").val(),
                type: "POST",
                data: data,
                success: function(response)
                {
                    if(response.status == 1)
                    {
                        $("#contact-form [name=name]").val("");
                        $("#contact-form [name=phone]").val("");
                        $("#contact-form [name=email]").val("");
                        $("#contact-form [name=subject]").val("");
                        $("#contact-form [name=msg]").val("");
                    }
                    alert(response.message);
                    $(self).attr("disabled", false);
                    $("#submit-contact-form span").text($("[name=send-text]").val());
                    canSubmitContactForm = true;
                },
                error: function(e)
                {
                    alert($("[name=fill-form-error-text]").val());
                    $(self).attr("disabled", false);
                    $("#submit-contact-form span").text($("[name=send-text]").val());
                    canSubmitContactForm = true;
                }
            });
        }
    });
});