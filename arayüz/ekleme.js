//let dataGlobal = [];
//
//async function getAllData() {
//    const URL = "http://localhost:8083/api/belgeler";
//    try {
//        const response = await fetch(URL);
//        if (!response.ok) {
//            throw new Error('Network response was not ok');
//        }
//        const data = await response.json();
//        dataGlobal = data;
//        console.log(dataGlobal);
//    } catch (error) {
//        console.error('Fetch error:', error.message);
//    }
//}
//let liste = document.querySelector("#liste");
//console.log(liste)
//
//async function çalış() {
//    await getAllData();
//    
//    if (Array.isArray(dataGlobal)) {
//        dataGlobal.forEach(element => {
//            if (element.belgeAdı) {
//                const listItem = document.createElement("li");
//                const tfext = document.createElement("p");
//                tfext.innerHTML = element.belgeAdı;
//                listItem.appendChild(tfext);
//                liste.appendChild(listItem);
//            } else {
//                console.warn('element.belgeAdı is not defined', element);
//            }
//        });
//    } else {
//        console.warn('dataGlobal is not an array or is empty');
//    }
//};
//
//
//çalış()
//

let inputList = document.querySelector("#inputList")
console.dir(inputList)


inputList.addEventListener('input',()=>{
    console.log(inputList.value)
    const form = document.querySelector(`#${(inputList.value).replaceAll(' ','')}`)
    form.classList.add('goster')

    document.querySelector('#belgeEkleButton').addEventListener('click', function (e) {
        e.preventDefault(); // Sayfanın yenilenmesini engeller
      
        // Formdaki verileri al
        const belgeAdı = document.querySelector('#belgeAdı').value;
        const açıklama = document.querySelector('#açıklama').value;
        const muafMıEvet = document.querySelector('#muafMıEvet').checked;
        const muafMıHayır = document.querySelector('#muafMıHayır').checked;
      
        // Muaf mı alanı için koşul
        let muafMı;
        if (muafMıEvet) {
          muafMı = true;
        } else if (muafMıHayır) {
          muafMı = false;
        } else {
          alert("Lütfen Muaf Mı seçimini yapın.");
          return; // Seçim yapılmadıysa işlemi durdur
        }
      
        // Backend'e POST isteği ile belgeyi gönder
        fetch('http://localhost:8083/api/belgeler', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            belgeAdı: belgeAdı,
            açıklama: açıklama,
            muafMı: muafMı
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Yeni belge başarıyla eklendi:', data);
          alert("Yeni belge başarıyla eklendi!");
      
          // Formu temizle
          document.querySelector('#belgeAdı').value = '';
          document.querySelector('#açıklama').value = '';
          document.querySelector('#muafMıEvet').checked = false;
          document.querySelector('#muafMıHayır').checked = false;
      
          // Yeni belgeyi tabloya ekleyebilir veya sayfayı güncelleyebilirsiniz.
        })
        .catch(error => {
          console.error('Fetch hatası:', error);
          alert("Belge eklenirken bir hata oluştu.");
        });
      });

    let now=new Date()
    console.log()
    let startDate = document.querySelector("#startDate")
    startDate.min = now.toLocaleString('TR').split(' ')[0].split('.').reverse().join('-')

    console.log(now.toLocaleString('TR'))
    console.log(now.toLocaleString('TR').split(' '))
    console.log(now.toLocaleString('TR').split(' ')[0])
    console.log(now.toLocaleString('TR').split(' ')[0].split('.'))
    console.log(now.toLocaleString('TR').split(' ')[0].split('.').reverse())
    console.log(now.toLocaleString('TR').split(' ')[0].split('.').reverse().join('-')
)
})






