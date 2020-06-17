$(document).ready(function () {
    $(".hidden-bottom").hide();
});

$(".card").on("mouseover", function () {
    $("#" + $(this).attr("id") + " .hidden-bottom").slideDown();
})

$(".card").on("mouseleave", function () {
    $("#" + $(this).attr("id") + " .hidden-bottom").slideUp();
})

$("nav i").on("click", function() {
    $(".form-inline").submit();
})

$(".small-imgs").on("mouseleave", function () {
    $(".small-imgs").addClass("small-img-bigger");
})

$(".card").on("mouseleave", function () {
    $(".small-imgs").removeClass("small-img-bigger");
})