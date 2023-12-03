function SignUp() {
    debugger
    var FirstName = $('#FirstName').val();
    var LastName = $('#LastName').val();
    var Email = $('#Email').val().trim();
    var Password = $('#Password').val();
    var Adress = $('#Adress').val().trim();
    var UserName = $('#UserName').val();


    if (FirstName == "") {
        swal.fire("Hata!", "Kullancı Adı Giriniz!", "error");
    }
    else if (LastName == "") {
        swal.fire("Hata!", "Kullanıcı Soyadı Giriniz!", "error");
    }
    else if (Email == "") {
        swal.fire("Hata!", "Geçerli bir Email giriniz!", "error");
    }
    else if (Password == "") {
        swal.fire("Hata!", "Şifre Giriniz!", "error");
    }
    else if (UserName == "") {
        swal.fire("Hata!", "Kullanıcı Adı Giriniz!", "error");
    }
    else if (Adress == "") {
        swal.fire("Hata!", "Adres Giriniz!", "error");
    }
    else {
        debugger
        var formData = new FormData();
        formData.append('FirstName', FirstName);
        formData.append('LastName', LastName);
        formData.append('Email', Email);
        formData.append('Password', Password);
        formData.append('UserName', UserName);
        formData.append('Adress', Adress);
        $.ajax({
            type: "POST",
            url: '/Login/SignUp',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                debugger
                    swal.fire({
                        title: "Başarılı!",
                        text: data,
                        type: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Tamam!",
                        confirmButtonClass: "btn btn-brand"
                    }).then(function (result) {
                        if (result.value) {                      
                        }
                    });
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
            }
        });
    }
};
