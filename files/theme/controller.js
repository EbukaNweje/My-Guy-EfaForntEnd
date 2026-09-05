$(document).ready(function (){
    cryptCurrentPrice();


    $(".kyc-form").submit(function(e){
            e.preventDefault();
            let formdatas = new FormData(this);
            $(".kyc-notices").hide();
            $(".kyc-one").prop('disabled',true).html('Please wait...');
            $("input").prop('disabled',true);
            $.ajax({
                url:base_url+'control',
                data:formdatas,
                type:'POST',
                cache: false,
                processData: false,
                contentType: false,
                success:function(res){
                      setTimeout(function(){
                        $(".kyc-one").prop('disabled',false).html('Submit');
                        $("input").prop('disabled',false);
                         if(res == 3030){
                             window.location = base_url+'account?cate=settings&&kyc';
                         }else{
                            $("#kyc-notices").html(`<div class="alert alert-info ">${res}</div>`).show();
                         }
                       
                        
                      },500);
                }
            })
    })

    $("#auth-users").submit(function (e){
           e.preventDefault();
           let formDatas = $(this).serialize();
           let auth = $("#user_auth").val();
         $('input').prop('disabled',true);
          $(".aut").prop('disabled',true).html('Please wait...');
        $("#alert").hide();
          $.ajax({
               url:base_url+'control',
               data:formDatas,
               type:'post',
              success:function (res){
                      setTimeout(function (){
                        $('input').prop('disabled',false);
                         if(auth == 'login'){
                             $(".aut").prop('disabled',false).html('Log In');
                         }else{
                             $(".aut").prop('disabled',false).html('Register');
                         }

                           if(res == 1){
                                window.location = base_url+'account?cate=dashboard';
                           }else

                            if(res == 2){
                                window.location = base_url+'musers?hrs=google-auth';
                            }

                           else
                           {
                                 $("#alert").html(`<div class="alert alert-info">${res}</div>`).show();
                           }
                    },500)
              }
          })
    });



    $("#form-complete").submit(function (e){
          e.preventDefault();
           var uForms = new FormData(this);
            $(".upl-com").prop('disabled',true).html('Please wait...');
            $('input, select, textarea').prop('disabled',true);
            $("#alert").hide();
            $.ajax({
                url:base_url+'control',
                data:uForms,
                type:'post',
                cache: false,
                processData: false,
                contentType: false,
                success:function (res){
                     setTimeout(function (){
                          if(res == 1){
                               window.location = '';
                          }else
                          {
                              $(".upl-com").prop('disabled',false).html('Submit');
                              $('input, select, textarea').prop('disabled',false);
                              $("#alert").html(res).show();
                          }

                     },500);
                }
            })
    })

    $(".mcountry").change(function (){
          let v = $(this).val();
           $.ajax({
               url:base_url+'control',
               data:{mcountry:v,usercont:'conts'},
               type:'POST',
               success:function (res){
                   // alert(res)
                    $(".mstate").html(res)
               }
           })
    })
});

$(".back-to").click(function (){
    $(this).hide();
    $(".details").hide();
    $("#first-with").show();
    $(".withdraw").text('Continue');
})

$(".withdraw").click(function (){
    let ds = $(this).text();
    switch (ds) {
        case 'Continue':
            if ($(".w-amt").val() == '' || $(".atype").val() == '') {
                $("#notam").html(notify('error', 'Please check if some form input are empty'))
            } else {

                $(".withdraw").text('Submit');
                $("#notam").hide()
                $(".details").show();
                $("#first-with").hide();
                $(".back-to").show();

            }

            break;
        case 'Submit':
            let $formData = $("#withdraw-fund").serialize();
            $(".withdraw").prop('disabled',true).html('Please wait...')
            $.ajax({
                url: base_url+'control',
                data: $formData,
                type: 'POST',
                success: function (res) {
                      
                    setTimeout(function (){
                        $(".withdraw").prop('disabled',false).html('Submit')
                       
                            $("#notam").html(notify('fine',res)).show();
                      
                      
                    },500)

                }
            })
            break;
    }

});


function notify($type,msg){
    switch ($type){
        case 'fine':
            return `<div class='alert alert-success text-center'>${msg}</div>`;
            break;
        case 'error':
            return `<div class='alert alert-danger text-center'>${msg}</div>`;
            break;
    }
}


function isNumericKey(e)
{

    if (window.event) { var charCode = window.event.keyCode; }
    else if (e) { var charCode = e.which; }
    else { return true; }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) { return false; }
    return true;
}


$(".upact").click(function (e){
    e.preventDefault();
    let mc = $(this).attr('id').replace("ids-","");
    let formDatas =$(".user-account"+mc).serialize();

    $("#ids-"+mc).prop('disabled',true).html('Please wait...');
    

    $("#notam").hide();
    $.ajax({
        url:base_url+'control',
        data:formDatas,
        type:'POST',
        success:function (res){

            setTimeout(function (){
                $("#ids-"+mc).prop('disabled',false).html('Submit');
                $("#notam").html(notify('fine',res)).show();
            },500)
        }
    })
})

$(".back-depo").click(function (){
    $(this).hide();
    $(".deposit").text('Continue');
 $(".first-depo").show();
 $(".second-depo").hide();

})

$(".deposit").click(function (){
   let buts = $(this);
   let butt = buts.text();
 let notices = $("#notice");
 let notices_wall = $("#notice_wall");
 let mspin = $("#preloader-spinner");
 let spinText = $(".text-cent");
 let amount = parseInt($("#amount-deposit").val());
 let mini = parseInt($("#mini").val());
 let max = parseInt($("#maxi").val());
  $("#amount-pay").html(convertCurr(amount));
 $(".notice").show();
 notices.hide();
 notices_wall.hide()
    switch (butt){
        case 'Continue':

            if($("#amount-deposit").val() === ""){
                notices.html('Please enter the amount you want to deposit').show()
            }else
             if($("#wallet-Type").val() === ""){
                notices_wall.html('Please enter the amount you want to deposit').show()
             }else
            
            {


                if (mini > amount) {
                    notices.html('$'+mini + ' is the minimum amount to deposit').show()
                } else {

                    notices.hide();
                    notices_wall.hide()

                    mspin.show();
                    spinText.text('Connecting to blockchain...');
                     let wall = $("#wallet-Type").val();

                   $("#imgData").html(`<img src="http://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${wall}" />`);
                   $(".walletData").val(wall);


                    setTimeout(function () {
                        spinText.text('Almost finish please wait...');
                        
                        setTimeout(function () {
                            spinText.text('Connecting to blockchain server was successful').addClass('tcolor');
                            setTimeout(function () {
                                 $(".deposit").hide();
                                spinText.removeClass('tcolor');
                                mspin.hide();
                                buts.text('Submit');
                                $(".back-depo").show();
                                $(".first-depo").hide();
                                $(".second-depo").show();

                            }, 4000)
                        }, 3000)
                    }, 2000);


                }
            }

            break;
        case 'Submit':
             let imgs = document.getElementById('proof-payment').files[0];
              if(document.getElementById('proof-payment').files.length === 0){
                  $("#notices-upl").html('Please upload proof of payment');
              
              }else{

         let formData = new FormData();
             formData.append('proof-img',imgs);
             formData.append('amount-data',$("#amount-deposit").val());
             formData.append('comment',$("#pro-message").val());
             
             $.ajax({
                url:base_url+'control',
                type:'POST',
                data:formData,
                cache : false,
                dataType    : 'json',
                processData : false,
                success:function(res){
                    mspin.show();
                    spinText.text('Processing your request. Please wait...').show();
                    setTimeout(function(){
                        mspin.hide();

                        $("#deposit-form")[0].reset();
                        $(".deposit").text('Continue');
                        $(".back-depo").hide();
                        $(".first-depo").show();
                        $(".second-depo").hide();
                        $(".notice").html(notify('fine',res.alert)).show()

                    },800)
                }
                
             })
        

        }

            break;
    }



});

$("#factorUpdate").change(function(){
       let fact = $(this).val();
       $.ajax({
          url:base_url+'control',
          data:{fact:fact},
          type:'POST',
          success:function(res){
              $("#alert").html(`<div class="alert alert-info text-center">${res}</div>`)
          }
       })
})



//// Get the CryptoCurrency Information from the API
function cryptCurrentPrice(){
    jQuery.ajax({
        url: "https://min-api.cryptocompare.com/data/pricemulti",
        data: "fsyms=BTC,ETH,DASH,LTC&tsyms=USD",
        dataType: 'json',
    }).done(function(data) {
        // console.log( "BTC : " + data.BTC.USD + ", ETH : " + data.ETH.USD + ", DASH : " + data.DASH.USD, LTC : " + data.LTC.USD);
        jQuery(".dashCoin").html('$' + data.DASH.USD);
        jQuery(".ethCoin").html('$' + data.ETH.USD);
        jQuery(".bitCoin").html('$' + data.BTC.USD);
        jQuery(".liteCoin").html('$' + data.LTC.USD);
    }).fail(function() {
        console.log("API error");
    });

}


const convertCurr = (num) =>{
    const lk = parseInt(num)
    return lk.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


function isNumericKey(e)
{

    if (window.event) { var charCode = window.event.keyCode; }
    else if (e) { var charCode = e.which; }
    else { return true; }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) { return false; }
    return true;
}

function walletType(wallet){
        $.ajax({
            url:base_url+'control',
            data:{walletData:wallet},
            type:'POST',
            success:function(res){

            }
        })
}