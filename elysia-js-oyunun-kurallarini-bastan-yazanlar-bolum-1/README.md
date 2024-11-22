<strong>Elysia.js</strong>, modern web uygulamaları geliştirmek için tasarlanmış, minimal ve performans odaklı bir JavaScript framework'üdür. Framework, özellikle **Node.js** ortamında çalışmak üzere optimize edilmiştir ve kullanım kolaylığı ile hız arasında bir denge kurmayı hedefler. Bunun yanı sıra <strong>Elysia.js</strong>, Bun tabanlı bir frameworktür.

Bu makalede Elysia.js'in temel özelliklerini inceleyecek, diğer popüler JavaScript framework'leri ile karşılaştıracak ve temel bir kullanım örneği sunacağız.  

---

## Elysia.js'in Temel Özellikleri  

- **Hafif ve Performanslı:** Elysia.js, hafif bir yapıya sahip olup modern JavaScript standartlarına uygun bir şekilde optimize edilmiştir. Benchmark testlerinde, genellikle Express ve Fastify gibi framework'lerden daha iyi performans göstermektedir.  
- **Kolay API:** Basit ve öğrenmesi kolay bir API'ye sahiptir, bu da hızlı bir şekilde uygulama geliştirilmesini sağlar.  
- **Plug-in Desteği:** Minimal yapısına rağmen, ihtiyaçlara göre genişletilebilir bir plug-in ekosistemi sunar.  
- **TypeScript Desteği:** Elysia.js, TypeScript ile mükemmel bir şekilde çalışır ve tür güvenliğini ön planda tutar.  

---

## Diğer Framework'ler ile Karşılaştırma  

Aşağıda, Elysia.js'in diğer popüler JavaScript framework'leri ile karşılaştırmasını bulabilirsiniz:

| Özellik            | **Elysia.js**      | **Express.js**     | **Fastify**        | **NestJS**         |  
|--------------------|-------------------|--------------------|--------------------|--------------------|  
| **Performans**     | Çok Yüksek            | Orta               | Yüksek             | Orta               |  
| **Öğrenme Eğrisi** | Düşük             | Çok Düşük          | Orta               | Yüksek             |  
| **Plug-in Ekosistemi** | Orta            | Çok Geniş          | Geniş              | Çok Geniş          |  
| **TypeScript Desteği** | Çok İyi        | Zayıf              | İyi                | Çok İyi            |  
| **Swagger Desteği** | Mükemmel        | Zayıf             | Zayıf                | İyi            |  


Elysia.js, özellikle yüksek performans gereksinimleri olan ve hızlı geliştirme süreçlerine ihtiyaç duyan projeler için idealdir. Bunun yanı sıra karmaşık arkauç yazılımları içinde gayet uygundur.

---

## Elysia.js Kullanımına Dair Örnek  

Aşağıda, bir Elysia.js uygulaması oluşturmanın temel bir örneğini bulabilirsiniz:  

```javascript
// Elysia.js'i yükleyin
import { Elysia } from 'elysia';

const app = new Elysia();

// Basit bir GET endpoint'i tanımlama
app.get('/', () => {
  return { message: 'Merhaba Dünya!' };
});

// Sunucuyu başlatma
app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor!');
});
```


## Veri tipi güvenliği 

Aşağıdaki örnekte ilgili endpointe yapılan istekteki parametre veya requestin bodysinde bulunan içeriğin otomatik olarak tip kontrolünün yapıldığını görüyoruz.

```javascript
import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'

const app = new Elysia()
    .use(swagger())
    .get('/user/:id', ({ params: { id } }) => id, {
        params: t.Object({
            id: t.Numeric() // Sayı tipinde bir veri
        })
    })
    .listen(3000)

export type App = typeof app;

```

**Kontrol mekanizmasının süreçlerini özetleyen bir görsel**

![elysia-js-benchmarks](https://raw.githubusercontent.com/hypecode-tech/blogs/main/elysia-js-oyunun-kurallarini-bastan-yazanlar-bolum-1/elysia-js-benchmarks.webp)


Yapılan istekdeki veri tipi ile Elysia'nın geliştirilerece sağladığı veri tipi standartları uyuşmadığı takdirde *422* hatası oluşturuyor.


## Otomatik Swagger Desteği

<strong>Elysia.js</strong>'ın geliştiriciler vazgeçilmez kılan başka bir özellik ise uçtan uca veri güvenliği sayesinde <strong>Swagger</strong> için ek @params gibi tanımlamalar yapmaya gerek duymadan bunu sizin yerinize oluşturuyor.

Bu da hem arkauç geliştiricilerinin ekstra dokümantasyon yazarak vakit kaybetmesini önlüyor hemde yazılan dokümantasyonun yanlış olması halinde önuç geliştiricinin vakit kaybetmesinin önüne geçiliyor.

Süreç daha güvenli, sağlam ve otomatize edilmiş oluyor.

## Ultra Yüksek Performans

<strong>Elysia.js</strong>, sadece geliştirici dostu yaklaşımı ve veri tipi güvenliği gibi özelliklerin yanında oyunun kurallarını baştan yazacak cinsten bir performans sonuçlarına sahip. Aşağıdaki görselde diğer frameworkler ile aynı uygulama yazılmış ve benchmark testinin sonuçları gösteriliyor. 

Sonuçlar ise bize <strong>Elysia.js</strong>'ın Express + Node.JS'den yaklaşık olarak *21x* daha hızlı olduğunu bizlere gösteriyor.

Bunun altında yatan en önemli unsur ise tabiki de <a href="https://bun.sh/" title="Bun.JS">Bun</a>'dır.

![elysia-js-life-cycle](https://raw.githubusercontent.com/hypecode-tech/blogs/main/elysia-js-oyunun-kurallarini-bastan-yazanlar-bolum-1/elysia-js-life-cycle.webp)


## Elysia.JS Projesi Nasıl Oluşturulur ?

Kullanımının kolay olduğu gibi proje oluşturmakda çok kolaydır. Yapmanız gereken tek şey terminali açıp ```bun create elysia app``` komutunu girmektir.

Tabi bunu yapmadan önce çalışma ortamınızda <a href="https://bun.sh/" title="Bun.JS">Bun</a>'nın kurulu olduğundan emin olun. Kontrol etmek için ```bun -v``` yazabilirsiniz. Herhangi bir sonuç alamaz iseniz ```curl -fsSL https://bun.sh/install | bash``` komutu ile kurulumu yaptıktan sonra projeyi oluşturabilirsiniz.

## Sonuç

Tüm süreç bu kadar. Bu saatten sonra tüm her şey sizin hayal gücünüz ile sınırlı. Elinizde run-time ve type-safe bir typescript arkauç frameworkü mevcut. 


