$(document).ready(function () {
    if (localStorage.getItem('loginStatus') !== 'true') {
        location.assign('./index.html')
    }
    const logoutButton = document.getElementById('logout-button');
    logoutButton.onclick = function (e) {
        e.preventDefault();
        localStorage.setItem('loginStatus', false)
        location.assign('./index.html')
    }
    $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
        function (data) {
            data.map((item, pos) => {
                createRowstr(item)
                $('#count').html(data.length)
            })
        },
    );
    function createRowstr(data) {
        let tr = (`
        <tr class="table-row">
            <td class="secondary-text">${data.id}</td>
            <td class="primary-text">${data.medicineName}</td>
            <td class="secondary-text">${data.medicineBrand}</td>
            <td class="primary-text">${data.expiryDate}</td>
            <td class="secondary-text">$${data.unitPrice}</td>
            <td class="secondary-text">${data.stock}</td>
        </tr>`)
        $('#tableBody').append(tr);
    }



    var expiredCheckBox = document.getElementById('expiredCheckbox');
    expiredCheckBox.addEventListener('change', function (e) {
        e.preventDefault();
        let tablebody = document.getElementById('tableBody');
        let tr = tablebody.getElementsByTagName('tr');
        for (let i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName('td')[3];
            if (td) {
                let textValue = myParser(td.textContent || td.innerHTML);
                if (new Date(textValue).getTime() < new Date().getTime()) {
                    if (this.checked === true) {
                        tr[i].style.display = "";
                        $('#count').html(parseInt($('#count').html()) + 1);
                    } else {
                        tr[i].style.display = "none";
                        $('#count').html(parseInt($('#count').html()) - 1);
                    }
                }
            }
        }
    })

    function myParser(date) {
        var arr = date.split('-');
        return arr.join(' ')
    }

    var lowStockCheckBox = document.getElementById('lowStockCheckbox');
    lowStockCheckBox.addEventListener('change', function (e) {
        e.preventDefault();
        let tablebody = document.getElementById('tableBody');
        let tr = tablebody.getElementsByTagName('tr');
        for (let i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName('td')[5];
            if (td) {
                let textValue = td.textContent || td.innerHTML;
                if (textValue < 100) {
                    if (this.checked === true) {
                        tr[i].style.display = "";
                        $('#count').html(parseInt($('#count').html()) + 1);
                    } else {
                        tr[i].style.display = "none";
                        $('#count').html(parseInt($('#count').html()) - 1);
                    }
                }
            }
        }
    })


});