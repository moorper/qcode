var short = store.get('short') || 2;
$('input:radio[name=short]')[short - 1].checked = true;

$('input:radio[name=short]').on('click', storeShortOption)

function storeShortOption() {
    var val = $('input:radio[name=short]:checked').val();
    store.set('short', val)
}