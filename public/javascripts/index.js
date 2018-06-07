var settingAPI = '/api/setting';
var votingAPI = '/api/voting';
var accountAPI = '/api/account';

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

function updateAccount() {
  $.ajax({
    url: accountAPI,
    statusCode: {
      200: function(res) {
        console.log(res);
        console.log(res['delegated_bandwidth'])
        console.log(res['voter_info']['producers'])
        var delegated = res['delegated_bandwidth']
        var from = delegated['from']
        var to = delegated['to']
        var staking = [from, " --> ", to, ' CPU:', delegated['cpu_weight'], ' NET:', delegated['net_weight']];
        $('p.token').text(staking.join(' '));
        $('p.producers').text(res['voter_info']['producers'].join(' '));
        
      },
      404: function(res) {
        console.log('failed', res);
      }
    }
  })
}

function renderConfig(res) {

  $('p.httpEndpoint').text(res.httpEndpoint);
  $('p.chainId').text(res.chainId);
  $('p.account').text(res.account);

  $('input.httpEndpoint').val(res.httpEndpoint);
  $('input.chainId').val(res.chainId);
  $('input.account').val(res.account);
  updateAccount();
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
