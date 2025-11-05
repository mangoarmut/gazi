$(document).ready(function()
{
    new Swiper(".slider4", {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        }
    });

    Fancybox.bind('[data-fancybox="gallery"]', {});

    function openTab(evt, cityName)
    {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++)
        {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++)
        {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }
    $("#default-open").trigger("click");
    $(".tablinks").on("click", function(e)
    {
        e.preventDefault();
        openTab(e, $(this).data("target"));
    });

    // Doctor Ask A Question Form
    var canSendDoctorAskAQuestionForm = true;
    $(".doctor-ask-a-question-form-submit").on("click", function(e)
    {
        e.preventDefault();
        if(canSendDoctorAskAQuestionForm)
        {
            canSendDoctorAskAQuestionForm = false;
            var self = this;
            var formClass = ".doctor-ask-a-question-form";
            $(self).find("span").text($("[name=global-sending-loading-text]").val());
            $(self).attr("disabled", true);
            $(".patient-info-form-error").hide();
            var data = {
                _token: $(self).parents(formClass).find("[name=_token]").val(),
                doctor: $(self).parents(formClass).find("[name=doctor]").val(),
                name: $(self).parents(formClass).find("[name=name]").val(),
                email: $(self).parents(formClass).find("[name=email]").val(),
                phone: $(self).parents(formClass).find("[name=phone]").val(),
                subject: $(self).parents(formClass).find("[name=subject]").val(),
                question: $(self).parents(formClass).find("[name=question]").val(),
                consent: $(self).parents(formClass).find("[name=consent").is(":checked") ? 1 : 0,
                kvkk: $(self).parents(formClass).find("[name=kvkk").is(":checked") ? 1 : 0
            };
            $.ajax({
                url: $("[name=doctor-ask-a-question-form-url]").val(),
                type: "POST",
                data: data,
                success: function(response)
                {
                    canSendDoctorAskAQuestionForm = true;
                    $(self).find("span").text($("[name=global-send-text]").val());
                    $(self).attr("disabled", false);
                    if(response.status == 1)
                    {
                        $(self).parents(formClass).find("[name=name]").val("");
                        $(self).parents(formClass).find("[name=email]").val("");
                        $(self).parents(formClass).find("[name=phone]").val("");
                        $(self).parents(formClass).find("[name=subject]").val("");
                        $(self).parents(formClass).find("[name=question]").val("");
                        Swal.fire({
                            icon: "success",
                            title: $("[name=global-success-text]").val(),
                            text: response.message,
                            confirmButtonText: $("[name=global-ok-text]").val()
                        });
                    }
                    else
                    {
                        Swal.fire({
                            icon: "error",
                            title: $("[name=global-error-text]").val(),
                            text: response.message,
                            confirmButtonText: $("[name=global-ok-text]").val()
                        });
                    }
                },
                error: function(e)
                {
                    Swal.fire({
                        icon: "error",
                        title: $("[name=global-error-text]").val(),
                        text: $("[name=global-fill-form-error-text]").val(),
                        confirmButtonText: $("[name=global-ok-text]").val()
                    });
                    canSendDoctorAskAQuestionForm = true;
                    $(self).find("span").text($("[name=global-send-text]").val());
                    $(self).attr("disabled", false);

                    if(e.responseJSON.errors)
                    {
                        for(var field in e.responseJSON.errors)
                        {
                            $(".patient-info-form-error." + field).css("display", "block");
                        }
                    }
                }
            });
        }
    });
});