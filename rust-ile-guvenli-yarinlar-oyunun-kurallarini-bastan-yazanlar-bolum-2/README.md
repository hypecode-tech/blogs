<strong>Rust</strong>, açık kaynak kodlu, birden fazla paradigma içeren bir programlama dilidir.

<strong>Rust</strong> dili, bir <a rel="nofollow" href="https://www.mozilla.org/">Mozilla</a> çalışanı olan <i>Graydon Haora'nin</i> kişisel projelerinden biri olarak ortaya çıkmış daha sonrasında ise <a rel="nofollow" href="https://www.mozilla.org/">Mozilla</a> bu projeye 2009 yılında sponsor olmuştur.

İlk stabil sürümü ise 15 Mayıs 2015 yılında 1.0 sürümü şeklinde yayınlanmıştır.

## Rust'ın Mimarisi

<strong>Rust'ın</strong> en önemli özelliği güvenli programlamayı zorunlu ve kaçınılmaz hale getiriyor oluşu ve bunu yaparken performanstan ödün vermeden eşzamanlı bir şekilde çalışıyor olmasıdır.

Bu noktada devre sadece <strong>Rust'a</strong> ait olan bir yapı karşımıza çıkmaktadır; <i>borrowing & ownership (ödünç alma ve sahiplik)</i>

<i>Ödünç alma ve sahiplik</i> kavramları diğer programlama dillerinden aşina olmadığımız benzersiz kavramlardır.

Kısaca özetlemek gerekirse tanımları şu şekildedir:

### Sahiplik (Ownership)

<strong>Rust'ta</strong>, her değerin/nesnenin bir sahibi vardır. Sahip olunan değer, sahibin kapsamından (scope) çıktığı anda bellekten otomatik olarak temizlenir. Bu işleyiş <strong>Rust'ın</strong>, temel hafıza yönetiminin özetidir.

```rust 
let first_string = String::from("Merhaba");
let second_string = first_string;
println!("{}, Dünya!", first_string);
```

==Bu kodu çalıştırırsak bize bir hata verecektir.==

Nedenini inceleyelim hemen : 👇

Bu işlemde normalde <i>C</i> programlama dili yaparsak alacağımız çıktı "Merhaba Dünya!" şeklinde olacaktır. Çünkü C'de ve diğer dillerde bir nesnenin birden fazla sahibi olabilir. Ancak bu <strong>Rust</strong> programlama dilinde mümkün değildir.

```rust 
let second_string = first_string;
```

Bu satırda `first_string` değişkeninin sakladığı değerin sahipliği artık `second_string` değişkenine aktarıldı ve otomatik olarak `first_string` değişkeni mellek yönetimi tarafından temizlendi.

Bu bağlamda <strong>Rust'ın</strong> <i>sahiplik</i> kavramı için 3 ana kuralı vardır.

#### Sahiplik Kuralları: 

1. Her değerin bir sahibi vardır.
2. Aynı anda bir değerin birden fazla sahibi olamaz.
3. Değerin sahibi kapsamın dışına çıkar ise bellek tarafından otomatik temizlenir.


Şimdi daha iyi anlamak adına bir fonksiyonda bu <i>sahiplik/ownership</i> kavramını inceleyelim.

```rust 

fn main(){

    let string = String::new("Merhaba"); // Merhaba değeri değişken içine atandı.
    new_ownership(string); // Burada artık string değişkeninin sahipliği fonksiyon parametresine geçmektedir ve bellek otomatik olarak string değişkenini siler.

    println!("{}",string); // Bu yüzden burada bir hata verecektir.

}

fn new_ownership(data: String) {
    println!("{}",data); // Fonksiyon çalışacak ve Merhaba yazdıracak ve fonksiyon durduktan sonra artık data değişkenide bellekten silinecektir.

}
```


İşte tüm bu mekanizma olası <a target="_blank" title="Buffer Overflow Nedir ve Nasıl Önlenir" href="https://hypecode.tech/blog/buffer-overflow-nedir-ve-nasil-onlenir">bellek sızıntılarının</a> önüne geçmektedir. 



### Ödünç Alma (Borrowing)

Yazılım geliştirirken bazen değerin sahipliğini tamamen devretmeden başka bir kapsamda (scope) kullanmak gerekebilir. Bu durumlar içinde <strong>Rust'ın</strong> geliştiricilere sunduğu başka bir kavram ile karşılaşıyoruz; <i>Ödünç Alma</i>

Ödünç alma yöntemi değişkenin değerini okumak veya değiştirmek için kullanılabilir.

İşleyişe dair bir göz atalım hemen : 👇


```rust

    let first_string = String::from("Merhaba");
    
    let length = find_length(&first_string);

    println!("Değişkenin uzunluğu : {}",length);


    fn find_length(data: &String) -> usize {
        data.len()
    }
```

Yukarıdaki kodda `&` işareti ile `first_string` değişkeninin sahipliğini ödünç olarak `find_length` fonksiyonunun parametresi olan `data` değişkenine verdik.

Fonksiyon bittikten sonra otomatik olarak sahiplik bellek yönetimi sayesinde iade edilmektedir.

#### Ödünç Alma Kuralları:

1. Aynı anda değişkenin değerini sadece bir değiştirilebilir referansı olabilir.

2. Bir değişkenin aynı anda hem değişmez yani `immutable`  hemde değişebilir yani `mutable` referansı olamaz.


İşte bu 2 kavram sayesinde güvenliği maksimum seviyeye çekerek devlet kurumları, savunma sanayi ve diğer kritik alanlarda güvenli yazılım geliştirilebilir.

## Rust'ın Kullanım Alanları

- Gömülü Sistemler
- İşletim Sistemi Çekirdeği
- Sunucu Yazılımları
- Mikroservisler
- Web Geliştirme
- Doğal Dil İşleme
- Görüntü İşleme
- Makine Öğrenimi
- Blokzincir Teknolojisi

ve listede yer vermediğimiz diğer tüm alanlarda kullanılabilmektedir.


## Rust'ın Geleceğine Dair Çalışmalar

Kernel Driver'ları ve Sistem Yazılımları: Rust, düşük seviyeli sistem yazılımları yazmak için giderek daha fazla tercih ediliyor. Özellikle Linux kernel gibi büyük projelerde Rust'ın kullanımının artması bekleniyor. Bu, bellek güvenliği ve hata ayıklama konularında C/C++ gibi dillerden daha güvenli bir alternatif sunuyor. 2021'de Linux kernel'ına Rust desteği eklenmesi de önemli bir adım.

---

Redox OS: Redox, sıfırdan yazılmış bir işletim sistemi olup Rust ile geliştirilmiştir. Linux ve BSD gibi işletim sistemlerine benzer bir yapı hedeflese de, güvenlik ve bellek yönetimi gibi önemli konularda daha sağlam bir temel sunmayı amaçlıyor. Redox, Rust'ın düşük seviyeli programlama yeteneklerinin, tam teşekküllü bir işletim sistemi geliştirmeye nasıl uygun olduğunu gösteriyor.

---

WebAssembly ve Rust: Rust, WebAssembly (Wasm) ile entegrasyonu sayesinde web uygulamaları için performanslı ve güvenli çözümler sunuyor. WebAssembly ile, tarayıcıda çalışan Rust kodları C++ ve diğer dillerle kıyaslanabilir hızda çalışabiliyor, bu da özellikle web tabanlı oyunlar ve uygulamalar için büyük bir avantaj.

---

Embedded Systems ve IoT: Rust, gömülü sistemler (embedded systems) ve IoT uygulamalarında da hızla yaygınlaşıyor. Bu tür cihazlarda bellek yönetimi kritik olduğu için Rust’ın sahip olduğu bellek güvenliği özellikleri, bu alandaki yazılım geliştirmeyi daha güvenli hale getiriyor.


---

Blockchain Güvenliği: Rust’ın bellek güvenliği özellikleri, blockchain projelerinde önemli bir avantaj sağlar. Akıllı kontratlar ve dağıtık ağlar gibi blockchain uygulamalarında kullanılan yazılımlar genellikle çok yüksek güvenlik gerektirir. Rust, bu tür yazılımlar için düşük seviyede bellek hatalarını önler, buffer overflow gibi güvenlik açıklarının önüne geçer.

---

## Sonuç

Rust güvenli bellek yönetimi ve yüksek performansı ile geliştiricilere ve altyapıya verimlilik ve maliyet anlamında çok ciddi olumlu etkiler vaad etmektedir. Bu bağlamda geliştiricilerin de bu çağrıya kayısız kalmadığı ve her geçen gün <strong>Rust'a</strong> olan ilginin artmasıda bir gerçektir.

<a href="https://hypecode.tech">Hypecode</a>, olarak iyi çalışmalar diliyoruz. Benzer içerikler için haber bültenimize abone olmayı ve diğer içeriklerimize de göz atmayı unutmayın.

