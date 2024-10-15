
let dataGlobal = [];



async function loadTable() {
    
    const selectedValue = document.getElementById("itemSelect").value;
    let tableContainer = document.getElementById("tableContainer");
    console.log(selectedValue)
    console.log("calışıyooooooooooooooooooom")
   await getAllData(selectedValue.toLowerCase())
    
    
    if (selectedValue === "Belgeler") {
      
        tableContainer.innerHTML = `
        <h1>Belgeler Tablosu</h1>
        <table>
            <thread>
                <tr>
                    <th>ID</th>
                    <th>Belge Adı</th>
                    <th>Açıklama</th>
                    <th>Muaf Mı</th>

                    <th>İşlemler</th>
                </tr>
            </thread> 
            <tbody id="tableİçi">
            </tbody>

        </table>`;

            (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
                const satır = document.createElement("tr")
                const hucre1 = document.createElement("td")
                const hucre2 = document.createElement("td")
                const hucre3 = document.createElement("td")
                const hucre4 = document.createElement("td")
                const hucre5 = document.createElement("td")

                const buttonUpdate = document.createElement("button")
                const buttonDelete = document.createElement("button")
                buttonUpdate.innerText="Güncelle"
                buttonDelete.innerText="Sil"


                buttonDelete.classList.add("delete-btn")
                buttonUpdate.classList.add("update-btn")
                buttonUpdate.setAttribute("id","güncelleBtn")
                hucre5.style.display = "flex"


                const id = document.createElement("input");
                const adı = document.createElement("input");
                const açıklama = document.createElement("input");
                const muafMı = document.createElement("input");
        let tabloİçi = document.querySelector("#tableİçi")

                adı.readOnly=true
                id.readOnly=true
                açıklama.readOnly=true
                muafMı.readOnly=true
                açıklama.value=item.açıklama
                muafMı.value=item.muafMı
                adı.value = item.belgeAdı
                id.value = item.belgeId

                hucre1.appendChild(id)
                hucre2.appendChild(adı)
                hucre5.appendChild(buttonDelete)
                hucre5.appendChild(buttonUpdate)
                hucre3.appendChild(açıklama)
                hucre4.appendChild(muafMı)
                satır.appendChild(hucre1)
                satır.appendChild(hucre2)
                satır.appendChild(hucre3)
                satır.appendChild(hucre4)
                satır.appendChild(hucre5)


                tabloİçi.appendChild(satır)
            })) : (console.warn('dataGlobal is not an array or is empty'))

            document.querySelector("#tableİçi").addEventListener("click", (event) => {
                if (event.target.classList.contains("update-btn")) {
                  const row = event.target.closest("tr");
                  console.dir(row)
                  const belgeId = row.querySelector("td:nth-child(1) input").value;
                  
                  const adı = row.querySelector("td:nth-child(2) input").value;
                  
                  const açıklama = row.querySelector("td:nth-child(3) input").value;
                  
                  const muafMı = row.querySelector("td:nth-child(4) input").value;
                  

                  console.log(belgeId,adı,açıklama,muafMı)
              
                  
                  fetch(`http://localhost:8083/api/belgeler/${belgeId}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      belgeId: belgeId,
                      belgeAdı: adı,
                      açıklama: açıklama,
                      muafMı: muafMı
                    }),
                  })
                  .then(response => {
                    console.log(response);
                    return response.json()})
                  .then(data => {
                    console.log('Güncelleme başarılı:', data);
                    alert("Belge başarıyla güncellendi!");
                  })
                  .catch(error => {
                    console.error('Fetch hatası:', error);
                  });
                }
              }); 
              document.querySelector("#tableİçi").addEventListener("click", (event) => {
                if (event.target.classList.contains("delete-btn")) {
                  const row = event.target.closest("tr");
                  const id = row.querySelector("input:nth-child(1)").value;
              
                  
                  fetch(`http://localhost:8083/api/belgeler/${id}`, {
                    method: 'DELETE',
                  })
                  .then(response => response.json())
                  .then(data => {
                    console.log('Silme başarılı:', data);
                    alert("Belge başarıyla silindi!");
                    row.remove(); 
                  })
                  .catch(error => {
                    console.error('Fetch hatası:', error);
                  });
                }
              });

    }else if(selectedValue == "Birimler"){
        tableContainer.innerHTML=`
        <h1>Birimler Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>Birim Adı</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="birimTable">
            </tbody>
        </table>`;
        (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
            const satır = document.createElement("tr")
            const hucre1 = document.createElement("td")
            const hucre2 = document.createElement("td")
            const hucre3 = document.createElement("td")

            const buttonUpdate = document.createElement("button")
            const buttonDelete = document.createElement("button")
            buttonUpdate.innerText="Güncelle"
            buttonDelete.innerText="Sil"


            buttonDelete.classList.add("delete-btn")
            buttonUpdate.classList.add("update-btn")
            buttonUpdate.setAttribute("id","güncelleBtn")
            hucre3.style.display = "flex"


            const id = document.createElement("input");
            const adı = document.createElement("input");
    
        let tabloİçi = document.querySelector("#birimTable")

            adı.readOnly=true
            id.readOnly=true
            adı.value = item.birim
            id.value = item.birimId

            hucre1.appendChild(id)
            hucre2.appendChild(adı)
            hucre3.appendChild(buttonDelete)
            hucre3.appendChild(buttonUpdate)
            satır.appendChild(hucre1)
            satır.appendChild(hucre2)
            satır.appendChild(hucre3)
            


            tabloİçi.appendChild(satır)
        })) : (console.warn('dataGlobal is not an array or is empty'))
        document.querySelector("#birimTable").addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
              const row = event.target.closest("tr");
              const id = row.querySelector("input:nth-child(1)").value;
          
              
              fetch(`http://localhost:8083/api/birimler/${id}`, {
                method: 'DELETE',
              })
              .then(response => response.json())
              .then(data => {
                console.log('Silme başarılı:', data);
                alert("Belge başarıyla silindi!");
                row.remove(); 
              })
              .catch(error => {
                console.error('Fetch hatası:', error);
              });
            }
          });


    }else if(selectedValue == "Kaynaklar"){
        tableContainer.innerHTML =`
        <h1>Kaynaklar Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>Kaynak Adı</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="kaynakTable">
            </tbody>
        </table>`;
        (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
            const satır = document.createElement("tr")
            const hucre1 = document.createElement("td")
            const hucre2 = document.createElement("td")
            const hucre3 = document.createElement("td")

            const buttonUpdate = document.createElement("button")
            const buttonDelete = document.createElement("button")
            buttonUpdate.innerText="Güncelle"
            buttonDelete.innerText="Sil"


            buttonDelete.classList.add("delete-btn")
            buttonUpdate.classList.add("update-btn")
            buttonUpdate.setAttribute("id","güncelleBtn")
            hucre3.style.display = "flex"


            const id = document.createElement("input");
            const adı = document.createElement("input");
    
        let tabloİçi = document.querySelector("#kaynakTable")

            adı.readOnly=true
            id.readOnly=true
            adı.value = item.kaynakAdı
            id.value = item.kaynakId

            hucre1.appendChild(id)
            hucre2.appendChild(adı)
            hucre3.appendChild(buttonDelete)
            hucre3.appendChild(buttonUpdate)
            satır.appendChild(hucre1)
            satır.appendChild(hucre2)
            satır.appendChild(hucre3)
            


            tabloİçi.appendChild(satır)
        })) : (console.warn('dataGlobal is not an array or is empty'))
        document.querySelector("#kaynakTable").addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
              const row = event.target.closest("tr");
              const id = row.querySelector("input:nth-child(1)").value;
          
              
              fetch(`http://localhost:8083/api/kaynaklar/${id}`, {
                method: 'DELETE',
              })
              .then(response => response.json())
              .then(data => {
                console.log('Silme başarılı:', data);
                alert("Belge başarıyla silindi!");
                row.remove(); 
              })
              .catch(error => {
                console.error('Fetch hatası:', error);
              });
            }
          });


            
    }else if(selectedValue == "Ürünler"){
        tableContainer.innerHTML=`
        <h1>Ürünler Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>Ürün Adı</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="ürünTable">
            </tbody>
        </table>`;
            (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
                const satır = document.createElement("tr")
                const hucre1 = document.createElement("td")
                const hucre2 = document.createElement("td")
                const hucre3 = document.createElement("td")
    
                const buttonUpdate = document.createElement("button")
                const buttonDelete = document.createElement("button")
                buttonUpdate.innerText="Güncelle"
                buttonDelete.innerText="Sil"
    
    
                buttonDelete.classList.add("delete-btn")
                buttonUpdate.classList.add("update-btn")
                buttonUpdate.setAttribute("id","güncelleBtn")
                hucre3.style.display = "flex"
    
    
                const id = document.createElement("input");
                const adı = document.createElement("input");
        
            let tabloİçi = document.querySelector("#ürünTable")
    
                adı.readOnly=true
                id.readOnly=true
                adı.value = item.ürünAdı
                id.value = item.ürünId
    
                hucre1.appendChild(id)
                hucre2.appendChild(adı)
                hucre3.appendChild(buttonDelete)
                hucre3.appendChild(buttonUpdate)
                satır.appendChild(hucre1)
                satır.appendChild(hucre2)
                satır.appendChild(hucre3)
                
    
    
                tabloİçi.appendChild(satır)
            })) : (console.warn('dataGlobal is not an array or is empty'))
            document.querySelector("#ürünTable").addEventListener("click", (event) => {
                if (event.target.classList.contains("delete-btn")) {
                  const row = event.target.closest("tr");
                  const id = row.querySelector("input:nth-child(1)").value;
              
                  
                  fetch(`http://localhost:8083/api/urunler/${id}`, {
                    method: 'DELETE',
                  })
                  .then(response => response.json())
                  .then(data => {
                    console.log('Silme başarılı:', data);
                    alert("Belge başarıyla silindi!");
                    row.remove(); 
                  })
                  .catch(error => {
                    console.error('Fetch hatası:', error);
                  });
                }
              });
             
    }else if(selectedValue == "Üretim Merkezleri"){
        tableContainer.innerHTML=`
        <h1>Üretim Merkezleri Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>Üretim Merkezi Adı</th>
                   <th>Direkt Satış Var Mı</th>
                   <th>Ürün ID</th>
                   <th>Kaynak ID</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="merkezTable">
            </tbody>
        </table>`;
        (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
            const satır = document.createElement("tr")
            const hucre1 = document.createElement("td")
            const hucre2 = document.createElement("td")
            const hucre6 = document.createElement("td")
            const hucre3 = document.createElement("td")
            const hucre4 = document.createElement("td")
            const hucre5 = document.createElement("td")


            const buttonUpdate = document.createElement("button")
            const buttonDelete = document.createElement("button")
            buttonUpdate.innerText="Güncelle"
            buttonDelete.innerText="Sil"


            buttonDelete.classList.add("delete-btn")
            buttonUpdate.classList.add("update-btn")
            buttonUpdate.setAttribute("id","güncelleBtn")
            hucre6.style.display = "flex"


            const id = document.createElement("input");
            const adı = document.createElement("input");
            const satış = document.createElement("input");
            const ürünid = document.createElement("input");
            const kaynakid = document.createElement("input");
    
        let tabloİçi = document.querySelector("#merkezTable")

            adı.readOnly=true
            id.readOnly=true
            satış.readOnly=true
            ürünid.readOnly=true
            kaynakid.readOnly=true
            adı.value = item.uretimMerkeziAdı
            id.value = item.üretimId
            satış.value = item.direktSatışVarMı
            ürünid.value = item.urunId
            kaynakid.value = item.kaynakId

            hucre1.appendChild(id)
            hucre2.appendChild(adı)
            hucre6.appendChild(buttonDelete)
            hucre6.appendChild(buttonUpdate)
            hucre3.appendChild(satış)
            hucre4.appendChild(ürünid)
            hucre5.appendChild(kaynakid)
            satır.appendChild(hucre1)
            satır.appendChild(hucre2)
            satır.appendChild(hucre3)
            satır.appendChild(hucre4)
            satır.appendChild(hucre5)
            satır.appendChild(hucre6)
            
            tabloİçi.appendChild(satır)
        })) : (console.warn('dataGlobal is not an array or is empty'))
        document.querySelector("#merkezTable").addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
              const row = event.target.closest("tr");
              const id = row.querySelector("input:nth-child(1)").value;
          
              
              fetch(`http://localhost:8083/api/uretimmerkezleri/${id}`, {
                method: 'DELETE',
              })
              .then(response => response.json())
              .then(data => {
                console.log('Silme başarılı:', data);
                alert("Belge başarıyla silindi!");
                row.remove(); 
              })
              .catch(error => {
                console.error('Fetch hatası:', error);
              });
            }
          });
    }else if(selectedValue == "Kapsam Grupları"){
        tableContainer.innerHTML =`
        <h1>Kapsam Grupları Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>Kapsam Adı</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="kapsamgrupTable">
            </tbody>
        </table>`;
        (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
            const satır = document.createElement("tr")
            const hucre1 = document.createElement("td")
            const hucre2 = document.createElement("td")
            const hucre3 = document.createElement("td")

            const buttonUpdate = document.createElement("button")
            const buttonDelete = document.createElement("button")
            buttonUpdate.innerText="Güncelle"
            buttonDelete.innerText="Sil"


            buttonDelete.classList.add("delete-btn")
            buttonUpdate.classList.add("update-btn")
            buttonUpdate.setAttribute("id","güncelleBtn")
            hucre3.style.display = "flex"


            const id = document.createElement("input");
            const adı = document.createElement("input");
    
        let tabloİçi = document.querySelector("#kapsamgrupTable")

            adı.readOnly=true
            id.readOnly=true
            adı.value = item.kapsamAdı
            id.value = item.kapsamId

            hucre1.appendChild(id)
            hucre2.appendChild(adı)
            hucre3.appendChild(buttonDelete)
            hucre3.appendChild(buttonUpdate)
            satır.appendChild(hucre1)
            satır.appendChild(hucre2)
            satır.appendChild(hucre3)
            


            tabloİçi.appendChild(satır)
        })) : (console.warn('dataGlobal is not an array or is empty'))
        document.querySelector("#kapsamgrupTable").addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
              const row = event.target.closest("tr");
              const id = row.querySelector("input:nth-child(1)").value;
          
              
              fetch(`http://localhost:8083/api/kapsamgruplari/${id}`, {
                method: 'DELETE',
              })
              .then(response => response.json())
              .then(data => {
                console.log('Silme başarılı:', data);
                alert("Belge başarıyla silindi!");
                row.remove(); 
              })
              .catch(error => {
                console.error('Fetch hatası:', error);
              });
            }
          });
         
    }else if(selectedValue == "Emisyon Grupları"){
        tableContainer.innerHTML=`
        <h1>Emisyon Grupları Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>Emisyon Adı</th>
                   <th>Tip ID</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="emisyongrupTable">
            </tbody>
        </table>`;
        (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
            const satır = document.createElement("tr")
            const hucre1 = document.createElement("td")
            const hucre2 = document.createElement("td")
            const hucre4 = document.createElement("td")
            const hucre3 = document.createElement("td")

            const buttonUpdate = document.createElement("button")
            const buttonDelete = document.createElement("button")
            buttonUpdate.innerText="Güncelle"
            buttonDelete.innerText="Sil"


            buttonDelete.classList.add("delete-btn")
            buttonUpdate.classList.add("update-btn")
            buttonUpdate.setAttribute("id","güncelleBtn")
            hucre4.style.display = "flex"


            const id = document.createElement("input");
            const adı = document.createElement("input");
            const tipid = document.createElement("input");
    
        let tabloİçi = document.querySelector("#emisyongrupTable")

            adı.readOnly=true
            id.readOnly=true
            tipid.readOnly=true
            tipid.value = item.tipId
            adı.value = item.emisyonAdı
            id.value = item.emisyonId

            hucre1.appendChild(id)
            hucre2.appendChild(adı)
            hucre3.appendChild(tipid)
            hucre4.appendChild(buttonDelete)
            hucre4.appendChild(buttonUpdate)
            satır.appendChild(hucre1)
            satır.appendChild(hucre2)
            satır.appendChild(hucre3)
            satır.appendChild(hucre4)
            


            tabloİçi.appendChild(satır)
        })) : (console.warn('dataGlobal is not an array or is empty'))
        document.querySelector("#emisyongrupTable").addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
              const row = event.target.closest("tr");
              const id = row.querySelector("input:nth-child(1)").value;
          
              
              fetch(`http://localhost:8083/api/emisyongruplari/${id}`, {
                method: 'DELETE',
              })
              .then(response => response.json())
              .then(data => {
                console.log('Silme başarılı:', data);
                alert("Belge başarıyla silindi!");
                row.remove(); 
              })
              .catch(error => {
                console.error('Fetch hatası:', error);
              });
            }
          });
    }else if(selectedValue == "Mesai Kayıt"){
        tableContainer.innerHTML=`
        <h1>Mesai Kayıt Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>İlgili Yıl</th>
                   <th>Çalışan Sayısı</th>
                   <th>Çalışılan Gün Sayısı</th>
                   <th>İlgili Aylar</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="mesaikayıtTable">
            </tbody>
        </table>`;
        (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
            const satır = document.createElement("tr")
            const hucre1 = document.createElement("td")
            const hucre2 = document.createElement("td")
            const hucre6 = document.createElement("td")
            const hucre3 = document.createElement("td")
            const hucre4 = document.createElement("td")
            const hucre5 = document.createElement("td")

            const buttonUpdate = document.createElement("button")
            const buttonDelete = document.createElement("button")
            buttonUpdate.innerText="Güncelle"
            buttonDelete.innerText="Sil"


            buttonDelete.classList.add("delete-btn")
            buttonUpdate.classList.add("update-btn")
            buttonUpdate.setAttribute("id","güncelleBtn")
            hucre6.style.display = "flex"


            const id = document.createElement("input");
            const yıl = document.createElement("input");
            const çalışan = document.createElement("input");
            const gün = document.createElement("input");
            const ay = document.createElement("input");
    
        let tabloİçi = document.querySelector("#mesaikayıtTable")

            yıl.readOnly=true
            id.readOnly=true
            çalışan.readOnly=true
            gün.readOnly=true
            ay.readOnly=true
            gün.value = item.çalışılanGünSayısı
            ay.value = item.ilgiliAy
            çalışan.value = item.çalışanSayısı
            yıl.value = item.ilgiliYıl
            id.value = item.mesaiId

            hucre1.appendChild(id)
            hucre2.appendChild(yıl)
            hucre3.appendChild(çalışan)
            hucre4.appendChild(gün)
            hucre5.appendChild(ay)
            hucre6.appendChild(buttonDelete)
            hucre6.appendChild(buttonUpdate)
            satır.appendChild(hucre1)
            satır.appendChild(hucre2)
            satır.appendChild(hucre3)
            satır.appendChild(hucre4)
            satır.appendChild(hucre5)
            satır.appendChild(hucre6)
            
            tabloİçi.appendChild(satır)
        })) : (console.warn('dataGlobal is not an array or is empty'))
        document.querySelector("#mesaikayıtTable").addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
              const row = event.target.closest("tr");
              const id = row.querySelector("input:nth-child(1)").value;
          
              
              fetch(`http://localhost:8083/api/mesaikayit/${id}`, {
                method: 'DELETE',
              })
              .then(response => response.json())
              .then(data => {
                console.log('Silme başarılı:', data);
                alert("Belge başarıyla silindi!");
                row.remove(); 
              })
              .catch(error => {
                console.error('Fetch hatası:', error);
              });
            }
          });
             
    }else if(selectedValue == "Emisyon Kayıt Formu"){
        tableContainer.innerHTML=`
        <h1>Emisyon Kayıt Formu Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>Emisyon Yıl</th>
                   <th>Toplam Emisyon</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="emisyonKayıtTable">
            </tbody>
        </table>`;
        (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
            const satır = document.createElement("tr")
            const hucre1 = document.createElement("td")
            const hucre2 = document.createElement("td")
            const hucre4 = document.createElement("td")
            const hucre3 = document.createElement("td")

            const buttonUpdate = document.createElement("button")
            const buttonDelete = document.createElement("button")
            buttonUpdate.innerText="Güncelle"
            buttonDelete.innerText="Sil"


            buttonDelete.classList.add("delete-btn")
            buttonUpdate.classList.add("update-btn")
            buttonUpdate.setAttribute("id","güncelleBtn")
            hucre3.style.display = "flex"


            const id = document.createElement("input");
            const yılı = document.createElement("input");
            const toplam = document.createElement("input");
    
        let tabloİçi = document.querySelector("#emisyonKayıtTable")

            yılı.readOnly=true
            id.readOnly=true
            toplam.readOnly=true
            toplam.value = item.toplamEmisyon
            yılı.value = item.emisyonYılı
            id.value = item.emisyonKayıtId

            hucre1.appendChild(id)
            hucre2.appendChild(yılı)
            hucre3.appendChild(toplam)
            hucre4.appendChild(buttonDelete)
            hucre4.appendChild(buttonUpdate)
            satır.appendChild(hucre1)
            satır.appendChild(hucre2)
            satır.appendChild(hucre3)
            satır.appendChild(hucre4)
            


            tabloİçi.appendChild(satır)
        })) : (console.warn('dataGlobal is not an array or is empty'))
        document.querySelector("#emisyonkayıtTable").addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
              const row = event.target.closest("tr");
              const id = row.querySelector("input:nth-child(1)").value;
          
              
              fetch(`http://localhost:8083/api/emisyonkayitformu/${id}`, {
                method: 'DELETE',
              })
              .then(response => response.json())
              .then(data => {
                console.log('Silme başarılı:', data);
                alert("Belge başarıyla silindi!");
                row.remove(); 
              })
              .catch(error => {
                console.error('Fetch hatası:', error);
              });
            }
          });
            
    }else if(selectedValue == "Kapsam 1"){
        tableContainer.innerHTML=`
        <h1>Kapsam 1 Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>Emisyon Miktarı</th>
                   <th>Tüketim Miktarı</th>
                   <th>Emisyon Ayı</th>
                   <th>Üretim ID</th>
                   <th>Kaynak ID</th>
                   <th>Kapsam ID</th>
                   <th>Tip ID</th>
                   <th>Birim ID</th>
                   <th>Emisyon Kayıt ID</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="kapsam1Table">
            </tbody>
        </table>`;
        (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
            const satır = document.createElement("tr")
            const hucre1 = document.createElement("td")
            const hucre2 = document.createElement("td")
            const hucre11 = document.createElement("td")
            const hucre3 = document.createElement("td")
            const hucre4 = document.createElement("td")
            const hucre5 = document.createElement("td")
            const hucre6 = document.createElement("td")
            const hucre7 = document.createElement("td")
            const hucre8 = document.createElement("td")
            const hucre9 = document.createElement("td")
            const hucre10 = document.createElement("td")

            const buttonUpdate = document.createElement("button")
            const buttonDelete = document.createElement("button")
            buttonUpdate.innerText="Güncelle"
            buttonDelete.innerText="Sil"


            buttonDelete.classList.add("delete-btn")
            buttonUpdate.classList.add("update-btn")
            buttonUpdate.setAttribute("id","güncelleBtn")
            hucre11.style.display = "flex"


            const id = document.createElement("input");
            const emisyon = document.createElement("input");
            const tüketim = document.createElement("input");
            const ay = document.createElement("input");
            const üretimid = document.createElement("input");
            const kaynakid = document.createElement("input");
            const kapsamid = document.createElement("input");
            const tipid = document.createElement("input");
            const birimid = document.createElement("input");
            const emisyonkayıtid = document.createElement("input");

    
        let tabloİçi = document.querySelector("#kapsam1Table")

            emisyon.readOnly=true
            id.readOnly=true
            tüketim.readOnly=true
            ay.readOnly=true
            üretimid.readOnly=true
            kaynakid.readOnly=true
            kapsamid.readOnly=true
            tipid.readOnly=true
            birimid.readOnly=true
            emisyonkayıtid.readOnly=true
            id.value = item.kapsam1Id
            emisyon.value = item.emisyonMiktarı
            tüketim.value = item.tüketimMiktarı
            ay.value = item.emisyonAyı
            üretimid.value = item.üretimId
            kaynakid.value = item.kaynakId
            kapsamid.value = item.kapsamId
            tipid.value = item.tipId
            birimid.value = item.birimId
            emisyonkayıtid.value = item.emisyonKayıtId

            hucre1.appendChild(id)
            hucre2.appendChild(emisyon)
            hucre3.appendChild(tüketim)
            hucre4.appendChild(ay)
            hucre5.appendChild(üretimid)
            hucre6.appendChild(kaynakid)
            hucre7.appendChild(kapsamid)
            hucre8.appendChild(tipid)
            hucre9.appendChild(birimid)
            hucre10.appendChild(emisyonkayıtid)
            hucre11.appendChild(buttonDelete)
            hucre11.appendChild(buttonUpdate)
            satır.appendChild(hucre1)
            satır.appendChild(hucre2)
            satır.appendChild(hucre3)
            satır.appendChild(hucre4)
            satır.appendChild(hucre5)
            satır.appendChild(hucre6)
            satır.appendChild(hucre7)
            satır.appendChild(hucre8)
            satır.appendChild(hucre9)
            satır.appendChild(hucre10)
            satır.appendChild(hucre11)
            


            tabloİçi.appendChild(satır)
        })) : (console.warn('dataGlobal is not an array or is empty'))
        document.querySelector("#kapsam1Table").addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
              const row = event.target.closest("tr");
              const id = row.querySelector("input:nth-child(1)").value;
          
              
              fetch(`http://localhost:8083/api/kapsam1/${id}`, {
                method: 'DELETE',
              })
              .then(response => response.json())
              .then(data => {
                console.log('Silme başarılı:', data);
                alert("Belge başarıyla silindi!");
                row.remove(); 
              })
              .catch(error => {
                console.error('Fetch hatası:', error);
              });
            }
          });

    }else if(selectedValue == "Kapsam 2"){
        tableContainer.innerHTML=`
        <h1>Kapsam 2 Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>Emisyon Miktarı</th>
                   <th>Tüketim Miktarı</th>
                   <th>Emisyon Ayı</th>
                   <th>Tip ID</th>
                   <th>Birim ID</th>
                   <th>Emisyon Kayıt ID</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="kapsam2Table">
            </tbody>
        </table>`;
        (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
            const satır = document.createElement("tr")
            const hucre1 = document.createElement("td")
            const hucre2 = document.createElement("td")
            const hucre3 = document.createElement("td")
            const hucre4 = document.createElement("td")
            const hucre5 = document.createElement("td")
            const hucre6 = document.createElement("td")
            const hucre7 = document.createElement("td")
            const hucre8 = document.createElement("td")

            const buttonUpdate = document.createElement("button")
            const buttonDelete = document.createElement("button")
            buttonUpdate.innerText="Güncelle"
            buttonDelete.innerText="Sil"


            buttonDelete.classList.add("delete-btn")
            buttonUpdate.classList.add("update-btn")
            buttonUpdate.setAttribute("id","güncelleBtn")
            hucre8.style.display = "flex"


            const id = document.createElement("input");
            const emisyon = document.createElement("input");
            const tüketim = document.createElement("input");
            const ay = document.createElement("input");
            const tipid = document.createElement("input");
            const birimid = document.createElement("input");
            const emisyonkayıtid = document.createElement("input");

    
        let tabloİçi = document.querySelector("#kapsam2Table")

            emisyon.readOnly=true
            id.readOnly=true
            tüketim.readOnly=true
            ay.readOnly=true
            tipid.readOnly=true
            birimid.readOnly=true
            emisyonkayıtid.readOnly=true
            id.value = item.kapsam2Id
            emisyon.value = item.emisyonMiktarı
            tüketim.value = item.tüketimMiktarı
            ay.value = item.emisyonAyı
            tipid.value = item.tipId
            birimid.value = item.birimId
            emisyonkayıtid.value = item.emisyonKayıtId

            hucre1.appendChild(id)
            hucre2.appendChild(emisyon)
            hucre3.appendChild(tüketim)
            hucre4.appendChild(ay)
            hucre5.appendChild(tipid)
            hucre6.appendChild(birimid)
            hucre7.appendChild(emisyonkayıtid)
            hucre8.appendChild(buttonDelete)
            hucre8.appendChild(buttonUpdate)
            satır.appendChild(hucre1)
            satır.appendChild(hucre2)
            satır.appendChild(hucre3)
            satır.appendChild(hucre4)
            satır.appendChild(hucre5)
            satır.appendChild(hucre6)
            satır.appendChild(hucre7)
            satır.appendChild(hucre8)
            


            tabloİçi.appendChild(satır)
        })) : (console.warn('dataGlobal is not an array or is empty'))
        document.querySelector("#kapsam2Table").addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
              const row = event.target.closest("tr");
              const id = row.querySelector("input:nth-child(1)").value;
          
              
              fetch(`http://localhost:8083/api/kapsam2/${id}`, {
                method: 'DELETE',
              })
              .then(response => response.json())
              .then(data => {
                console.log('Silme başarılı:', data);
                alert("Belge başarıyla silindi!");
                row.remove(); 
              })
              .catch(error => {
                console.error('Fetch hatası:', error);
              });
            }
          });
    }else if(selectedValue == "Kapsam 3"){
        tableContainer.innerHTML=`
        <h1>Kapsam 3 Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>Emisyon Miktarı</th>
                   <th>Tüketim Miktarı</th>
                   <th>Emisyon Ayı</th>
                   <th>Üretim ID</th>
                   <th>Kaynak ID</th>
                   <th>Kapsam ID</th>
                   <th>Tip ID</th>
                   <th>Birim ID</th>
                   <th>Emisyon Kayıt ID</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="kapsam3Table>
            </tbody>
        </table>`;
            (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
                const satır = document.createElement("tr")
                const hucre1 = document.createElement("td")
                const hucre2 = document.createElement("td")
                const hucre11 = document.createElement("td")
                const hucre3 = document.createElement("td")
                const hucre4 = document.createElement("td")
                const hucre5 = document.createElement("td")
                const hucre6 = document.createElement("td")
                const hucre7 = document.createElement("td")
                const hucre8 = document.createElement("td")
                const hucre9 = document.createElement("td")
                const hucre10 = document.createElement("td")
    
                const buttonUpdate = document.createElement("button")
                const buttonDelete = document.createElement("button")
                buttonUpdate.innerText="Güncelle"
                buttonDelete.innerText="Sil"
    
    
                buttonDelete.classList.add("delete-btn")
                buttonUpdate.classList.add("update-btn")
                buttonUpdate.setAttribute("id","güncelleBtn")
                hucre11.style.display = "flex"
    
    
                const id = document.createElement("input");
                const emisyon = document.createElement("input");
                const tüketim = document.createElement("input");
                const ay = document.createElement("input");
                const üretimid = document.createElement("input");
                const kaynakid = document.createElement("input");
                const kapsamid = document.createElement("input");
                const tipid = document.createElement("input");
                const birimid = document.createElement("input");
                const emisyonkayıtid = document.createElement("input");
    
        
            let tabloİçi = document.querySelector("#kapsam3Table")
    
                emisyon.readOnly=true
                id.readOnly=true
                tüketim.readOnly=true
                ay.readOnly=true
                üretimid.readOnly=true
                kaynakid.readOnly=true
                kapsamid.readOnly=true
                tipid.readOnly=true
                birimid.readOnly=true
                emisyonkayıtid.readOnly=true
                id.value = item.kapsam3Id
                emisyon.value = item.emisyonMiktarı
                tüketim.value = item.tüketimMiktarı
                ay.value = item.emisyonAyı
                üretimid.value = item.üretimId
                kaynakid.value = item.kaynakId
                kapsamid.value = item.kapsamId
                tipid.value = item.tipId
                birimid.value = item.birimId
                emisyonkayıtid.value = item.emisyonKayıtId
    
                hucre1.appendChild(id)
                hucre2.appendChild(emisyon)
                hucre3.appendChild(tüketim)
                hucre4.appendChild(ay)
                hucre5.appendChild(üretimid)
                hucre6.appendChild(kaynakid)
                hucre7.appendChild(kapsamid)
                hucre8.appendChild(tipid)
                hucre9.appendChild(birimid)
                hucre10.appendChild(emisyonkayıtid)
                hucre11.appendChild(buttonDelete)
                hucre11.appendChild(buttonUpdate)
                satır.appendChild(hucre1)
                satır.appendChild(hucre2)
                satır.appendChild(hucre3)
                satır.appendChild(hucre4)
                satır.appendChild(hucre5)
                satır.appendChild(hucre6)
                satır.appendChild(hucre7)
                satır.appendChild(hucre8)
                satır.appendChild(hucre9)
                satır.appendChild(hucre10)
                satır.appendChild(hucre11)
                
    
    
                tabloİçi.appendChild(satır)
            })) : (console.warn('dataGlobal is not an array or is empty'))
            document.querySelector("#kapsam3Table").addEventListener("click", (event) => {
                if (event.target.classList.contains("delete-btn")) {
                  const row = event.target.closest("tr");
                  const id = row.querySelector("input:nth-child(1)").value;
              
                  
                  fetch(`http://localhost:8083/api/kapsam3/${id}`, {
                    method: 'DELETE',
                  })
                  .then(response => response.json())
                  .then(data => {
                    console.log('Silme başarılı:', data);
                    alert("Belge başarıyla silindi!");
                    row.remove(); 
                  })
                  .catch(error => {
                    console.error('Fetch hatası:', error);
                  });
                }
              });
            
    }else if(selectedValue == "Tipler"){
        tableContainer.innerHTML =`
        <h1>Tipler Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>Tip Adı</th>
                   <th>Emisyon Faktörü</th>
                   <th>KIP</th>
                   <th>Birim ID</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="tipTable">
            </tbody>
        </table>`;
        (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
            const satır = document.createElement("tr")
            const hucre1 = document.createElement("td")
            const hucre2 = document.createElement("td")
            const hucre6 = document.createElement("td")
            const hucre3 = document.createElement("td")
            const hucre4 = document.createElement("td")
            const hucre5 = document.createElement("td")

            const buttonUpdate = document.createElement("button")
            const buttonDelete = document.createElement("button")
            buttonUpdate.innerText="Güncelle"
            buttonDelete.innerText="Sil"


            buttonDelete.classList.add("delete-btn")
            buttonUpdate.classList.add("update-btn")
            buttonUpdate.setAttribute("id","güncelleBtn")
            hucre6.style.display = "flex"


            const id = document.createElement("input");
            const ad = document.createElement("input");
            const faktör = document.createElement("input");
            const kip = document.createElement("input");
            const birimid = document.createElement("input");
    
        let tabloİçi = document.querySelector("#tipTable")

            ad.readOnly=true
            id.readOnly=true
            faktör.readOnly=true
            kip.readOnly=true
            birimid.readOnly=true
            ad.value = item.tip
            faktör.value = item.emisyonFaktörü
            kip.value = item.kıp
            birimid.value = item.birimId
            id.value = item.tipId

            hucre1.appendChild(id)
            hucre2.appendChild(ad)
            hucre3.appendChild(faktör)
            hucre4.appendChild(kip)
            hucre5.appendChild(birimid)
            hucre6.appendChild(buttonDelete)
            hucre6.appendChild(buttonUpdate)
            satır.appendChild(hucre1)
            satır.appendChild(hucre2)
            satır.appendChild(hucre3)
            satır.appendChild(hucre4)
            satır.appendChild(hucre5)
            satır.appendChild(hucre6)
            
            tabloİçi.appendChild(satır)
        })) : (console.warn('dataGlobal is not an array or is empty'))
        document.querySelector("#tipTable").addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
              const row = event.target.closest("tr");
              const id = row.querySelector("input:nth-child(1)").value;
          
              
              fetch(`http://localhost:8083/api/tipler/${id}`, {
                method: 'DELETE',
              })
              .then(response => response.json())
              .then(data => {
                console.log('Silme başarılı:', data);
                alert("Belge başarıyla silindi!");
                row.remove(); 
              })
              .catch(error => {
                console.error('Fetch hatası:', error);
              });
            }
          });

    }else if(selectedValue == "Üretim Giriş"){
        tableContainer.innerHTML=`
        <h1>Üretim Giriş Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>Üretim Miktarı</th>
                   <th>Üretim Ayı</th>
                   <th>Sevkiyat Miktarı</th>
                   <th>Birim ID</th>
                   <th>Ürün ID</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="üretimgirişTable">
            </tbody>
        </table>`;
        (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
            const satır = document.createElement("tr")
            const hucre1 = document.createElement("td")
            const hucre2 = document.createElement("td")
            const hucre7 = document.createElement("td")
            const hucre3 = document.createElement("td")
            const hucre4 = document.createElement("td")
            const hucre5 = document.createElement("td")
            const hucre6 = document.createElement("td")

            const buttonUpdate = document.createElement("button")
            const buttonDelete = document.createElement("button")
            buttonUpdate.innerText="Güncelle"
            buttonDelete.innerText="Sil"


            buttonDelete.classList.add("delete-btn")
            buttonUpdate.classList.add("update-btn")
            buttonUpdate.setAttribute("id","güncelleBtn")
            hucre7.style.display = "flex"


            const id = document.createElement("input");
            const üretim = document.createElement("input");
            const sevkiyat = document.createElement("input");
            const birimid = document.createElement("input");
            const ürünid = document.createElement("input");
            const ay = document.createElement("input");
    
        let tabloİçi = document.querySelector("#üretimgirişTable")

            id.readOnly=true
            üretim.readOnly=true
            sevkiyat.readOnly=true
            birimid.readOnly=true
            ürünid.readOnly=true
            ay.readOnly=true
            id.value = item.üretimGirişId
            üretim.value = item.üretimMiktarı
            sevkiyat.value = item.sevkiyatMiktarı
            birimid.value = item.birimId
            ürünid.value = item.ürünId
            ay.value = item.üretimAyı
            

            hucre1.appendChild(id)
            hucre2.appendChild(üretim)
            hucre3.appendChild(sevkiyat)
            hucre4.appendChild(birimid)
            hucre5.appendChild(ürünid)
            hucre6.appendChild(ay)
            hucre7.appendChild(buttonDelete)
            hucre7.appendChild(buttonUpdate)
            satır.appendChild(hucre1)
            satır.appendChild(hucre2)
            satır.appendChild(hucre3)
            satır.appendChild(hucre4)
            satır.appendChild(hucre5)
            satır.appendChild(hucre6)
            
            tabloİçi.appendChild(satır)
        })) : (console.warn('dataGlobal is not an array or is empty'))
        document.querySelector("#üretimgirişTable").addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
              const row = event.target.closest("tr");
              const id = row.querySelector("input:nth-child(1)").value;
          
              
              fetch(`http://localhost:8083/api/uretimgiriş/${id}`, {
                method: 'DELETE',
              })
              .then(response => response.json())
              .then(data => {
                console.log('Silme başarılı:', data);
                alert("Belge başarıyla silindi!");
                row.remove(); 
              })
              .catch(error => {
                console.error('Fetch hatası:', error);
              });
            }
          });
             
    }else if(selectedValue == "Üretim Kayıt Formu"){
        tableContainer.innerHTML =`
        <h1>Üretim Kayıt Formu Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>Üretim Yılı</th>
                   <th>Üretim Ayı</th>
                   <th>Sevkiyat Miktarı</th>
                   <th>Üretim ID</th>
                   <th>Üretim Giriş ID</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="üretimkayıtTable">
            </tbody>
        </table>`;
        (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
            const satır = document.createElement("tr")
            const hucre1 = document.createElement("td")
            const hucre2 = document.createElement("td")
            const hucre7 = document.createElement("td")
            const hucre3 = document.createElement("td")
            const hucre4 = document.createElement("td")
            const hucre5 = document.createElement("td")
            const hucre6 = document.createElement("td")

            const buttonUpdate = document.createElement("button")
            const buttonDelete = document.createElement("button")
            buttonUpdate.innerText="Güncelle"
            buttonDelete.innerText="Sil"


            buttonDelete.classList.add("delete-btn")
            buttonUpdate.classList.add("update-btn")
            buttonUpdate.setAttribute("id","güncelleBtn")
            hucre7.style.display = "flex"


            const id = document.createElement("input");
            const yıl = document.createElement("input");
            const sevkiyat = document.createElement("input");
            const üretimid = document.createElement("input");
            const üretimgirişid = document.createElement("input");
            const ay = document.createElement("input");
    
        let tabloİçi = document.querySelector("#üretimkayıtTable")

            id.readOnly=true
            yıl.readOnly=true
            sevkiyat.readOnly=true
            üretimid.readOnly=true
            üretimgirişid.readOnly=true
            ay.readOnly=true
            id.value = item.üretimKayıtId
            yıl.value = item.üretimYılı
            sevkiyat.value = item.sevkiyatMiktarı
            üretimid.value = item.üretimId
            üretimgirişid.value = item.üretimGirişId
            ay.value = item.üretimAyı
            

            hucre1.appendChild(id)
            hucre2.appendChild(yıl)
            hucre3.appendChild(sevkiyat)
            hucre4.appendChild(üretimid)
            hucre5.appendChild(üretimgirişid)
            hucre6.appendChild(ay)
            hucre7.appendChild(buttonDelete)
            hucre7.appendChild(buttonUpdate)
            satır.appendChild(hucre1)
            satır.appendChild(hucre2)
            satır.appendChild(hucre3)
            satır.appendChild(hucre4)
            satır.appendChild(hucre5)
            satır.appendChild(hucre6)
            
            tabloİçi.appendChild(satır)
        })) : (console.warn('dataGlobal is not an array or is empty'))
        document.querySelector("#üretimkayıtTable").addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
              const row = event.target.closest("tr");
              const id = row.querySelector("input:nth-child(1)").value;
          
              
              fetch(`http://localhost:8083/api/uretimkayitformu/${id}`, {
                method: 'DELETE',
              })
              .then(response => response.json())
              .then(data => {
                console.log('Silme başarılı:', data);
                alert("Belge başarıyla silindi!");
                row.remove(); 
              })
              .catch(error => {
                console.error('Fetch hatası:', error);
              });
            }
          });

    }else if(selectedValue == "Belge Takip"){
        tableContainer.innerHTML =`
        <h1>Belge Takip Tablosu</h1>
        <table>
           <thread>
               <tr>
                   <th>ID</th>
                   <th>Dosya Yükleme</th>
                   <th>Giriş Tarihi</th>
                   <th>Uyarı Tarihi</th>
                   <th>Açıklama</th>
                   <th>Belge ID</th>
                   <th>İşlemler</th>
                </tr>
            </thread>
            <tbody id="belgetakipTable">
            </tbody>
        </table>`;
        (Array.isArray(dataGlobal))?(dataGlobal.forEach(item => {
            const satır = document.createElement("tr")
            const hucre1 = document.createElement("td")
            const hucre2 = document.createElement("td")
            const hucre7 = document.createElement("td")
            const hucre3 = document.createElement("td")
            const hucre4 = document.createElement("td")
            const hucre5 = document.createElement("td")
            const hucre6 = document.createElement("td")

            const buttonUpdate = document.createElement("button")
            const buttonDelete = document.createElement("button")
            buttonUpdate.innerText="Güncelle"
            buttonDelete.innerText="Sil"


            buttonDelete.classList.add("delete-btn")
            buttonUpdate.classList.add("update-btn")
            buttonUpdate.setAttribute("id","güncelleBtn")
            hucre7.style.display = "flex"


            const id = document.createElement("input");
            const dosya = document.createElement("input");
            const giriş = document.createElement("input");
            const uyarı = document.createElement("input");
            const açıklama = document.createElement("input");
            const belgeid = document.createElement("input");
    
        let tabloİçi = document.querySelector("#belgetakipTable")

            id.readOnly=true
            dosya.readOnly=true
            giriş.readOnly=true
            uyarı.readOnly=true
            açıklama.readOnly=true
            belgeid.readOnly=true
            id.value = item.belgeTakipId
            dosya.value = item.dosyaYükleme
            giriş.value = item.girişTarihi
            uyarı.value = item.uyarıTarihi
            açıklama.value = item.açıklama
            belgeid.value = item.BelgeId
            

            hucre1.appendChild(id)
            hucre2.appendChild(dosya)
            hucre3.appendChild(giriş)
            hucre4.appendChild(uyarı)
            hucre5.appendChild(açıklama)
            hucre6.appendChild(belgeid)
            hucre7.appendChild(buttonDelete)
            hucre7.appendChild(buttonUpdate)
            satır.appendChild(hucre1)
            satır.appendChild(hucre2)
            satır.appendChild(hucre3)
            satır.appendChild(hucre4)
            satır.appendChild(hucre5)
            satır.appendChild(hucre6)
            
            tabloİçi.appendChild(satır)
        })) : (console.warn('dataGlobal is not an array or is empty'))
        document.querySelector("#belgetakipTable").addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
              const row = event.target.closest("tr");
              const id = row.querySelector("input:nth-child(1)").value;
          
              
              fetch(`http://localhost:8083/api/belgetakip/${id}`, {
                method: 'DELETE',
              })
              .then(response => response.json())
              .then(data => {
                console.log('Silme başarılı:', data);
                alert("Belge başarıyla silindi!");
                row.remove(); 
              })
              .catch(error => {
                console.error('Fetch hatası:', error);
              });
            }
          });

    }
    let güncelleBtn = document.getElementById("güncelleBtn")
    
    güncelleBtn.addEventListener('click',editRow)
}

function editRow() {
    console.log("how are you ım here ",this)
   let row = this.parentNode.parentNode

    const inputs = row.querySelectorAll('input');

    if (this.innerText === 'Güncelle') {
        inputs.forEach(input => {
            input.readOnly = false;
            input.style.backgroundColor = '#f9f9f9'; 
        });
        this.innerText = 'Kaydet';
    } else {
        inputs.forEach(input => {
            input.readOnly = true;
            input.style.backgroundColor = ''; 
        });
        this.innerText = 'Güncelle';
    }
}

function hello() {

    console.log("h3ellodjfaş")

}

async function getAllData(path) {
    const path2= path.replaceAll(' ','').replaceAll('ü','u').replaceAll('ö','o').replaceAll('ı','i')
    
   const URL = `http://localhost:8083/api/${path2}`;
   try {
       const response = await fetch(URL);
       if (!response.ok) {
           throw new Error('Network response was not ok');
       }
       const data = await response.json();
       dataGlobal = data;
       console.log(dataGlobal);
   } catch (error) {
       console.error('Fetch error:', error.message);
   }
}
// function getData(url){
//     fetch(url)
//        .then((response) => {
//         return response.json();
//        })
//        .then((data) => console.log(data))
//        .catch((err) => console.log(err))
// }

// getData("emisyonHesaplama.json")





