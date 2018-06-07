$('#btn-next').click(function(){
    var data = {};
    var formData = $('form').serializeArray();
    console.log('data:', data);
    $.each(formData, function(index, item){
      console.log(index, item);
      data[item.name] = item.value;
    });
    $.ajax({
      url: '/api/setting',
      data: data,
      method: 'POST'
    }).done(function(res){
      console.log('res:', res);
    })
})
