var settingAPI = '/api/setting';
var votingAPI = '/api/voting';
var accountAPI = '/api/account';

$.ajax({
  url: settingAPI,
  statusCode: {
      200: function(res) {
          // console.log('success', res); renderConfig(res);
          renderConfig(res);
          updateAccount();
          togglePage('display');
      },
      404: function(res) {
          togglePage('config');
      },
      500: function(res) {
        alert('cannot fetch the account info, please make sure httpEndPoint and account name is correct')
        togglePage('config');
        console.log('failed', res);
      }
  }
})

function updateAccount() {
  $.ajax({
    url: accountAPI,
    statusCode: {
      200: function(res) {
        // console.log(res);
        // console.log(res['self_delegated_bandwidth'])
        // console.log(res['voter_info']['producers'])
        var delegated = res['self_delegated_bandwidth']
        var from = delegated['from']
        var to = delegated['to']
        var staking = [from, " --> ", to, '<br>CPU:', delegated['cpu_weight'], '<br>NET:', delegated['net_weight']];
        $('p.token').html(staking.join(' '));
        if (res['voter_info']['producers'].length) {
          $('p.producers').text(res['voter_info']['producers'].join(' '));
          $('textarea[name="producers"]').val(res['voter_info']['producers'].join(' '));
        } else {
          $('p.producers').text("Not voted for any Producer");
        }
      },
      404: function(res) {
        alert('cannot fetch the account info, please make sure httpEndPoint and account name is correct')
        togglePage('config');
        console.log('failed', res);
      },
      500: function(res) {
        alert('cannot fetch the account info, please make sure httpEndPoint and account name is correct')
        togglePage('config');
        console.log('failed', res);
      }
    }
  })
}

function togglePage(page) {
  if(page == 'config') {
    $('#form-config').show();
    $('#form-vote').hide();
    $('#config-container').hide();
    $('#vote-container').hide();
  } else if(page == "display") {
    $('#form-config').hide();
    $('#form-vote').hide();
    $('#config-container').show();
    $('#vote-container').show();
  } else if(page == "vote") {
    $('#form-config').hide();
    $('#form-vote').show();
    $('#config-container').show();
    $('#vote-container').hide();
  }
}

function renderConfig(res) {

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
  // console.log('data:', data);
  $.each(formData, function(index, item){
    // console.log(index, item);
    data[item.name] = item.value;
  });
  return data;
}

$('#btn-edit').click(function(){
  togglePage('config');
})

$('#btn-update-vote').click(function(){
  togglePage('vote');
})

$('.btn-cancel').click(function(){
  togglePage('display');
  updateAccount();
})

$('#btn-save').click(function(){
  var data = formDataToObject('#form-config');
  data['httpEndpoint'] = data['httpEndpoint'].replace(/\/$/, "");
  $.ajax({
    url: settingAPI,
    data: data,
    method: 'POST'
  }).done(function(res){
    // console.log('res:', res);
    renderConfig(res);
    updateAccount();
    togglePage('display');
  })
})


$('#btn-vote').click(function(){
  var data = formDataToObject('#form-vote');
  $.ajax({
    url: votingAPI,
    data: data,
    method: 'POST'
  }).done(function(res){
    $('textarea[name="secretKey"]').val('');
    // console.log('res:', res);
    updateAccount();
    togglePage('display');
  })
})
