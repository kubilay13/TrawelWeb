function SaveOrder() {
    debugger
    var Title = $('#Title').val();
    var Price = $('#Price').val();
    var Description = [];
    Description.push($('#Description').val());

    if (imgArrayForRealEstate.length == 0) {
        swal.fire("Hata!", "Fotoğraf Giriniz!", "error");
    }
    else if (Title == "") {
        swal.fire("Hata!", "Başlık Giriniz!", "error");
    }
    else if (Description[0] == "") {
        swal.fire("Hata!", "Açıklama Giriniz!", "error");
    }
    else {
        var formData = new FormData();
        formData.append('Title', Title);
        formData.append('Price', Price);
        formData.append('LocationIFrameLink', LocationIFrameLink);
        formData.append('Description', Description);
        $.ajax({
            type: "POST",
            url: '/Announcement/SaveAnnouncement',
            processData: false,
            contentType: false,
            data: formData,
            success: function (data) {

                var RealEstateID = data;
                //var RealEstateID = $(data).val();
                var formData2 = new FormData();
                for (var i = 0; i < imgArrayForRealEstate.length; i++) {
                    debugger
                    formData2.append('MultiImage', imgArrayForRealEstate[i]);
                }
                formData2.append("RealEstateID", RealEstateID);
                $.ajax({
                    type: "POST",
                    url: '/Announcement/ImageUploaderForRealEstate',
                    processData: false,
                    contentType: false,
                    data: formData2,
                    success: function (data) {
                    },
                    error: function (request, status, error) {
                        swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
                    }
                });
                window.location.href = '/Announcement/Index';
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
            }
        });
    }
};