﻿function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


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
                targets:2,
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
