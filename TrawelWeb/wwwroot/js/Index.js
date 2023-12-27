function SendMessage() {
    debugger
    var FirstName = $('#FirstName').val();
    var LastName = $('#LastName').val();
    var Email = $('#Email').val();
    var Subject = $('#Subject').val();
    var Message = $('#Message').val();



    if (Email == "") {
        swal.fire("Hata!", "Geçerli bir Email giriniz!", "error");
    }
    else if (FirstName == "") {
        swal.fire("Hata!", "İsim Giriniz!", "error");
    }
    else if (LastName == "") {
        swal.fire("Hata!", "Soyisim Giriniz!", "error");
    }
    else if (Subject == "") {
        swal.fire("Hata!", "Başlık Giriniz!", "error");
    }
    else if (Message == "") {
        swal.fire("Hata!", "Mesajınızı Giriniz!", "error");
    }
    else {
        debugger
        var formData = new FormData();
        formData.append('FirstName', FirstName);
        formData.append('LastName', LastName);
        formData.append('Email', Email);
        formData.append('Message', Message);
        formData.append('Subject', Subject);
        $.ajax({
            type: "POST",
            url: '/Home/SendMessage',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                debugger
                swal.fire({
                    title: "Başarılı!",
                    text: "Mesajınız yollandı",
                    type: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Tamam!",
                    confirmButtonClass: "btn btn-brand"
                }).then(function (result) {
                    
                });
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
            }
        });
    }
};
