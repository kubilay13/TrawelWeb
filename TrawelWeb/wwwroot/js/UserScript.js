function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function GetMyProfileUser() {
    debugger
    $.ajax({
        type: "GET",
        url: '/User/GetMyProfil',
        success: function (data) {
            debugger
            $('#FirstName').val(data['firstName']);
            $('#LastName').val(data['lastName']);
            $('#UserName').val(data['userName']);
            $('#Email').val(data['email']);
            $('#PhoneNumber').val(data['phoneNumber']);
            $('#Adress').val(data['adress']);
            $('#FullName').text(data['firstName'] + ' ' +data['lastName']);
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
            url: '/User/SaveProfile',
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