function ajaxDelete(url) {
  const headers = {
    'csrf-token': $('[name="_csrf"]').val()
  }
  return Promise.resolve(
    $.ajax({
      url,
      method: 'GET',
      dataType: 'json',
      headers
    })
  )
}

/*Ha a method részt delete-re állítva hagyom, ahogy órán csináltuk valamiért nem találja meg, 
hiába van a route-nál is delete-re állítva
Ezért írtam át get-re az ajaxos kérésemet, így működik */

function my_confirm(question) {
  let _resolve
  let _reject

  const $modal = $('.confirm-modal')
  $modal.modal('show')

  $modal.find('.modal-ok').on('click', function (e) {
    _resolve(true)
  })

  $modal.find('.modal-cancel').on('click', function (e) {
    _resolve(false)
  })

  return new Promise(function (resolve, reject) {
    _resolve = resolve
    _reject = reject
  })
}

$('#table').find(".delete").on('click', function (e) {
  e.preventDefault()
  my_confirm('Biztos törölni akarod?').then(response => {
    if (response) {
      const url = '/ajax' + $(this).attr('href')
      ajaxDelete(url)
        .then(data => {
          location.assign('/home')
        })
        .catch(xhr => {
          $('.help-block').text(xhr.responseText)
        })
    }
  })
})