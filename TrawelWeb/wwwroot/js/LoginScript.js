function SignUp() {
    debugger
    var FirstName = $('#FirstName').val();
    var LastName = $('#LastName').val();
    var Email = $('#Email').val().trim();
    var Password = $('#Password').val().trim();
    var Passwordlenght = Password.length;//Metin uzunluğu sorgulama
    var ConfirmPassword = $('#ConfirmPassword ').val().trim();
    var Adress = $('#Adress').val().trim();
    var PhoneNumber = $('#PhoneNumber').val().trim();
    var UserName = $('#UserName').val();
    var hasUpperCase = /[A-Z]/.test(Password);//Büyük harf sorgulama
    var hasLowerCase = /[a-z]/.test(Password);//Küçük harf sorgulama


    if (Email == "") {
        swal.fire("Hata!", "Geçerli bir Email giriniz!", "error");
    }
    else if (UserName == "") {
        swal.fire("Hata!", "Kullanıcı Adı Giriniz!", "error");
    }
    else if (Password == "") {
        swal.fire("Hata!", "Şifre Giriniz!", "error");
    }
    else if (Passwordlenght < 6 || !hasLowerCase || !hasUpperCase || !Password.includes('!', '.', ',', ';', ':', '?')) {//includes ile noktalama işaretlerini sorguladık.
        swal.fire("Hata!", "Şifrenizde büyük,küçük harf ve uzunluğa dikkat ediniz!", "error");
    }
    else if (ConfirmPassword != Password) {
        swal.fire("Hata!", "Şifreleriniz eşleşmiyor!", "error");
    }
    else if (FirstName == "") {
        swal.fire("Hata!", "İsim Giriniz!", "error");
    }
    else if (LastName == "") {
        swal.fire("Hata!", "Soyisim Giriniz!", "error");
    }
    else if (Adress == "") {
        swal.fire("Hata!", "Adres Giriniz!", "error");
    }
    else if (PhoneNumber == "") {
        swal.fire("Hata!", "Telefon Numarası Giriniz!", "error");
    }
    else {
        var formData = new FormData();
        formData.append('FirstName', FirstName);
        formData.append('LastName', LastName);
        formData.append('Email', Email);
        formData.append('Password', Password);
        formData.append('UserName', UserName);
        formData.append('Adress', Adress);
        formData.append('PhoneNumber', PhoneNumber);
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
                    text: "Kayıt işleminiz gerçekleşti.",
                    icon: "success",
                    buttonsStyling: true,
                    confirmButtonText: "Tamam!",
                    confirmButtonClass: "btn btn-brand"
                }).then(function (result) {
                    if (result.value) {
                        window.location.href = "/ConfirmMail/Index";     

                    }
                });
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
            }
        });
    }
};