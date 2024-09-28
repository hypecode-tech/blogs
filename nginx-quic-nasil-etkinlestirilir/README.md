## HTTP/3 - QUIC Protokolü Nasıl Kurulur

QUIC (Quick UDP Internet Connections), Google tarafından geliştirilen ve UDP tabanlı bir taşıma protokolüdür. QUIC, internet trafiğini hızlandırmak ve güvenliğini artırmak amacıyla tasarlanmıştır. QUIC protokolü, TCP ve TLS protokollerinin işlevlerini tek bir çatı altında toplar ve aynı zamanda UDP üzerinden çalışır.

HTTP/3, QUIC protokolü üzerinde çalışan üçüncü nesil HTTP protokolüdür. HTTP/3, önceki HTTP sürümlerinin üzerinde çalıştığı TCP'nin yerini alarak, daha düşük gecikme süresi ve daha hızlı veri aktarımı sağlar.

### HTTP/2'ye Göre HTTP/3'ün Avantajları

#### Bağlantı Kurulum Süresi:

- HTTP/2: TCP ve TLS el sıkışmaları gerektiğinden, bir bağlantı kurma süresi uzun olabilir.
- HTTP/3: QUIC, TCP ve TLS'yi birleştirerek tek bir el sıkışma işlemi gerektirir. Bu da bağlantı kurulum süresini önemli ölçüde azaltır.

#### Bağlantıların Yeniden Kullanımı:

- HTTP/2: Bağlantı kesintisi durumunda, TCP bağlantısının baştan kurulması gerekir.
- HTTP/3: QUIC, bağlantının IP adresi değişse bile devam edebilmesini sağlar. Bu, özellikle mobil cihazlar gibi ağ değiştiren cihazlar için önemlidir.

#### Gecikme ve Performans:

- HTTP/2: TCP'nin hatalı paketlerin yeniden iletilmesi gibi mekanizmaları nedeniyle gecikme yaşayabilir.
- HTTP/3: QUIC, paket kayıplarının sadece kaybolan paketlerin yeniden iletilmesine neden olmasını sağlar, bu da gecikmeyi azaltır ve performansı artırır.

#### Başlatma Gecikmesi (Head-of-line Blocking):

- HTTP/2: TCP'de bir paket kaybı olduğunda, bu kayıp giderilene kadar tüm diğer veriler bekletilir.
- HTTP/3: QUIC, her veri akışını bağımsız bir şekilde işler, bu sayede bir akıştaki sorun diğer akışları etkilemez.

#### Güvenlik:

- HTTP/2: Güvenlik TCP ve TLS üzerinde sağlanır.
- HTTP/3: QUIC, TLS 1.3 ile entegre bir şekilde gelir, bu da daha hızlı ve güvenli bir bağlantı sağlar.

## Kurulum

Her şeyden önce QUIC - HTTP/3 protokolünü etkinleştirmek için nginx versiyonunuzun 1.25.0 den daha yüksek olması gerekir. Eğer sunucu reponuzda 1.25.0 dan daha yüksek versiyon yok ise [bu linkten binary versiyonunu indirip kurabilirsiniz.](https://nginx.org/en/linux_packages.html)

Daha sonrasında yapmanız gereken şey ise aşağıdaki örnek kodu kendi domain ve sunucu bilgileriniz doğrultusunda düzenlemek olacaktır.

```bash

server { 
   http2 on;
   quic_gso on;
   ssl_early_data on;
   quic_retry on;
   listen 443 quic reuseport;
   listen 433 ssl;
   ssl_certificate     certs/example.com.crt;
   ssl_certificate_key certs/example.com.key;
   location / {
       # Tarayıcı için zorunlu header bilgisidir.
       add_header Alt-Svc 'h3=":8443"; ma=86400';
   }
}

```

Konfigürasyon dosyasını düzenledikten sonra `nginx -t` komutu ile söz dizimnde herhangi bir hata olmadığından emin olduktan sonra `systemctl restart nginx` komutu ile nginxi yeniden başlatabilirsiniz daha sonrasında **F12** tuşuna basın ve çıkan sağ ekrandan sunucu tarafından gönderilen dosyaların **Sürüm** bilgisini görebilirsiniz.

![HTTP/3 - Hypecode](https://raw.githubusercontent.com/hypecode-tech/blogs/main/nginx-quic-nasil-etkinlestirilir/result.webp)

Bu yazımızda QUIC - HTTP/3 protokolünün nginx ile nasıl kullanabileceğini gösterdik.

Teknoloji dünyasında sürekli gelişen yenilikleri takip etmek ve en uygun araçları seçmek, başarıya giden yolda kritik öneme sahiptir. Bu yolculukta, bilgi ve yeniliklerin ışığında ilerlemeye devam ederken, sormak veya keşfetmek istediğiniz her konuda yanınızda olmaktan **Hypecode ekibi olarak** mutluluk duyacağız.

İyi Çalışmalar dileriz. 🌟

[Hypecode](https://hypecode.tech)
