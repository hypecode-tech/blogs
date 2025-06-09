## Kendi AI Agent'inizi Nasıl Yaparsınız: Saafir Framework ile Adım Adım Rehber

Günümüzde yapay zeka (AI), yazılım geliştirme pratiklerini kökten değiştiriyor. Peki, kendi AI destekli asistanlarınızı veya "agent"larınızı nasıl oluşturabilirsiniz? Bu yazıda, TypeScript tabanlı Saafir framework'ünü kullanarak, komutlarınızı anlayan ve sizin adınıza görevler yürütebilen akıllı AI agent'ları geliştirmeyi adım adım öğreneceğiz.

### AI Agent Nedir? Basit Bir Bakış

AI agent'ları, en basit tanımıyla, belirli görevleri sizin yerinize otomatikleştiren, doğal dil komutlarınızı anlayıp yorumlayabilen ve hatta bu komutlara göre çeşitli eylemleri (örneğin bir fonksiyonu çağırmak, bir API'ye istek atmak) gerçekleştirebilen akıllı yazılım parçacıklarıdır. Onları, dijital dünyadaki kişisel asistanlarınız gibi düşünebilirsiniz.

### Neden Saafir Framework?

Piyasada birçok araç bulunsa da, Saafir özellikle TypeScript geliştiricileri için bazı önemli avantajlar sunuyor:

-   **Akıllı Tip Dönüşümü**: AI modelleri genellikle metin tabanlı yanıtlar verir. Saafir, bu metinleri (örneğin "15 Temmuz 2025" veya "true") otomatik olarak doğru JavaScript tiplerine (Date, boolean, number vb.) dönüştürerek sizi büyük bir yükten kurtarır.
-   **Zod ile Tip Güvenliği**: Entegre Zod şemaları sayesinde, AI'dan gelen veya AI'a gönderilen verilerin beklediğiniz formatta olduğundan emin olursunuz. Bu, çalışma zamanı hatalarını önemli ölçüde azaltır.
-   **Esnek Entegrasyon**: Popüler Node.js framework'leri olan Express.js, Fastify, tRPC ve hatta WebSocket sunucuları ile kolayca entegre olabilir.
-   **Çoklu Dil Desteği**: Agent'ınızın kullanıcılarla Türkçe veya desteklenen diğer dillerde etkileşim kurmasını sağlayabilirsiniz.
-   **Geliştirici Dostu**: Debug modu ve anlaşılır yapısıyla geliştirme sürecini hızlandırır.

### Saafir ile Hızlı Başlangıç

Saafir'i projenize dahil etmek oldukça kolay. Öncelikle gerekli paketleri kuralım:

```bash
npm install saafir zod openai chalk
# veya
bun add saafir zod openai chalk
```

### İlk AI Asistanınızı Oluşturma

Şimdi, basit bir kullanıcı oluşturma görevini yerine getirecek ilk AI agent'ımızı yazalım.

#### 1. Action Şemaları ve Fonksiyonları Tanımlama

Öncelikle, agent'ımızın gerçekleştireceği "action" (eylem) için bir Zod şeması ve bu eylemi yürütecek bir fonksiyon tanımlamamız gerekiyor. Şema, AI'ın hangi parametreleri hangi tiplerde toplaması gerektiğini belirler.

```typescript
import { Saafir } from 'saafir';
import { z } from 'zod';

// Kullanıcı oluşturma eylemi için Zod şeması
const createUserSchema = z.object({
  name: z.string().describe("Kullanıcının adı ve soyadı"),
  email: z.string().email().describe("Kullanıcının e-posta adresi"),
  age: z.number().min(18).describe("Kullanıcının yaşı, en az 18 olmalı"),
  isActive: z.boolean().optional().default(true).describe("Kullanıcı hesabının aktif olup olmadığı (varsayılan: aktif)")
});

// Kullanıcı oluşturma eylemini gerçekleştirecek fonksiyon
const createUser = async (input: z.infer<typeof createUserSchema>) => {
  console.log('Yeni kullanıcı oluşturuluyor:', input);
  // Burada veritabanı kaydı veya diğer işlemler yapılabilir
  return { 
    message: `${input.name} adlı kullanıcı başarıyla oluşturuldu. E-posta: ${input.email}, Yaş: ${input.age}, Aktif: ${input.isActive}`,
    userId: `user_${Math.random().toString(36).substr(2, 9)}` 
  };
};
```
*Not: Şemalardaki `.describe()` metotları, AI'ın parametreleri daha iyi anlamasına yardımcı olur.*

#### 2. Agent'ı Başlatma ve Kullanma

Şemamızı ve fonksiyonumuzu tanımladıktan sonra, Saafir agent'ını bu bilgilerle başlatabiliriz.

```typescript
// ... önceki importlar ve tanımlamalar

// Saafir agent'ını yapılandırma
const userManagerAgent = new Saafir({
  name: "UserManagerAgent", // Agent'ınıza bir isim verin
  description: "Kullanıcı hesaplarını yönetmek için kullanılan bir AI asistanı.", // Agent'ın genel açıklaması
  apiKey: process.env.OPENROUTER_API_KEY!, // OpenRouter API anahtarınız
  model: "anthropic/claude-3.5-sonnet", // Kullanılacak AI modeli
  language: "Turkish", // Agent'ın iletişim dili
  debug: true, // Geliştirme sırasında detaylı logları görmek için
  actions: {
    createUser: { // Action'a benzersiz bir isim verin
      call: createUser, // Bu action çağrıldığında çalışacak fonksiyon
      schema: createUserSchema, // Bu action için parametre şeması
      description: "Verilen bilgilerle yeni bir kullanıcı hesabı oluşturur." // Action'ın AI tarafından anlaşılacak açıklaması
    }
  }
});

// Agent'ı doğal bir dille komut vererek çalıştırma
async function main() {
  const userInput = "Ahmet Yılmaz adında, ahmet@example.com email adresine sahip, 25 yaşında bir kullanıcı oluştur.";
  try {
    const response = await userManagerAgent.run(userInput);
    console.log("AI Yanıtı:", response);
  } catch (error) {
    console.error("Bir hata oluştu:", error);
  }
}

main();
// Beklenen Çıktı (örnek):
// AI Yanıtı: {
//   message: 'Ahmet Yılmaz adlı kullanıcı başarıyla oluşturuldu. E-posta: ahmet@example.com, Yaş: 25, Aktif: true',
//   userId: 'user_xxxxxxxxx'
// }
```

Bu kadar basit! `userManagerAgent.run()` fonksiyonuna verdiğiniz doğal dil komutu, Saafir tarafından işlenir, AI modeli `createUser` action'ını seçer, gerekli parametreleri (isim, email, yaş) cümlenizden çıkarır, `createUserSchema` ile doğrular ve son olarak `createUser` fonksiyonunuzu bu parametrelerle çağırır.

### Saafir Agent'ınızı Farklı Ortamlarda Çalıştırma

Saafir, çeşitli Node.js backend framework'leriyle kolayca entegre edilebilir. İşte birkaç popüler örnek:

#### Express.js ile E-ticaret Asistanı

Bir e-ticaret sitesi için ürün ekleme ve sipariş oluşturma yeteneklerine sahip bir AI asistanı düşünün.

```typescript
import express from 'express';
// ... Saafir ve Zod importları ...
// ... productSchema, orderSchema, addProduct, createOrder fonksiyonları ...
// ... ecommerceAgent tanımı ...

const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Mesaj boş olamaz' });
    }
    // ecommerceAgent'ın daha önce tanımlandığını varsayıyoruz
    // const response = await ecommerceAgent.run(message); 
    // res.json({ success: true, response });
    // Örnek olması için placeholder:
    res.json({ success: true, response: "Express entegrasyonu için AI yanıtı burada olacak." });
  } catch (error) {
    console.error("Express chat error:", error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Bilinmeyen bir sunucu hatası oluştu.' 
    });
  }
});

app.listen(3000, () => {
  console.log('E-ticaret AI asistanı http://localhost:3000/chat adresinde POST isteklerini bekliyor.');
});
// Kullanım: POST isteği ile {"message": "Yeni bir laptop ekle, fiyatı 25000 TL, kategorisi elektronik"}
```
*Not: Yukarıdaki Express.js örneği, blog yazısının akıcılığı için kısaltılmıştır. Tam `ecommerceAgent` tanımı ve action fonksiyonları için önceki bölümlere veya projenizin yapısına göre uyarlamanız gerekebilir.*

### Fastify ile Finans Yöneticisi

Kişisel finans takibi için harcama ekleme veya bütçe belirleme gibi işlemleri yapabilen bir AI.

```typescript
import Fastify from 'fastify';
// ... Saafir ve Zod importları ...
// ... transactionSchema, budgetSchema, addTransaction, setBudget fonksiyonları ...
// ... financeAgent tanımı ...

const fastify = Fastify({ logger: true });

fastify.post<{ Body: { message: string } }>('/finance-chat', async (request, reply) => {
  try {
    const { message } = request.body;
    if (!message) {
      reply.status(400);
      return { error: 'Mesaj boş olamaz' };
    }
    // financeAgent'ın daha önce tanımlandığını varsayıyoruz
    // const response = await financeAgent.run(message);
    // return { success: true, response };
    // Örnek olması için placeholder:
    return { success: true, response: "Fastify entegrasyonu için AI yanıtı burada olacak." };
  } catch (error) {
    fastify.log.error(error);
    reply.status(500);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Bilinmeyen bir sunucu hatası oluştu.' 
    };
  }
});

const startFastify = async () => {
  try {
    await fastify.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
startFastify();
// Kullanım: POST isteği ile {"message": "Bugün markete 500 TL harcadım, kategori gıda"}
```
*Not: Fastify örneği de benzer şekilde kısaltılmıştır.*

### tRPC ile Görev Yöneticisi

Proje ve görev yönetimi için tRPC endpoint'leri üzerinden AI ile etkileşim.

```typescript
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
// ... Saafir ve Zod importları ...
// ... taskSchema, projectSchema, createTask, createProject fonksiyonları ...
// ... taskAgent tanımı ...

const t = initTRPC.create();
const appRouter = t.router({
  taskChat: t.procedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ input }) => {
      if (!input.message) {
        throw new Error('Mesaj boş olamaz');
      }
      // taskAgent'ın daha önce tanımlandığını varsayıyoruz
      // const response = await taskAgent.run(input.message);
      // return { success: true, response };
      // Örnek olması için placeholder:
      return { success: true, response: "tRPC entegrasyonu için AI yanıtı burada olacak." };
    }),
});

const server = createHTTPServer({ router: appRouter });
server.listen(3002);
console.log('Görev yönetimi AI asistanı tRPC endpoint\'i http://localhost:3002 üzerinde çalışıyor.');
// Kullanım: tRPC client ile taskChat mutasyonunu çağırarak {"message": "Yarın için 'Saafir makalesi yaz' adında bir görev oluştur"}
```
*Not: tRPC örneği de benzer şekilde kısaltılmıştır.*

### WebSocket ile Gerçek Zamanlı Chatbot

`uWebSockets.js` (veya benzeri bir WebSocket kütüphanesi) kullanarak gerçek zamanlı bir chat uygulamasına AI yetenekleri ekleme.

```typescript
import { App, TemplatedApp } from 'uWebSockets.js'; // uWebSockets.js importu düzeltildi
// ... Saafir ve Zod importları ...
// ... messageSchema, roomSchema, sendMessage, createRoom fonksiyonları ...
// ... chatAgent tanımı ...

const uwsApp: TemplatedApp = App({}); // TemplatedApp tipi kullanıldı
uwsApp.ws('/*', {
  message: async (ws, messageBuffer, isBinary) => {
    try {
      const message = Buffer.from(messageBuffer).toString();
      const data = JSON.parse(message);
      if (data.type === 'ai_command' && data.message) {
        // chatAgent'ın daha önce tanımlandığını varsayıyoruz
        // const response = await chatAgent.run(data.message);
        // ws.send(JSON.stringify({ type: 'ai_response', response }));
        // Örnek olması için placeholder:
        ws.send(JSON.stringify({ type: 'ai_response', response: "WebSocket entegrasyonu için AI yanıtı burada olacak." }));
      }
    } catch (error) {
      console.error("WebSocket error:", error);
      ws.send(JSON.stringify({ type: 'error', message: 'Mesaj işlenirken hata oluştu' }));
    }
  },
});

uwsApp.listen(3003, (token) => {
  if (token) {
    console.log('Chat AI asistanı ws://localhost:3003 adresinde WebSocket bağlantılarını bekliyor.');
  } else {
    console.log('Port 3003 açılamadı.');
  }
});
// Kullanım: WebSocket üzerinden {"type": "ai_command", "message": "Genel sohbet odası oluştur"} JSON mesajı göndererek.
```
*Not: WebSocket örneği de benzer şekilde kısaltılmıştır ve `uWebSockets.js` kullanımı basitleştirilmiştir.*

### Saafir'in Gelişmiş Yetenekleri

Saafir sadece temel action çağrılarından ibaret değil. Geliştirme sürecinizi kolaylaştıracak bazı güçlü özellikleri de beraberinde getirir.

#### Otomatik Tip Dönüşümleri: AI ile Sorunsuz İletişim

Saafir'in en büyük kolaylıklarından biri, AI'dan gelen metin tabanlı verileri otomatik olarak doğru JavaScript tiplerine dönüştürmesidir.

```typescript
const advancedSchema = z.object({
  createdAt: z.date().describe("Oluşturulma tarihi (örn: 'bugün', 'yarın saat 14:00')"),
  isActive: z.boolean().describe("Aktiflik durumu (örn: 'evet', 'aktif')"),
  price: z.number().describe("Fiyat bilgisi (örn: '150 TL')"),
  tags: z.array(z.string()).describe("Etiketler (virgülle ayrılmış, örn: 'teknoloji, yapay zeka')"),
  metadata: z.object({
    version: z.string(),
    author: z.string()
  }).describe("JSON formatında meta veriler (örn: '{'''version''': '''1.0''', '''author''': '''Ahmet'''}')"),
  categories: z.set(z.string()).describe("Kategoriler (virgülle ayrılmış, benzersiz)"),
  attributes: z.map(z.string(), z.string()).describe("JSON formatında özellikler (key-value çiftleri)"),
  bigNumberValue: z.bigint().describe("Büyük bir sayı değeri (örn: '12345678901234567890')"),
  description: z.string().optional().describe("Açıklama (isteğe bağlı)"),
  priority: z.number().optional().describe("Öncelik seviyesi (isteğe bağlı)")
});
```
Bu otomatik dönüşümler, AI ile uygulamanız arasındaki veri akışını son derece pürüzsüz hale getirir.

### Hata Ayıklama (Debug Modu)

Geliştirme aşamasında ne olup bittiğini anlamak kritik öneme sahiptir. Saafir'in `debug: true` seçeneği, agent'ın karar verme sürecindeki her adımı konsola yazdırarak size yardımcı olur:

```typescript
const agent = new Saafir({
  // ... diğer ayarlar
  debug: true, // Debug modunu etkinleştir
});

// Örnek Konsol Çıktısı:
// [SaafirAgent][DEBUG][2025-06-09T10:30:25.123Z] User input: "Yeni bir kullanıcı oluştur..."
// [SaafirAgent][DEBUG][2025-06-09T10:30:26.456Z] AI Request: {...}
// [SaafirAgent][DEBUG][2025-06-09T10:30:27.789Z] AI Response: { actionName: 'createUser', parameters: {...} }
// [SaafirAgent][DEBUG][2025-06-09T10:30:27.795Z] Validating parameters for action 'createUser'...
// [SaafirAgent][DEBUG][2025-06-09T10:30:27.800Z] Executing action 'createUser'...
// [SaafirAgent][DEBUG][2025-06-09T10:30:27.850Z] Action 'createUser' executed. Result: {...}
```

#### Çoklu Dil Desteği ve Kişiselleştirme

Agent'ınızın kullanıcılarla farklı dillerde konuşmasını veya belirli bir kişiliğe bürünmesini isteyebilirsiniz.

```typescript
const multilingualAgent = new Saafir({
  // ... diğer ayarlar
  language: "Turkish", // Veya "English", "Spanish", "French" vb.
  context: "Sen bir e-ticaret sitesinde müşterilere yardımcı olan, esprili ve samimi bir asistansın. Ürünler hakkında detaylı bilgi verebilir ve önerilerde bulunabilirsin.",
  // title, referer gibi ek bilgiler de AI modeline gönderilebilir.
});

// Kullanıcı "Create a new user named John" dediğinde,
// Türkçe ayarlıysa "John adında yeni kullanıcı oluşturuldu." gibi bir yanıt alabilirsiniz.
```
`context` parametresi, AI modeline agent'ın rolü ve davranış biçimi hakkında önemli ipuçları verir.

### Sonuç ve İleri Adımlar

Saafir framework'ü, TypeScript ile AI destekli agent'lar oluşturmayı önemli ölçüde basitleştirir. Otomatik tip dönüşümleri, Zod ile entegre şema doğrulaması ve esnek yapısı sayesinde, karmaşık AI etkileşimlerini yönetmek kolaylaşır.

Bu rehberde temel kurulumdan, farklı framework entegrasyonlarına ve bazı gelişmiş özelliklere kadar Saafir'in sunduğu imkanlara değindik. Artık siz de kendi AI agent'larınızı hayata geçirmek için gerekli bilgiye sahipsiniz. Projelerinizde Saafir'i deneyerek AI'ın gücünden faydalanmaya başlayabilirsiniz!

Unutmayın, AI dünyası sürekli gelişiyor. Saafir gibi araçlar bu gelişime ayak uydurmanıza yardımcı olacaktır. Başarılar!

---

**Saafir** ile AI destekli uygulamalarınızı bir sonraki seviyeye taşıyın! 🚀

