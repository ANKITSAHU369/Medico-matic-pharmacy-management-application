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
    function getData() {
        $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
            function (data) {
                data.map((item, pos) => {
                    createRowstr(item)
                })

            },
        );
    }

    getData();

    $('#resetBtn').click(function (e) {
        e.preventDefault();
        $('#usersearchBox').val('');
        $("#tableBody").html("");
        getData();
        $('#tableBody tr').css('display', '')
    });
    function createRowstr(data) {
        let tr = (`
        <tr class="table-row">
            <td class="secondary-text">${data.id}</td>
            <td class="secondary-text"><img src=${data.profilePic}/></td>
            <td class="secondary-text">${data.fullName}</td>
            <td class="primary-text">${data.dob}</td>
            <td class="secondary-text">${data.gender}</td>
            <td class="secondary-text">${data.currentCity}, ${data.currentCountry}</td>
        </tr>`)
        $('#tableBody').append(tr);
    }


    $('#search-form').submit((e) => {
        let searchValue = document.getElementById('usersearchBox').value.toUpperCase();
        e.preventDefault();
        if (searchValue.length < 2) {
            alert('Please enter atleast 2 characters');
            $('#tableBody tr').css('display', '')
        } else {
            $.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${searchValue}`,
                function (data, textStatus, jqXHR) {
                    console.log(data);
                    $("#tableBody").html("");
                    data.map((item, pos) => {
                        
                        createRowstr(item)
                    })

                },
            );
        }
    })
});