namespace TrawelWeb
{
    public class ImageUploader
    {
        // Hata Kodları:
        // 0 => Dosya Bulunamadı Hatası
        // 1 => Dosya Zaten Var Hatası
        // 2 => Uzantı Hatası
        public static string UploadeImage(string serverPath, IFormFile file, int ID, int Count)
        {
            if (file != null && file.Length > 0)
            {
                serverPath = serverPath.Replace("~", string.Empty);
                var fileExtension = Path.GetExtension(file.FileName).ToLower();
                var validExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };

                if (!validExtensions.Contains(fileExtension))
                {
                    return "2"; // Uzantı hatası
                }

                var fileName = $"Order_{ID}_{Count}{fileExtension}";
                var filePath = Path.Combine(serverPath, fileName);

                if (File.Exists(filePath))
                {
                    return "1"; // Dosya zaten var hatası
                }

                var directory = Path.GetDirectoryName(filePath);
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                return filePath;
            }

            return "0"; // Dosya bulunamadı hatası
        }
    }
}
