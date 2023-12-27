function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function GetMyProfileAdmin() {
    debugger
    $.ajax({
        type: "GET",
        url: '/Admin/GetMyProfil',
        success: function (data) {
            debugger
            $('#FirstName').val(data['firstName']);
            $('#LastName').val(data['lastName']);
            $('#UserName').val(data['userName']);
            $('#Email').val(data['email']);
            $('#PhoneNumber').val(data['phoneNumber']);
            $('#Adress').val(data['adress']);
            $('#FullName').text(data['firstName'] + ' ' + data['lastName']);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

function SaveProfile() {
    debugger
    var FirstName = $('#FirstName').val().trim();
    var LastName = $('#LastName').val().trim();
    var UserName = $('#UserName').val().trim();
    var Email = $('#Email').val().trim();
    var Password = $('#Password').val().trim();
    var Passwordlenght = Password.length;//Metin uzunluğu sorgulama
    var ConfirmPassword = $('#ConfirmPassword').val().trim();
    var PhoneNumber = $('#PhoneNumber').val().trim();
    var Adress = $('#Adress').val();
    var hasUpperCase = /[A-Z]/.test(Password);//Büyük harf sorgulama
    var hasLowerCase = /[a-z]/.test(Password);//Küçük harf sorgulama

    if (FirstName == "") {
        swal.fire("Hata!", "İsminizi Giriniz!", "error");
    }
    else if (LastName == "") {
        swal.fire("Hata!", "Soyisminizi Giriniz.", "error");
    }
    else if (UserName == "") {
        swal.fire("Hata!", "Kullanıcı Adınızı Giriniz.", "error");
    }
    else if (Email == "") {
        swal.fire("Hata!", "Emailinizi Giriniz.", "error");
    }
    else if (!isValidEmail(Email)) {
        swal.fire("Hata!", "Geçerli bir Email giriniz!", "error");
    }
    else if (Password == "") {
        swal.fire("Hata!", "Şifrenizi Giriniz.", "error");
    }
    else if (Passwordlenght < 6 || !hasLowerCase || !hasUpperCase || !Password.includes('!', '.', ',', ';', ':', '?')) {//includes ile noktalama işaretlerini sorguladık.
        swal.fire("Hata!", "Şifrenizde büyük,küçük harf ve uzunluğa dikkat ediniz!", "error");
    }
    else if (ConfirmPassword != Password) {
        swal.fire("Hata!", "Şifreleriniz eşleşmiyor!", "error");
    }
    else if (PhoneNumber == "") {
        swal.fire("Hata!", "Telefon Numaranızı Giriniz.", "error");
    }
    else if (Adress == "") {
        swal.fire("Hata!", "Adresinizi Giriniz.", "error");
    }
    else {
        var formData = new FormData();
        formData.append('FirstName', FirstName);
        formData.append('LastName', LastName);
        formData.append('UserName', UserName);
        formData.append('Email', Email);
        formData.append('Password', Password);
        formData.append('ConfirmPassword', ConfirmPassword);
        formData.append('PhoneNumber', PhoneNumber);
        formData.append('Adress', Adress);
        $.ajax({
            type: "POST",
            url: '/Admin/SaveProfile',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                debugger
                swal.fire({
                    title: "Başarılı!",
                    text: "Güncelleme işleminiz gerçekleşti.",
                    icon: "success",
                    buttonsStyling: true,
                    confirmButtonText: "Tamam!",
                    confirmButtonClass: "btn btn-brand"
                }).then(function (result) {
                    if (result.value) {
                        location.reload();

                    }
                });
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
            }
        });
    }
};

//Start--Modaretor--

function GetModaretor() {
    debugger
    var table = $('#kt_table_ModaretorList');
    var t = table.DataTable({
        ajax: {
            url: '/Admin/GetModaretor',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: {
                pagination: {
                    perpage: 50,
                },
            },
        },
        "pageLength": 50,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-3 text-left'f'><'col-sm-9 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'l>>`,
        language: {
            "lengthMenu": "Sayfa başına _MENU_ kayıt göster",
            "zeroRecords": "Eşleşen kayıt bulunamadı",
            "info": "_PAGE_ / _PAGES_",
            "infoEmpty": "Gösterilecek kayıt yok",
            "infoFiltered": "(toplam _MAX_ kayıt içinden filtrelendi)",
            "search": "Ara:",
            "paginate": {
                "first": "İlk",
                "previous": "Önceki",
                "next": "Sonraki",
                "last": "Son"
            },
            "sInfo": "Toplam _TOTAL_ kayıttan _START_ ile _END_ arasındaki kayıtlar gösteriliyor",
            "sInfoEmpty": "Toplam 0 kayıt",
            "sInfoFiltered": "(toplam _MAX_ kayıt içinden filtrelendi)"
        },


        columns: [
            {
                data: 'SN',
                searchable: false,
                orderable: false,
                width: '4%',
                className: 'dt-center ml-3',
            },
            {
                data: 'FirstName',
                className: 'font-weight-bold ',
            },
            {
                data: 'LastName',
                className: 'font-weight-bold ',
            },
            {
                data: 'PhoneNumber',
                className: 'font-weight-bold ',
            },
            {
                data: 'UserName',
                className: 'font-weight-bold ',
            },
            {
                data: 'Email',
                className: 'font-weight-bold ',
            },
            {
                data: 'Adress',
                className: 'font-weight-bold ',
            },
            {
                data: 'İşlemler',
            },
        ],

        columnDefs: [
            {
                targets: 0,
                render: function (data, type, full, meta) {
                    debugger
                    result = ``;
                    return result;
                }
            },
            {
                targets: 1,
                render: function (data, type, full, meta) {
                    var result = full['firstName'];
                    return result;
                }
            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    var result = full['lastName'];
                    return result;
                }
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    var result = full['phoneNumber'];
                    return result;
                }
            },
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    var result = full['userName'];
                    return result;
                }
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    var result = full['email'];
                    return result;
                }
            },
            {
                targets: 6,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['adress'];
                    return result;
                }
            },
            {
                targets: -1,
                title: 'İşlemler',
                orderable: false,
                "width": "20%",
                render: function (data, type, full, meta) {
                    debugger
                    result = `<a onclick="EditModaretor(` + full['userId'] + `)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Düzenle" data-bs-target="#EditUserModal" data-bs-toggle="modal">
                                  <span class="fas fa-pencil-alt fa-2x"></span>
                                  </a>
                                  <a onclick="DeleteModaretor(` + full['userId'] + `)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Sil">
                                  <span class="fas fa-trash-alt fa-2x"></span>
                                   </a>`;
                    return result;
                }
            },
        ],
        order: [[1, 'asc']],
        responsive: true,
        "scrollX": true,
        orderCellsTop: true,
        "destroy": true,
    });
    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_ModaretorList').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

};

function AddModaretor() {
    debugger
    var FirstName = $('#AddUserModal #FirstName').val().trim();
    var LastName = $('#AddUserModal #LastName').val().trim();
    var UserName = $('#AddUserModal #UserName').val().trim();
    var Email = $('#AddUserModal #Email').val().trim();
    var Password = $('#AddUserModal #Password').val().trim();
    var Passwordlenght = Password.length;//Metin uzunluğu sorgulama
    var ConfirmPassword = $('#AddUserModal #ConfirmPassword').val().trim();
    var PhoneNumber = $('#AddUserModal #PhoneNumber').val();
    var Adress = $('#AddUserModal #Adress').val();
    var hasUpperCase = /[A-Z]/.test(Password);//Büyük harf sorgulama
    var hasLowerCase = /[a-z]/.test(Password);//Küçük harf sorgulama

    if (FirstName == "") {
        swal.fire("Hata!", "İsmin Giriniz!", "error");
    }
    else if (LastName == "") {
        swal.fire("Hata!", "Soyisim Giriniz.", "error");
    }
    else if (UserName == "") {
        swal.fire("Hata!", "Kullanıcı Adı Giriniz.", "error");
    }
    else if (Email == "") {
        swal.fire("Hata!", "Email Giriniz.", "error");
    }
    else if (!isValidEmail(Email)) {
        swal.fire("Hata!", "Geçerli bir Email giriniz!", "error");
    }
    else if (PhoneNumber == "") {
        swal.fire("Hata!", "Telefon Numarası Giriniz.", "error");
    }
    else if (Adress == "") {
        swal.fire("Hata!", "Adres Giriniz.", "error");
    }
    else if (Password == "") {
        swal.fire("Hata!", "Şifre Giriniz.", "error");
    }
    else if (Passwordlenght < 6 || !hasLowerCase || !hasUpperCase || !Password.includes('!', '.', ',', ';', ':', '?')) {//includes ile noktalama işaretlerini sorguladık.
        swal.fire("Hata!", "Şifrede büyük,küçük harf ve uzunluğa dikkat ediniz!", "error");
    }
    else if (ConfirmPassword != Password) {
        swal.fire("Hata!", "Şifreler eşleşmiyor!", "error");
    }
    else {
        var formData = new FormData();
        formData.append('FirstName', FirstName);
        formData.append('LastName', LastName);
        formData.append('UserName', UserName);
        formData.append('Email', Email);
        formData.append('Password', Password);
        formData.append('ConfirmPassword', ConfirmPassword);
        formData.append('PhoneNumber', PhoneNumber);
        formData.append('Adress', Adress);
        $.ajax({
            type: "POST",
            url: '/Admin/AddModaretor',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                debugger
                swal.fire({
                    title: "Başarılı!",
                    text: "Ekleme işleminiz gerçekleşti.",
                    icon: "success",
                    buttonsStyling: true,
                    confirmButtonText: "Tamam!",
                    confirmButtonClass: "btn btn-brand",
                }).then(function (result) {
                    if (result.value) {
                        location.reload();
                    }
                });
            },
            error: function (xhr, status, error) {
                var errorMessage = "Bir sorun ile karşılaşıldı!";

                try {
                    var response = JSON.parse(xhr.responseText);
                    if (response && response.error) {
                        errorMessage = response.error; // Sunucudan gelen hata mesajını al
                    }
                } catch (e) {
                    // JSON hatası varsa varsayılan hatayı kullan
                }

                swal.fire("Hata!", errorMessage, "error");
            }
        });
    }
};

function EditModaretor(userId) {
    debugger
    $.ajax({
        type: "GET",
        url: '/Admin/EditModaretor/?userId=' + userId,
        success: function (data) {
            debugger
            $('#EditUserModal #UserID').val(data['data'][0]['userId']);
            $('#EditUserModal #FirstName').val(data['data'][0]['firstName']);
            $('#EditUserModal #LastName').val(data['data'][0]['lastName']);
            $('#EditUserModal #UserName').val(data['data'][0]['userName']);
            $('#EditUserModal #Email').val(data['data'][0]['email']);
            $('#EditUserModal #PhoneNumber').val(data['data'][0]['phoneNumber']);
            $('#EditUserModal #Adress').val(data['data'][0]['adress']);
            $('#EditUserModal').modal();

        },
        error: function (xhr, status, error) {
            var errorMessage = "Bir sorun ile karşılaşıldı!";

            try {
                var response = JSON.parse(xhr.responseText);
                if (response && response.error) {
                    errorMessage = response.error; // Sunucudan gelen hata mesajını al
                }
            } catch (e) {
                // JSON hatası varsa varsayılan hatayı kullan
            }

            swal.fire("Hata!", errorMessage, "error");
        }

    });
};

function UpdateModaretor() {
    debugger
    var UserId = $('#EditUserModal #UserID').val();
    var FirstName = $('#EditUserModal #FirstName').val().trim();
    var LastName = $('#EditUserModal #LastName').val().trim();
    var UserName = $('#EditUserModal #UserName').val().trim();
    var Email = $('#EditUserModal #Email').val().trim();
    var Password = $('#EditUserModal #EditPassword').val().trim();
    var Passwordlenght = Password.length;//Metin uzunluğu sorgulama
    var ConfirmPassword = $('#EditUserModal #EditConfirmPassword').val().trim();
    var PhoneNumber = $('#EditUserModal #PhoneNumber').val();
    var Adress = $('#EditUserModal #Adress').val();
    var hasUpperCase = /[A-Z]/.test(Password);//Büyük harf sorgulama
    var hasLowerCase = /[a-z]/.test(Password);//Küçük harf sorgulama

    if (FirstName == "") {
        swal.fire("Hata!", "İsmin Giriniz!", "error");
    }
    else if (LastName == "") {
        swal.fire("Hata!", "Soyisim Giriniz.", "error");
    }
    else if (UserName == "") {
        swal.fire("Hata!", "Kullanıcı Adı Giriniz.", "error");
    }
    else if (Email == "") {
        swal.fire("Hata!", "Email Giriniz.", "error");
    }
    else if (!isValidEmail(Email)) {
        swal.fire("Hata!", "Geçerli bir Email giriniz!", "error");
    }
    else if (PhoneNumber == "") {
        swal.fire("Hata!", "Telefon Numarası Giriniz.", "error");
    }
    else if (Adress == "") {
        swal.fire("Hata!", "Adres Giriniz.", "error");
    }
    else if (Password == "") {
        swal.fire("Hata!", "Şifre Giriniz.", "error");
    }
    else if (Passwordlenght < 6 || !hasLowerCase || !hasUpperCase || !Password.includes('!', '.', ',', ';', ':', '?')) {//includes ile noktalama işaretlerini sorguladık.
        swal.fire("Hata!", "Şifrede büyük,küçük harf ve uzunluğa dikkat ediniz!", "error");
    }
    else if (ConfirmPassword != Password) {
        swal.fire("Hata!", "Şifreler eşleşmiyor!", "error");
    }
    else {
        var formData = new FormData();
        formData.append('UserId', UserId);
        formData.append('FirstName', FirstName);
        formData.append('LastName', LastName);
        formData.append('UserName', UserName);
        formData.append('Email', Email);
        formData.append('Password', Password);
        formData.append('ConfirmPassword', ConfirmPassword);
        formData.append('PhoneNumber', PhoneNumber);
        formData.append('Adress', Adress);
        $.ajax({
            type: "POST",
            url: '/Admin/UpdateModaretor',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                debugger
                swal.fire({
                    title: "Başarılı!",
                    text: "Güncelleme işleminiz gerçekleşti.",
                    icon: "success",
                    buttonsStyling: true,
                    confirmButtonText: "Tamam!",
                    confirmButtonClass: "btn btn-brand"
                }).then(function (result) {
                    if (result.value) {
                        location.reload();
                    }
                });
            },
            error: function (xhr, status, error) {
                var errorMessage = "Bir sorun ile karşılaşıldı!";

                try {
                    var response = JSON.parse(xhr.responseText);
                    if (response && response.error) {
                        errorMessage = response.error; // Sunucudan gelen hata mesajını al
                    }
                } catch (e) {
                    // JSON hatası varsa varsayılan hatayı kullan
                }

                swal.fire("Hata!", errorMessage, "error");
            }
        });
    }
};

function DeleteModaretor(userId) {
    swal.fire({
        title: "Emin misiniz?",
        text: "Bu işlemi gerçekleştirmek istediğinizden emin misiniz?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet, Sil",
        cancelButtonText: "Hayır"
    }).then(function (result) {
        if (result.isConfirmed) {
            // Kullanıcı evet dediyse silme işlemini başlat
            $.ajax({
                type: "POST",
                url: '/Admin/DeleteModaretor/?userId=' + userId,
                success: function (data) {
                    swal.fire({
                        title: "Başarılı!",
                        text: "Silme işlemi başarılı.",
                        icon: "success",
                        buttonsStyling: true,
                        confirmButtonText: "Tamam!",
                        confirmButtonClass: "btn btn-brand"
                    }).then(function () {
                        window.location.reload();
                    });
                },
                error: function (xhr, status, error) {
                    var errorMessage = "Bir sorun ile karşılaşıldı!";

                    try {
                        var response = JSON.parse(xhr.responseText);
                        if (response && response.error) {
                            errorMessage = response.error; // Sunucudan gelen hata mesajını al
                        }
                    } catch (e) {
                        // JSON hatası varsa varsayılan hatayı kullan
                    }

                    swal.fire("Hata!", errorMessage, "error");
                }
            });
        }
    });
}



//End--Moderator--

//Start--User--
function GetUser() {
    debugger
    var table = $('#kt_table_UserList');
    var t = table.DataTable({
        ajax: {
            url: '/Admin/GetUser',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: {
                pagination: {
                    perpage: 50,
                },
            },
        },
        "pageLength": 50,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-3 text-left'f'><'col-sm-9 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'l>>`,
        language: {
            "lengthMenu": "Sayfa başına _MENU_ kayıt göster",
            "zeroRecords": "Eşleşen kayıt bulunamadı",
            "info": "_PAGE_ / _PAGES_",
            "infoEmpty": "Gösterilecek kayıt yok",
            "infoFiltered": "(toplam _MAX_ kayıt içinden filtrelendi)",
            "search": "Ara:",
            "paginate": {
                "first": "İlk",
                "previous": "Önceki",
                "next": "Sonraki",
                "last": "Son"
            },
            "sInfo": "Toplam _TOTAL_ kayıttan _START_ ile _END_ arasındaki kayıtlar gösteriliyor",
            "sInfoEmpty": "Toplam 0 kayıt",
            "sInfoFiltered": "(toplam _MAX_ kayıt içinden filtrelendi)"
        },


        columns: [
            {
                data: 'SN',
                searchable: false,
                orderable: false,
                width: '4%',
                className: 'dt-center ml-3',
            },
            {
                data: 'FirstName',
                className: 'font-weight-bold ',
            },
            {
                data: 'LastName',
                className: 'font-weight-bold ',
            },
            {
                data: 'NumberPhone',
                className: 'font-weight-bold ',
            },
            {
                data: 'UserName',
                className: 'font-weight-bold ',
            },
            {
                data: 'Email',
                className: 'font-weight-bold ',
            },
            {
                data: 'Adress',
                className: 'font-weight-bold ',
            },
            {
                data: 'İşlemler',
            },
        ],

        columnDefs: [
            {
                targets: 0,
                render: function (data, type, full, meta) {
                    debugger
                    result = ``;
                    return result;
                }
            },
            {
                targets: 1,
                render: function (data, type, full, meta) {
                    var result = full['firstName'];
                    return result;
                }
            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    var result = full['lastName'];
                    return result;
                }
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    var result = full['phoneNumber'];
                    return result;
                }
            },
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    var result = full['userName'];
                    return result;
                }
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    var result = full['email'];
                    return result;
                }
            },
            {
                targets: 6,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['adress'];
                    return result;
                }
            },
            {
                targets: -1,
                title: 'İşlemler',
                orderable: false,
                "width": "20%",
                render: function (data, type, full, meta) {
                    debugger
                    result = `<a onclick="EditUser(` + full['userId'] + `)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Düzenle" data-bs-target="#EditUserModal" data-bs-toggle="modal">
                                  <span class="fas fa-pencil-alt fa-2x"></span>
                                  </a>
                                  <a onclick="DeleteUser(` + full['userId'] + `)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Sil">
                                  <span class="fas fa-trash-alt fa-2x"></span>
                                   </a>`;
                    return result;
                }
            },
        ],
        order: [[1, 'asc']],
        responsive: true,
        "scrollX": true,
        orderCellsTop: true,
        "destroy": true,
    });
    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_UserList').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

};

function EditUser(userId) {
    debugger
    $.ajax({
        type: "GET",
        url: '/Admin/EditUser/?userId=' + userId,
        success: function (data) {
            debugger
            $('#EditUserModal #UserID').val(data['data'][0]['userId']);
            $('#EditUserModal #FirstName').val(data['data'][0]['firstName']);
            $('#EditUserModal #LastName').val(data['data'][0]['lastName']);
            $('#EditUserModal #UserName').val(data['data'][0]['userName']);
            $('#EditUserModal #Email').val(data['data'][0]['email']);
            $('#EditUserModal #PhoneNumber').val(data['data'][0]['phoneNumber']);
            $('#EditUserModal #Adress').val(data['data'][0]['adress']);
            $('#EditUserModal').modal();

        },
        error: function (xhr, status, error) {
            var errorMessage = "Bir sorun ile karşılaşıldı!";

            try {
                var response = JSON.parse(xhr.responseText);
                if (response && response.error) {
                    errorMessage = response.error; // Sunucudan gelen hata mesajını al
                }
            } catch (e) {
                // JSON hatası varsa varsayılan hatayı kullan
            }

            swal.fire("Hata!", errorMessage, "error");
        }

    });
};

function UpdateUser() {
    debugger
    var UserId = $('#EditUserModal #UserID').val();
    var FirstName = $('#EditUserModal #FirstName').val().trim();
    var LastName = $('#EditUserModal #LastName').val().trim();
    var UserName = $('#EditUserModal #UserName').val().trim();
    var Email = $('#EditUserModal #Email').val().trim();
    var Password = $('#EditUserModal #EditPassword').val().trim();
    var Passwordlenght = Password.length;//Metin uzunluğu sorgulama
    var ConfirmPassword = $('#EditUserModal #EditConfirmPassword').val().trim();
    var PhoneNumber = $('#EditUserModal #PhoneNumber').val();
    var Adress = $('#EditUserModal #Adress').val();
    var hasUpperCase = /[A-Z]/.test(Password);//Büyük harf sorgulama
    var hasLowerCase = /[a-z]/.test(Password);//Küçük harf sorgulama

    if (FirstName == "") {
        swal.fire("Hata!", "İsmin Giriniz!", "error");
    }
    else if (LastName == "") {
        swal.fire("Hata!", "Soyisim Giriniz.", "error");
    }
    else if (UserName == "") {
        swal.fire("Hata!", "Kullanıcı Adı Giriniz.", "error");
    }
    else if (Email == "") {
        swal.fire("Hata!", "Email Giriniz.", "error");
    }
    else if (!isValidEmail(Email)) {
        swal.fire("Hata!", "Geçerli bir Email giriniz!", "error");
    }
    else if (PhoneNumber == "") {
        swal.fire("Hata!", "Telefon Numarası Giriniz.", "error");
    }
    else if (Adress == "") {
        swal.fire("Hata!", "Adres Giriniz.", "error");
    }
    else if (Password == "") {
        swal.fire("Hata!", "Şifre Giriniz.", "error");
    }
    else if (Passwordlenght < 6 || !hasLowerCase || !hasUpperCase || !Password.includes('!', '.', ',', ';', ':', '?')) {//includes ile noktalama işaretlerini sorguladık.
        swal.fire("Hata!", "Şifrede büyük,küçük harf ve uzunluğa dikkat ediniz!", "error");
    }
    else if (ConfirmPassword != Password) {
        swal.fire("Hata!", "Şifreler eşleşmiyor!", "error");
    }
    else {
        var formData = new FormData();
        formData.append('UserId', UserId);
        formData.append('FirstName', FirstName);
        formData.append('LastName', LastName);
        formData.append('UserName', UserName);
        formData.append('Email', Email);
        formData.append('Password', Password);
        formData.append('ConfirmPassword', ConfirmPassword);
        formData.append('PhoneNumber', PhoneNumber);
        formData.append('Adress', Adress);
        $.ajax({
            type: "POST",
            url: '/Admin/UpdateUser',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                debugger
                swal.fire({
                    title: "Başarılı!",
                    text: "Güncelleme işleminiz gerçekleşti.",
                    icon: "success",
                    buttonsStyling: true,
                    confirmButtonText: "Tamam!",
                    confirmButtonClass: "btn btn-brand"
                }).then(function (result) {
                    if (result.value) {
                        location.reload();
                    }
                });
            },
            error: function (xhr, status, error) {
                var errorMessage = "Bir sorun ile karşılaşıldı!";

                try {
                    var response = JSON.parse(xhr.responseText);
                    if (response && response.error) {
                        errorMessage = response.error; // Sunucudan gelen hata mesajını al
                    }
                } catch (e) {
                    // JSON hatası varsa varsayılan hatayı kullan
                }

                swal.fire("Hata!", errorMessage, "error");
            }
        });
    }
};

function DeleteUser(userId) {
    swal.fire({
        title: "Emin misiniz?",
        text: "Bu işlemi gerçekleştirmek istediğinizden emin misiniz?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet, Sil",
        cancelButtonText: "Hayır"
    }).then(function (result) {
        if (result.isConfirmed) {
            // Kullanıcı evet dediyse silme işlemini başlat
            $.ajax({
                type: "DELETE",
                url: '/Admin/DeleteUser/?userId=' + userId,
                success: function (data) {
                    swal.fire({
                        title: "Başarılı!",
                        text: "Silme işlemi başarılı.",
                        icon: "success",
                        buttonsStyling: true,
                        confirmButtonText: "Tamam!",
                        confirmButtonClass: "btn btn-brand"
                    }).then(function () {
                        window.location.reload();
                    });
                },
                error: function (xhr, status, error) {
                    var errorMessage = "Bir sorun ile karşılaşıldı!";

                    try {
                        var response = JSON.parse(xhr.responseText);
                        if (response && response.error) {
                            errorMessage = response.error; // Sunucudan gelen hata mesajını al
                        }
                    } catch (e) {
                        // JSON hatası varsa varsayılan hatayı kullan
                    }

                    swal.fire("Hata!", errorMessage, "error");
                }
            });
        }
    });
}

//End-User--


//Start--CarOrder--

function GetCarOrder() {
    debugger
    var table = $('#kt_table_CarOrderList');
    var t = table.DataTable({
        ajax: {
            url: '/Admin/GetCarOrder',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: {
                pagination: {
                    perpage: 50,
                },
            },
        },
        "pageLength": 50,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-3 text-left'f'><'col-sm-9 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'l>>`,
        language: {
            "lengthMenu": "Sayfa başına _MENU_ kayıt göster",
            "zeroRecords": "Eşleşen kayıt bulunamadı",
            "info": "_PAGE_ / _PAGES_",
            "infoEmpty": "Gösterilecek kayıt yok",
            "infoFiltered": "(toplam _MAX_ kayıt içinden filtrelendi)",
            "search": "Ara:",
            "paginate": {
                "first": "İlk",
                "previous": "Önceki",
                "next": "Sonraki",
                "last": "Son"
            },
            "sInfo": "Toplam _TOTAL_ kayıttan _START_ ile _END_ arasındaki kayıtlar gösteriliyor",
            "sInfoEmpty": "Toplam 0 kayıt",
            "sInfoFiltered": "(toplam _MAX_ kayıt içinden filtrelendi)"
        },


        columns: [
            {
                data: 'SN',
                searchable: false,
                orderable: false,
                width: '4%',
                className: 'dt-center ml-3',
            },
            {
                data: 'Brand',
                className: 'font-weight-bold ',
            },
            {
                data: 'Model',
                className: 'font-weight-bold ',
            },
            {
                data: 'Year',
                className: 'font-weight-bold ',
            },
            {
                data: 'Color',
                className: 'font-weight-bold ',
            },
            {
                data: 'İşlemler',
            },
        ],

        columnDefs: [
            {
                targets: 0,
                render: function (data, type, full, meta) {
                    debugger
                    result = ``;
                    return result;
                }
            },
            {
                targets: 1,
                render: function (data, type, full, meta) {
                    var result = full['brand'];
                    return result;
                }
            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    var result = full['model'];
                    return result;
                }
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    var result = full['year'];
                    return result;
                }
            },
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    var result = full['color'];
                    return result;
                }
            },
            {
                targets: -1,
                title: 'İşlemler',
                orderable: false,
                "width": "20%",
                render: function (data, type, full, meta) {
                    debugger
                    result = `<a href="EditCarOrder?Id=` + full['id'] + `" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Düzenle">
                                  <span class="fas fa-pencil-alt fa-2x"></span>
                                  </a>
                                  <a onclick="DeleteCarOrder(` + full['id'] + `)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Sil">
                                  <span class="fas fa-trash-alt fa-2x"></span>
                                   </a>`;
                    return result;
                }
            },
        ],
        order: [[1, 'asc']],
        responsive: true,
        "scrollX": true,
        orderCellsTop: true,
        "destroy": true,
    });
    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_CarOrderList').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

};

function AddCarOrder() {
    debugger
    var Brand = $('#Brand').val();
    var Model = $('#Model').val();
    var Year = $('#Year').val();
    var FuelType = $('#FuelType').val();
    var GearType = $('#GearType').val();
    var KM = $('#KM').val();
    var CaseType = $('#CaseType').val();
    var EnginePower = $('#EnginePower').val();
    var EngineCapacity = $('#EngineCapacity').val();
    var Color = $('#Color').val();
    // Seçilen fotoğrafları al
    var photoInput = $('#photoInput')[0];
    var photos = photoInput.files;
    if (Brand == "") {
        swal.fire("Hata!", "Marka Giriniz!", "error");
    }
    else if (Model == "") {
        swal.fire("Hata!", "Model Giriniz!", "error");
    }
    else if (Year == "") {
        swal.fire("Hata!", "Yıl Giriniz!", "error");
    }
    else if (FuelType == "") {
        swal.fire("Hata!", "Yakıt Tipi Giriniz!", "error");
    }
    else if (GearType == "") {
        swal.fire("Hata!", "Vites Tipi Giriniz!", "error");
    }
    else if (KM == "") {
        swal.fire("Hata!", "Kilometre Giriniz!", "error");
    }
    else if (CaseType == "") {
        swal.fire("Hata!", "Kasa Tipi Giriniz!", "error");
    }
    else if (EnginePower == "") {
        swal.fire("Hata!", "Motor Gücü Giriniz!", "error");
    }
    else if (EngineCapacity == "") {
        swal.fire("Hata!", "Motor Hacmi Giriniz!", "error");
    }
    else if (Color == "") {
        swal.fire("Hata!", "Renk Giriniz!", "error");
    }
    else {
        var formData = new FormData();
        formData.append('Brand', Brand);
        formData.append('Model', Model);
        formData.append('Year', Year);
        formData.append('FuelType', FuelType);
        formData.append('GearType', GearType);
        formData.append('KM', KM);
        formData.append('CaseType', CaseType);
        formData.append('EnginePower', EnginePower);
        formData.append('EngineCapacity', EngineCapacity);
        formData.append('Color', Color);
        // Güncellenmiş fotoğrafları FormData'ya ekle
        for (var i = 0; i < photos.length; i++) {
            formData.append('Photos', photos[i]);
        }
        $.ajax({
            type: "POST",
            url: '/Admin/AddCarOrder',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                debugger
                swal.fire({
                    title: "Başarılı!",
                    text: "Ekleme işleminiz gerçekleşti.",
                    icon: "success",
                    buttonsStyling: true,
                    confirmButtonText: "Tamam!",
                    confirmButtonClass: "btn btn-brand",
                }).then(function (result) {
                    if (result.value) {
                        window.location.href = "/Admin/CarOrder";
                    }
                });
            },
            error: function (xhr, status, error) {
                var errorMessage = "Bir sorun ile karşılaşıldı!";

                try {
                    var response = JSON.parse(xhr.responseText);
                    if (response && response.error) {
                        errorMessage = response.error; // Sunucudan gelen hata mesajını al
                    }
                } catch (e) {
                    // JSON hatası varsa varsayılan hatayı kullan
                }

                swal.fire("Hata!", errorMessage, "error");
            }
        });
    }
};
function GetEditCarOrder(Id) {
    debugger
    $.ajax({
        type: "GET",
        url: '/Admin/GetEditCarOrder/?Id=' + Id,
        success: function (data) {
            debugger
            $('#CarsId').val(data['data'][0]['carsId']);
            $('#OrderId').val(data['data'][0]['orderId']);
            $('#Brand').val(data['data'][0]['brand']);
            $('#Model').val(data['data'][0]['model']);
            $('#Year').val(data['data'][0]['year']);
            $('#FuelType').val(data['data'][0]['fuelType']);
            $('#GearType').val(data['data'][0]['gearType']);
            $('#KM').val(data['data'][0]['km']);
            $('#CaseType').val(data['data'][0]['caseType']);
            $('#EnginePower').val(data['data'][0]['enginePower']);
            $('#EngineCapacity').val(data['data'][0]['engineCapacity']);
            $('#Color').val(data['data'][0]['color']);

        },
        error: function (xhr, status, error) {
            var errorMessage = "Bir sorun ile karşılaşıldı!";

            try {
                var response = JSON.parse(xhr.responseText);
                if (response && response.error) {
                    errorMessage = response.error; // Sunucudan gelen hata mesajını al
                }
            } catch (e) {
                // JSON hatası varsa varsayılan hatayı kullan
            }

            swal.fire("Hata!", errorMessage, "error");
        }

    });
};

function DeleteCarOrder(Id) {
    swal.fire({
        title: "Emin misiniz?",
        text: "Bu işlemi gerçekleştirmek istediğinizden emin misiniz?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet, Sil",
        cancelButtonText: "Hayır"
    }).then(function (result) {
        if (result.isConfirmed) {
            // Kullanıcı evet dediyse silme işlemini başlat
            $.ajax({
                type: "DELETE",
                url: '/Admin/DeleteCarOrder/?Id=' + Id,
                success: function (data) {
                    swal.fire({
                        title: "Başarılı!",
                        text: "Silme işlemi başarılı.",
                        icon: "success",
                        buttonsStyling: true,
                        confirmButtonText: "Tamam!",
                        confirmButtonClass: "btn btn-brand"
                    }).then(function () {
                        window.location.reload();
                    });
                },
                error: function (xhr, status, error) {
                    var errorMessage = "Bir sorun ile karşılaşıldı!";

                    try {
                        var response = JSON.parse(xhr.responseText);
                        if (response && response.error) {
                            errorMessage = response.error; // Sunucudan gelen hata mesajını al
                        }
                    } catch (e) {
                        // JSON hatası varsa varsayılan hatayı kullan
                    }

                    swal.fire("Hata!", errorMessage, "error");
                }
            });
        }
    });
}

function UpdateCarOrder() {
    debugger
    var CarsId = $('#CarsId').val();
    var OrderId = $('#OrderId').val();
    var Brand = $('#Brand').val();
    var Model = $('#Model').val();
    var Year = $('#Year').val();
    var FuelType = $('#FuelType').val();
    var GearType = $('#GearType').val();
    var KM = $('#KM').val();
    var CaseType = $('#CaseType').val();
    var EnginePower = $('#EnginePower').val();
    var EngineCapacity = $('#EngineCapacity').val();
    var Color = $('#Color').val();

    var photoInput = $('#photoInput')[0];
    var photos = photoInput.files;

    if (Brand == "") {
        swal.fire("Hata!", "Marka Giriniz!", "error");
    }
    else if (Model == "") {
        swal.fire("Hata!", "Model Giriniz!", "error");
    }
    else if (Year == "") {
        swal.fire("Hata!", "Yıl Giriniz!", "error");
    }
    else if (FuelType == "") {
        swal.fire("Hata!", "Yakıt Tipi Giriniz!", "error");
    }
    else if (GearType == "") {
        swal.fire("Hata!", "Vites Tipi Giriniz!", "error");
    }
    else if (KM == "") {
        swal.fire("Hata!", "Kilometre Giriniz!", "error");
    }
    else if (CaseType == "") {
        swal.fire("Hata!", "Kasa Tipi Giriniz!", "error");
    }
    else if (EnginePower == "") {
        swal.fire("Hata!", "Motor Gücü Giriniz!", "error");
    }
    else if (EngineCapacity == "") {
        swal.fire("Hata!", "Motor Hacmi Giriniz!", "error");
    }
    else if (Color == "") {
        swal.fire("Hata!", "Renk Giriniz!", "error");
    }
    else {
        var formData = new FormData();
        formData.append('CarsId', CarsId);
        formData.append('OrderId', OrderId);
        formData.append('Brand', Brand);
        formData.append('Model', Model);
        formData.append('Year', Year);
        formData.append('FuelType', FuelType);
        formData.append('GearType', GearType);
        formData.append('KM', KM);
        formData.append('CaseType', CaseType);
        formData.append('EnginePower', EnginePower);
        formData.append('EngineCapacity', EngineCapacity);
        formData.append('Color', Color);
        for (var i = 0; i < photos.length; i++) {
            formData.append('Photos', photos[i]);
        }
        $.ajax({
            type: "POST",
            url: '/Admin/UpdateCarOrder',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                debugger
                swal.fire({
                    title: "Başarılı!",
                    text: "Güncelleme işleminiz gerçekleşti.",
                    icon: "success",
                    buttonsStyling: true,
                    confirmButtonText: "Tamam!",
                    confirmButtonClass: "btn btn-brand"
                }).then(function (result) {
                    if (result.value) {
                        debugger
                        window.location.href = "/Admin/CarOrder/";
                    }
                });
            },
            error: function (xhr, status, error) {
                var errorMessage = "Bir sorun ile karşılaşıldı!";

                try {
                    var response = JSON.parse(xhr.responseText);
                    if (response && response.error) {
                        errorMessage = response.error; // Sunucudan gelen hata mesajını al
                    }
                } catch (e) {
                    // JSON hatası varsa varsayılan hatayı kullan
                }

                swal.fire("Hata!", errorMessage, "error");
            }
        });
    }
};


//Start-ContactUser

function GetContactUser() {
    debugger
    var table = $('#kt_table_ContactUserList');
    var t = table.DataTable({
        ajax: {
            url: '/Admin/GetContactUser',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: {
                pagination: {
                    perpage: 50,
                },
            },
        },
        "pageLength": 50,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-3 text-left'f'><'col-sm-9 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'l>>`,
        language: {
            "lengthMenu": "Sayfa başına _MENU_ kayıt göster",
            "zeroRecords": "Eşleşen kayıt bulunamadı",
            "info": "_PAGE_ / _PAGES_",
            "infoEmpty": "Gösterilecek kayıt yok",
            "infoFiltered": "(toplam _MAX_ kayıt içinden filtrelendi)",
            "search": "Ara:",
            "paginate": {
                "first": "İlk",
                "previous": "Önceki",
                "next": "Sonraki",
                "last": "Son"
            },
            "sInfo": "Toplam _TOTAL_ kayıttan _START_ ile _END_ arasındaki kayıtlar gösteriliyor",
            "sInfoEmpty": "Toplam 0 kayıt",
            "sInfoFiltered": "(toplam _MAX_ kayıt içinden filtrelendi)"
        },


        columns: [
            {
                data: 'SN',
                searchable: false,
                orderable: false,
                width: '4%',
                className: 'dt-center ml-3',
            },
            {
                data: 'FirstName',
                className: 'font-weight-bold ',
            },
            {
                data: 'LastName',
                className: 'font-weight-bold ',
            },
            {
                data: 'Email',
                className: 'font-weight-bold ',
            },
            {
                data: 'Subject',
                className: 'font-weight-bold ',
            },
            {
                data: 'Message',
                className: 'font-weight-bold ',
            },
            {
                data: 'Status',
                className: 'font-weight-bold ',
            },

            {
                data: 'İşlemler',
            },
        ],

        columnDefs: [
            {
                targets: 0,
                render: function (data, type, full, meta) {
                    debugger
                    result = ``;
                    return result;
                }
            },
            {
                targets: 1,
                render: function (data, type, full, meta) {
                    var result = full['firstName'];
                    return result;
                }
            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    var result = full['lastName'];
                    return result;
                }
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    var result = full['email'];
                    return result;
                }
            },
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    var result = full['subject'];
                    return result;
                }
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    var result = full['message'];
                    return result;
                }
            },
            {

                targets: 6,
                render: function (data, type, full, meta) {
                    debugger
                    result = '';
                    if (full['status'] == 0) {
                        var result = "İletişime Geçildi";
                    }
                    else if (full['status'] == 1) {
                        var result = "İletişime Geçilmedi";
                    }
                    return result;

                },
            },
            {
                targets: -1,
                title: 'İşlemler',
                orderable: false,
                "width": "10%",
                render: function (data, type, full, meta) {
                    debugger
                    var result = '';
                    if (full['status'] == 1) {
                        result = `<a onclick="UpdateStatusForContactUser(` + full['id'] + `,1)"  class="btn btn-sm btn-light btn-text-primary btn-icon mr-2" title="Geçildi"  value="` + full['id'] + `"><span class="svg-icon svg-icon-md"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <polygon points="0 0 24 0 24 24 0 24"/>
                                        <path d="M6.26193932,17.6476484 C5.90425297,18.0684559 5.27315905,18.1196257 4.85235158,17.7619393 C4.43154411,17.404253 4.38037434,16.773159 4.73806068,16.3523516 L13.2380607,6.35235158 C13.6013618,5.92493855 14.2451015,5.87991302 14.6643638,6.25259068 L19.1643638,10.2525907 C19.5771466,10.6195087 19.6143273,11.2515811 19.2474093,11.6643638 C18.8804913,12.0771466 18.2484189,12.1143273 17.8356362,11.7474093 L14.0997854,8.42665306 L6.26193932,17.6476484 Z" fill="#000000" fill-rule="nonzero" transform="translate(11.999995, 12.000002) rotate(-180.000000) translate(-11.999995, -12.000002) "/>
                                    </g>
                                 </svg></span>
                              </a>
                               <a onclick="DeleteContact(` + full['id'] + `)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Sil">
                               <span class="fas fa-trash-alt fa-2x"></span>
                              </a>`;
                    }
                    else if (full['status'] == 0) {
                        result = `<a onclick="UpdateStatusForContactUser(` + full['id'] + `,0)"  class="btn btn-sm btn-light btn-text-primary btn-icon mr-2" title="Geçilmedi"  value="` + full['id'] + `"><span class="svg-icon svg-icon-md">
                                 <svg xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)" fill="#000000">
                                        <rect x="0" y="7" width="16" height="2" rx="1" />
                                        <rect transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000) " x="0" y="7" width="16" height="2" rx="1" />
                                    </g>
                                </g>
                            </svg></span>
                              </a>
                               <a onclick="DeleteContact(` + full['id'] + `)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Sil">
                               <span class="fas fa-trash-alt fa-2x"></span>
                              </a>`;
                    }
                    return result;
                }
            },
        ],
        order: [[1, 'asc']],
        responsive: true,
        "scrollX": true,
        orderCellsTop: true,
        "destroy": true,
    });
    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_ContactUserList').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

};

function UpdateStatusForContactUser(ID, Status) {
    debugger
    var formData = new FormData();
    formData.append('ID', ID);
    formData.append('Status', Status);
    var table = $('#kt_table_ContactUserList');

    $.ajax({
        type: "POST",
        url: '/Admin/UpdateStatusForContactUser',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            table.DataTable().ajax.reload();
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

function DeleteContact(Id) {
    swal.fire({
        title: "Emin misiniz?",
        text: "Bu işlemi gerçekleştirmek istediğinizden emin misiniz?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet, Sil",
        cancelButtonText: "Hayır"
    }).then(function (result) {
        if (result.isConfirmed) {
            // Kullanıcı evet dediyse silme işlemini başlat
            $.ajax({
                type: "DELETE",
                url: '/Admin/DeleteContact/?Id=' + Id,
                success: function (data) {
                    swal.fire({
                        title: "Başarılı!",
                        text: "Silme işlemi başarılı.",
                        icon: "success",
                        buttonsStyling: true,
                        confirmButtonText: "Tamam!",
                        confirmButtonClass: "btn btn-brand"
                    }).then(function () {
                        window.location.reload();
                    });
                },
                error: function (xhr, status, error) {
                    var errorMessage = "Bir sorun ile karşılaşıldı!";

                    try {
                        var response = JSON.parse(xhr.responseText);
                        if (response && response.error) {
                            errorMessage = response.error; // Sunucudan gelen hata mesajını al
                        }
                    } catch (e) {
                        // JSON hatası varsa varsayılan hatayı kullan
                    }

                    swal.fire("Hata!", errorMessage, "error");
                }
            });
        }
    });
}
