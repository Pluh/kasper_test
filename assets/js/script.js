$(document).ready(function(){
  var telInput = $(".input-dig");
  /*Неясно что посылаем*/
  var jsAData = {form: "Submit"};
      jsAData = JSON.stringify(jsAData);
      // console.log(jsAData);

  $(".input-submit").on("click", function(event) {
    // event.preventDefault();
    if( telInput[0].checkValidity() ) {
      ajaxRequest(jsAData);
    }
  });
  telInput.mask("+7 999 999 99 99");

  telInput.on("click", function() {
    if ( !$(".background-wrap").hasClass("overlay-enable") ) {
      $(".background-wrap").addClass("overlay-enable");
      $(".form-placeholder").addClass("hidden");
    }
  });

  function ajaxRequest(jsAData) {
    $.ajax({
      async: true,
      cache: false,
      data:  jsAData,
      dataType: 'json',
      timeout: 2000,
      type: 'POST',
      url: 'ajax/ajax.php',
      error: function(jqXHR, textStatus, errorThrown){
        console.log("jqXHR" + jqXHR);
        console.log("textStatus" + textStatus);
        console.log("errorThrown" + errorThrown);
      },
      success: function(data, textStatus, jqXHR){ //data уже в формате js object, не json
        // console.log(data);
        gSuccess(data.result);
      }
    });
  }
  function gSuccess(msg) {
    $(".background-wrap").removeClass("overlay-enable");
    $(".form-placeholder").removeClass("hidden");
    telInput.mask(" ");
    telInput.attr("disabled", true);
    // telInput.blur();
    $(".form-wrap .form-placeholder").text(msg);
  }

});
