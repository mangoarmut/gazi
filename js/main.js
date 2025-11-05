$(document).ready(function()
{
    // Online Appointment
    $(".online-appointment").on("click", function(e)
    {
        e.preventDefault();
        if($("#info-form").length > 0)
        {
            document.getElementById("info-form").scrollIntoView();
        }
        else
        {
            var arr = window.location.pathname.split("/");
            window.location.href = "/" + arr[1] + "#info-form";
        }
    });

    // Patient Info Form
    var canSendPatientInfoForm = true;
    $(".patient-info-form-submit").on("click", function(e)
    {
        e.preventDefault();
        if(canSendPatientInfoForm)
        {
            canSendPatientInfoForm = false;
            var self = this;
            var formClass = ".patient-info-form";
            $(self).find("span").text($("[name=global-sending-loading-text]").val());
            $(self).attr("disabled", true);
            $(".patient-info-form-error").hide();
            var data = {
                _token: $(self).parents(formClass).find("[name=_token]").val(),
                name: $(self).parents(formClass).find("[name=name]").val(),
                email: $(self).parents(formClass).find("[name=email]").val(),
                phone: $(self).parents(formClass).find("[name=phone]").val(),
                subject: $(self).parents(formClass).find("[name=subject]").val(),
                consent: $(self).parents(formClass).find("[name=consent").is(":checked") ? 1 : 0,
                kvkk: $(self).parents(formClass).find("[name=kvkk").is(":checked") ? 1 : 0
            };
            $.ajax({
                url: $("[name=patient-form-url]").val(),
                type: "POST",
                data: data,
                success: function(response)
                {
                    canSendPatientInfoForm = true;
                    $(self).find("span").text($("[name=global-send-text]").val());
                    $(self).attr("disabled", false);
                    if(response.status == 1)
                    {
                        $(self).parents(formClass).find("[name=name]").val("");
                        $(self).parents(formClass).find("[name=email]").val("");
                        $(self).parents(formClass).find("[name=phone]").val("");
                        $(self).parents(formClass).find("[name=subject]").val("");
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
                    canSendPatientInfoForm = true;
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

    // Kvkk Toggler
    $(".kvkk-toggler").on("click", function(e)
    {
        e.preventDefault();
        $(".kvkk-popup").show();
        $("html, body").css("overflow", "hidden");
    });
    $(".kvkk-popup-close").on("click", function()
    {
        $(".kvkk-popup").hide();
        $("html, body").css("overflow", "auto");
    });

    // Hair Analysis Form
    var hairAnalysisData = {};

    // STEP 1
    $(".proceed-to-form-2").on("click", function(e)
    {
        e.preventDefault();
        hairAnalysisData["gender"] = $(this).parents("form.hair-analysis-form").find("[name=gender]:checked").val();
        hairAnalysisData["age"] = $(this).parents("form.hair-analysis-form").find("[name=age]").val();
        if(hairAnalysisData["gender"] && hairAnalysisData["age"])
        {
            $(this).parents("form.hair-analysis-form").find(".form-1").addClass("d-none");
            $(this).parents("form.hair-analysis-form").find(".form-2").removeClass("d-none");
        }
        else
        {
            Swal.fire({
                icon: "error",
                title: $("[name=global-error-text]").val(),
                text: $("[name=hair-analysis-step-1-error-text]").val()
            });
        }
    });

    // STEP 2
    $(".proceed-to-form-3").on("click", function(e)
    {
        e.preventDefault();
        hairAnalysisData["hairLossFamilyMember"] = $(this).parents("form.hair-analysis-form").find("[name=hairLossFamilyMember]:checked").val();
        hairAnalysisData["hairLossDuration"] = $(this).parents("form.hair-analysis-form").find("[name=hairLossDuration]").val();
        if(hairAnalysisData["hairLossFamilyMember"] && hairAnalysisData["hairLossDuration"])
        {
            $(this).parents("form.hair-analysis-form").find(".form-2").addClass("d-none");
            if(hairAnalysisData["gender"] == "Erkek")
            {
                $(this).parents("form.hair-analysis-form").find(".form-3.male").removeClass("d-none");
            }
            else
            {
                $(this).parents("form.hair-analysis-form").find(".form-3.female").removeClass("d-none");
            }
        }
        else
        {
            Swal.fire({
                icon: "error",
                title: $("[name=global-error-text]").val(),
                text: $("[name=hair-analysis-missing-answer-error-text]").val()
            });
        }
    });
    $(".return-to-form-1").on("click", function(e)
    {
        e.preventDefault();
        $(this).parents("form.hair-analysis-form").find(".form-2").addClass("d-none");
        $(this).parents("form.hair-analysis-form").find(".form-1").removeClass("d-none");
    });

    // STEP 3
    $(".proceed-to-form-4").on("click", function(e)
    {
        e.preventDefault();
        hairAnalysisData["hairLossType"] = $(this).parents("form.hair-analysis-form").find("[name=hairLossType]:checked").val();
        if(hairAnalysisData["hairLossType"])
        {
            $(this).parents("form.hair-analysis-form").find(".form-3.male").addClass("d-none");
            $(this).parents("form.hair-analysis-form").find(".form-3.female").addClass("d-none");
            $(this).parents("form.hair-analysis-form").find(".form-4").removeClass("d-none");
        }
        else
        {
            Swal.fire({
                icon: "error",
                title: $("[name=global-error-text]").val(),
                text: $("[name=hair-analysis-missing-answer-error-text]").val()
            });
        }
    });
    $(".return-to-form-2").on("click", function(e)
    {
        e.preventDefault();
        $(this).parents("form.hair-analysis-form").find(".form-3.male").addClass("d-none");
        $(this).parents("form.hair-analysis-form").find(".form-3.female").addClass("d-none");
        $(this).parents("form.hair-analysis-form").find(".form-2").removeClass("d-none");
    });

    // STEP 4
    $(".proceed-to-form-5").on("click", function(e)
    {
        e.preventDefault();
        hairAnalysisData["name"] = $(this).parents("form.hair-analysis-form").find("[name=name]").val().trim();
        hairAnalysisData["phone"] = $(this).parents("form.hair-analysis-form").find("[name=phone]").val().trim();
        hairAnalysisData["email"] = $(this).parents("form.hair-analysis-form").find("[name=email]").val().trim();
        if(hairAnalysisData["name"] && hairAnalysisData["phone"] && hairAnalysisData["email"])
        {
            $(this).parents("form.hair-analysis-form").find(".form-4-actions").addClass("d-none");
            $(this).parents("form.hair-analysis-form").find(".form-4-please-wait-loading").removeClass("d-none");
            var self = this;
            hairAnalysisData["_token"] = $(this).parents("form.hair-analysis-form").find("[name=_token]").val();
            $.ajax({
                url: $(this).parents("form.hair-analysis-form").find("[name=send-hair-analysis-form-url]").val(),
                type: "POST",
                data: hairAnalysisData,
                success: function(result)
                {
                    if(result.status == 1)
                    {
                        $(self).parents("form.hair-analysis-form").find(".form-4").addClass("d-none");
                        $(self).parents("form.hair-analysis-form").find(".form-5").removeClass("d-none");
                    }
                    else
                    {
                        Swal.fire({
                            icon: "error",
                            title: $("[name=global-error-text]").val(),
                            text: response.message
                        });
                        $(self).parents("form.hair-analysis-form").find(".form-4-actions").removeClass("d-none");
                        $(self).parents("form.hair-analysis-form").find(".form-4-please-wait-loading").addClass("d-none");
                    }
                },
                error: function()
                {
                    Swal.fire({
                        icon: "error",
                        title: $("[name=global-error-text]").val(),
                        text: $("[name=global-system-error-text]").val()
                    });
                    $(self).parents("form.hair-analysis-form").find(".form-4-actions").removeClass("d-none");
                    $(self).parents("form.hair-analysis-form").find(".form-4-please-wait-loading").addClass("d-none");
                }
            });
        }
        else
        {
            Swal.fire({
                icon: "error",
                title: $("[name=global-error-text]").val(),
                text: $("[name=hair-analysis-missing-answer-error-text]").val()
            });
        }
    });
    $(".return-to-form-3").on("click", function(e)
    {
        e.preventDefault();
        $(this).parents("form.hair-analysis-form").find(".form-4").addClass("d-none");
        if(hairAnalysisData["gender"] == "Erkek")
        {
            $(this).parents("form.hair-analysis-form").find(".form-3.male").removeClass("d-none");
        }
        else
        {
            $(this).parents("form.hair-analysis-form").find(".form-3.female").removeClass("d-none");
        }
    });
});