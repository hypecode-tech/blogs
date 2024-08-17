# Micro-services Mimarisinde Fiber: Ölçeklenebilir ve Hızlı Uygulamalar

Fiber, Express.js'in Go versiyonu olarak da görülebilir ve geliştiricilere tanıdık bir deneyim sunar. Bu blog yazısında, Fiber ile nasıl hızlı ve ölçeklenebilir web uygulamaları geliştirebileceğinizi öğreneceksiniz.

## Fiber Nedir ve Neden Kullanmalısınız ?

Fiber, GoLang'ın performans odaklı yapısını tamamen benimseyen, hafif ve kolay kullanılabilir bir web framework'üdür. Fiber'ı kullanmak için birkaç önemli neden:

- Performans: Fiber, GoLang'ın üstün performansını doğrudan kullanır ve bu sayede çok hızlı web uygulamaları geliştirmenizi sağlar.
- Express.js Benzerliği: Express.js'e aşina olanlar için öğrenmesi kolaydır.
- Modüler Yapı: Fiber, modüler bir yapıya sahiptir ve ihtiyacınıza göre çeşitli middleware'ler ile genişletilebilir.
- Kolay Başlangıç: Minimalist yapısı sayesinde hızlı bir şekilde uygulamanızı ayağa kaldırabilirsiniz.

Bu blog yazısında Fiberın **v3** versiyonu esas alınacaktır.

`go get -u github.com/gofiber/fiber/v3` komutu ile fiberı indirebilirsiniz.

` go mod init && touch main.go` komutu ilede projenizi oluşturun.

```go
package main

import "github.com/gofiber/fiber/v3"

func main() {
   app := fiber.New()

   app.Get("/", func(c *fiber.Ctx) error {
       return c.SendString("Hello, World!")
   })

   app.Listen(":3000")
}
```

![Golang Fiber - Hypecode](https://raw.githubusercontent.com/hypecode-tech/blogs/main/fiber-ile-microservis/terminal-output.png)


Bu kod parçacığı, Fiber kullanarak bir web sunucusu başlatır ve ana rotada “Hello, World!” mesajını döner.

Fiber, GoLang ile yüksek performanslı ve ölçeklenebilir web uygulamaları geliştirmek isteyenler için mükemmel bir tercih. Express.js benzeri yapısı, esnek middleware desteği, ve mükemmel performansıyla dikkat çeken Fiber, web geliştiricileri için güçlü bir araçtır. Kendi projelerinizde Fiber'ı kullanmaya başlamaktan çekinmeyin ve bu güçlü framework'ün avantajlarından yararlanın.

Bu blog içeriği, Fiber framework'ünü tanıtmak ve okuyuculara temel bilgiler sunmak için iyi bir başlangıç olabilir.

Teknoloji dünyasında sürekli gelişen yenilikleri takip etmek ve en uygun araçları seçmek, başarıya giden yolda kritik öneme sahiptir. Bu yolculukta, bilgi ve yeniliklerin ışığında ilerlemeye devam ederken, sormak veya keşfetmek istediğiniz her konuda yanınızda olmaktan **Hypecode ekibi olarak** mutluluk duyacağız.

İyi Çalışmalar dileriz. 🌟

[Hypecode](https://hypecode.tech)
