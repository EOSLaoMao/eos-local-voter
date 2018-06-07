var settingAPI = '/api/setting';
var votingAPI = '/api/voting';

$.ajax({
  url: settingAPI,
  statusCode: {
      200: function(res) {
          console.log('success', res);
          $('#form-config').hide();
          $('#config-container').show();
          renderConfig(res);
          $('#form-vote').show();
      },
      404: function(res) {
          $('#form-config').show();
          $('#config-container').hide();
          $('#form-vote').hide();
      }
  }
})

function renderConfig(res) {
  console.log(23, res);

  $('p.httpEndpoint').text(res.httpEndpoint);
  $('p.chainId').text(res.chainId);
  $('p.account').text(res.account);

  $('input.httpEndpoint').val(res.httpEndpoint);
  $('input.chainId').val(res.chainId);
  $('input.account').val(res.account);
}

function formDataToObject(form) {
    var data = {};
    var formData = $(form).serializeArray();
    console.log('data:', data);
    $.each(formData, function(index, item){
      console.log(index, item);
      data[item.name] = item.value;
    });
    return data;
}

$('#btn-edit').click(function(){
    $('#form-config').show();
    $('#config-container').hide();
    $('#form-vote').hide();
})

$('#btn-save').click(function(){
    var data = formDataToObject('#form-config');
    $.ajax({
      url: settingAPI,
      data: data,
      method: 'POST'
    }).done(function(res){
      console.log('res:', res);
      renderConfig(res);
      $('#form-config').hide();
      $('#config-container').show();
      $('#form-vote').show();
    })
})


$('#btn-vote').click(function(){
    var data = formDataToObject('#form-vote');
    $.ajax({
      url: votingAPI,
      data: data,
      method: 'POST'
    }).done(function(res){
      console.log('res:', res);
    })
})
