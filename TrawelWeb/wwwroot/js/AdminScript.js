
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
        dom: `<'row'<'col-sm-3 text-left'f><'col-sm-9 text-right'B>>
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
                targets:2,
                render: function (data, type, full, meta) {
                    var result = full['lastName'];
                    return result;
                }
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    var result = full['numberPhone'];
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
    else if (PhoneNumber == "") {
        swal.fire("Hata!", "Telefon Numarası Giriniz.", "error");
    }
    else if (Adress == "") {
        swal.fire("Hata!", "Adres Giriniz.", "error");
    }
    else if (Passwordlenght < 6 || !hasLowerCase || !hasUpperCase || !Password.includes('!', '.', ',', ';', ':', '?')) {//includes ile noktalama işaretlerini sorguladık.
        swal.fire("Hata!", "Şifrede büyük,küçük harf ve uzunluğa dikkat ediniz!", "error");
    }
    else if (Password == "") {
        swal.fire("Hata!", "Şifre Giriniz.", "error");
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
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
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
            $('#EditUserModal #ID').val(data['data'][0]['userId']);
            $('#EditUserModal #FirstName').val(data['data'][0]['firstName']);
            $('#EditUserModal #LastName').val(data['data'][0]['lastName']);
            $('#EditUserModal #UserName').val(data['data'][0]['userName']);
            $('#EditUserModal #Email').val(data['data'][0]['email']);
            $('#EditUserModal #NumberPhone').val(data['data'][0]['numberPhone']);
            $('#EditUserModal #Adress').val(data['data'][0]['adress']);
            $('#EditUserModal').modal();

        },
        error: function (request, status, error) {
            console.log(request.responseText); // Hata detayları
            console.log(status); // Hata durumu
            console.log(error); // Hata nesnesi
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function UpdateModaretor() {
    debugger
    var UserId = $('UserId').val().trim();
    var FirstName = $('#FirstName').val().trim();
    var LastName = $('#LastName').val().trim();
    var UserName = $('#UserName').val().trim();
    var Email = $('#Email').val().trim();
    var Password = $('#Password').val().trim();
    var Passwordlenght = Password.length;//Metin uzunluğu sorgulama
    var PhoneNumber = $('#PhoneNumber').val().trim();
    var Adress = $('#Adress').val();
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
    else if (Password == "") {
        swal.fire("Hata!", "Şifre Giriniz.", "error");
    }
    else if (Passwordlenght < 6 || !hasLowerCase || !hasUpperCase || !Password.includes('!', '.', ',', ';', ':', '?')) {//includes ile noktalama işaretlerini sorguladık.
        swal.fire("Hata!", "Şifrede büyük,küçük harf ve uzunluğa dikkat ediniz!", "error");
    }
    else if (ConfirmPassword != Password) {
        swal.fire("Hata!", "Şifreler eşleşmiyor!", "error");
    }
    else if (PhoneNumber == "") {
        swal.fire("Hata!", "Telefon Numarası Giriniz.", "error");
    }
    else if (Adress == "") {
        swal.fire("Hata!", "Adres Giriniz.", "error");
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
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
            }
        });
    }
};
function DeleteModaretor(userId) {
    // SweetAlert2 ile onay mesajı gösterme
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
                url: '/Admin/DeleteModaretor/' + userId,
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
                error: function (request, status, error) {
                    swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
                }
            });
        }
    });
}
