export function showToast(data, classes) {
	document.getElementById('toastBody').innerText = data;
	document.getElementById('toastBox').classList.add(classes);
	if (
		document.getElementById('toastBox').classList.contains('bg-success') &&
		classes == 'bg-danger'
	) {
		document.getElementById('toastBox').classList.remove('bg-success');
	} else if (
		document.getElementById('toastBox').classList.contains('bg-danger') &&
		classes == 'bg-success'
	) {
		document.getElementById('toastBox').classList.remove('bg-danger');
	}
	var toastElList = [].slice.call(document.querySelectorAll('.toast-add'));
	var toastList = toastElList.map(function (toastEl) {
		return new bootstrap.Toast(toastEl);
	});
	toastList.forEach((toast) => toast.show());
}
