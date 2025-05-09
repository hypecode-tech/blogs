---
title: "React 19 ile Gelen Yenilikler: Modern Web Geliştirmenin Geleceği"
description: "React 19 sürümünün getirdiği yeni özellikler, performans iyileştirmeleri ve geliştirici deneyimini geliştiren tüm yenilikler hakkında kapsamlı bir rehber."
date: "2025-05-09"
tags: ["React", "JavaScript", "Frontend", "Web Geliştirme", "React 19"]
image: "./cover_image.webp"
---

## React 19: Modern Web Geliştirmenin Yeni Çağı

React ekosistemi, 19. sürümüyle birlikte web geliştirme dünyasında çığır açacak yeniliklerle karşımıza çıkıyor. Bu güncellemeler, performanstan geliştirici deneyimine, render optimizasyonlarından veri yönetimine kadar birçok alanda önemli iyileştirmeler sunuyor. Bu yazımızda, React 19 ile hayatımıza giren yenilikleri detaylı bir şekilde inceleyeceğiz.

## Yeni Hooks API'ları

React 19, geliştirici deneyimini zenginleştiren birçok yeni hook ile geliyor. Bu hook'lar, yaygın kullanım senaryolarını daha basit ve daha verimli hale getiriyor.

### useFormStatus ve useFormState

Form yönetimini kolaylaştırmak için tasarlanan bu hook'lar, form durumunu takip etmeyi ve form işlemlerini kontrol etmeyi daha kolay hale getiriyor:

```jsx
import { useFormStatus, useFormState } from "react";

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Gönderiliyor..." : "Gönder"}
    </button>
  );
}

function LoginForm() {
  const [state, formAction] = useFormState(submitLogin, initialState);

  return (
    <form action={formAction}>
      {state.error && <p className="error">{state.error}</p>}
      <input type="email" name="email" required />
      <input type="password" name="password" required />
      <SubmitButton />
    </form>
  );
}
```

### useOptimistic

Kullanıcı deneyimini iyileştirmek için tasarlanan `useOptimistic`, kullanıcı eylemlerinin sonucunu beklemeden UI güncellemelerini gerçekleştirmenizi sağlar:

```jsx
import { useOptimistic, useState } from "react";

function MessageThread() {
  const [messages, setMessages] = useState([]);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, { ...newMessage, sending: true }]
  );

  async function sendMessage(text) {
    const newMessage = { text, timestamp: Date.now() };
    addOptimisticMessage(newMessage);

    // API isteği gönderiliyor
    await sendMessageToServer(newMessage);

    // Başarılı yanıt geldiğinde, gerçek mesajları güncelle
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }

  return (
    <div className="message-thread">
      {optimisticMessages.map((msg) => (
        <div
          className={`message ${msg.sending ? "sending" : "sent"}`}
          key={msg.timestamp}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
```

## Yeni Bellek Yönetimi: Otomatik Memoizasyon

React 19, performansı artırmak için otomatik memoizasyon özelliği sunuyor. Bu, geliştiricilerin manuel olarak `React.memo`, `useMemo` veya `useCallback` kullanma ihtiyacını azaltıyor:

```jsx
// React 18 ve öncesi
function ExpensiveComponent({ data }) {
  const processedData = useMemo(() => {
    return expensiveComputation(data);
  }, [data]);

  return <div>{processedData}</div>;
}

// React 19 ile
function ExpensiveComponent({ data }) {
  // React otomatik olarak memoize ediyor
  const processedData = expensiveComputation(data);

  return <div>{processedData}</div>;
}
```

## Document Metadata API

React 19, sunucu bileşenleri ile meta verileri yönetmek için yeni bir API sunuyor:

```jsx
import { Meta, Title, Link } from "react";

function ProductPage({ product }) {
  return (
    <>
      <Title>{product.name} - Mağazamız</Title>
      <Meta name="description" content={product.description} />
      <Link
        rel="canonical"
        href={`https://example.com/products/${product.id}`}
      />

      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price} TL</p>
    </>
  );
}
```

## Gelişmiş Sunucu Bileşenleri

React 19, sunucu bileşenlerinde büyük iyileştirmeler getiriyor. Artık sunucu tarafında veri çekme ve işleme daha verimli:

```jsx
// ServerComponent.js
export default async function ProductList() {
  // Sunucu tarafında veri çekme
  const products = await fetchProducts();

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// ClientComponent.js
("use client");

import { useState } from "react";

export function ProductCard({ product }) {
  const [isInCart, setIsInCart] = useState(false);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.price} TL</p>
      <button onClick={() => setIsInCart(!isInCart)}>
        {isInCart ? "Sepetten Çıkar" : "Sepete Ekle"}
      </button>
    </div>
  );
}
```

## React Compiler: Zero-Bundle Size Abstractions

React 19, yeni derleyici sayesinde sıfır boyutlu soyutlamalar sunuyor. Bu, performansı artırırken bundle boyutunu küçültüyor:

```jsx
// React 18 ve öncesi - her bir hook için kod eklenir
import { useState, useEffect, useMemo } from "react";

// React 19 - derleyici optimize eder
function Counter() {
  const [count, setCount] = useState(0);
  const doubledCount = count * 2; // Derleyici otomatik optimize eder

  return (
    <div>
      <p>Sayaç: {count}</p>
      <p>İki katı: {doubledCount}</p>
      <button onClick={() => setCount(count + 1)}>Artır</button>
    </div>
  );
}
```

## Actions API: Sunucu Etkileşimleri İçin

React 19'un getirdiği Actions API, sunucu ile etkileşimleri büyük ölçüde kolaylaştırıyor:

```jsx
// server-action.js
"use server";

export async function updateUserProfile(formData) {
  const name = formData.get("name");
  const email = formData.get("email");

  // Veritabanı güncellemesi
  await db.users.update({
    where: { id: session.userId },
    data: { name, email },
  });

  return { success: true };
}

// ProfileForm.jsx
import { updateUserProfile } from "./server-action";

export function ProfileForm({ user }) {
  return (
    <form action={updateUserProfile}>
      <input name="name" defaultValue={user.name} />
      <input name="email" defaultValue={user.email} />
      <button type="submit">Profili Güncelle</button>
    </form>
  );
}
```

## Asset Loading API

React 19, varlık yüklemeyi optimize etmek için yeni bir API sunuyor:

```jsx
import { preload, prefetch, preinit } from "react";

function Navigation() {
  // Kullanıcı fareyi üzerine getirdiğinde önceden yükle
  const handleMouseEnter = () => {
    prefetch("/dashboard");
    preload("/images/dashboard-hero.jpg");
    preinit("/api/dashboard-data", { as: "fetch" });
  };

  return (
    <nav>
      <a href="/dashboard" onMouseEnter={handleMouseEnter}>
        Panele Git
      </a>
    </nav>
  );
}
```

## Performans İyileştirmeleri

React 19, render performansında önemli iyileştirmeler sunuyor:

### Gelişmiş Concurrent Rendering

```jsx
function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Feed />
      </Suspense>

      {/* Bu bileşen, Feed yüklenirken bile etkileşimli olacak */}
      <Sidebar />
    </>
  );
}
```

### Transition API İyileştirmeleri

```jsx
import { useTransition } from "react";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    // Acil UI güncellemesi
    const value = e.target.value;
    setQuery(value);

    // Daha düşük öncelikli işlemler
    startTransition(() => {
      // Ağır arama işlemleri
      setSearchResults(search(value));
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending ? <LoadingIndicator /> : <SearchResults />}
    </>
  );
}
```

## Yenilenmiş Hata Yakalama

React 19, hata yakalamayı geliştirmek için yeni mekanizmalar sunar:

```jsx
function ErrorBoundary({ children, fallback }) {
  try {
    return children;
  } catch (error) {
    return fallback;
  }
}

function App() {
  return (
    <ErrorBoundary fallback={<p>Bir hata oluştu</p>}>
      <UserProfile />
    </ErrorBoundary>
  );
}
```

## Gelişmiş React DevTools

React 19, geliştirici araçlarında da önemli iyileştirmeler sunuyor:

- Performans ölçümü için gelişmiş zaman çizelgeleri
- Sunucu ve istemci bileşenlerini görselleştirme
- Hook kullanımını izleme ve optimize etme araçları

## TypeScript Entegrasyonu

React 19, TypeScript ile daha iyi entegrasyon sağlıyor:

```tsx
// Gelişmiş tip çıkarımı
function Counter<T extends number>({ initialValue }: { initialValue: T }) {
  const [count, setCount] = useState<T>(initialValue);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((count + 1) as T)}>Artır</button>
    </div>
  );
}
```

## Değerlendirme

React 19, modern web geliştirme dünyasında devrim niteliğinde yenilikler sunuyor. Otomatik memoizasyon, gelişmiş sunucu bileşenleri, yeni hook'lar ve Actions API gibi özelliklerle geliştirici deneyimini iyileştirirken, aynı zamanda uygulama performansını da artırıyor. Bu yenilikler, React'ın gelecek yıllarda da web geliştirmenin ön saflarında yer alacağının bir göstergesi.

React 19'un getirdiği bu yenilikler, uygulamalarımızı daha hızlı, daha güvenilir ve daha bakımı kolay hale getirmemize olanak tanıyor. Bu yeni özellikleri projelerinize entegre ederek, kullanıcı deneyimini ve geliştirme süreçlerinizi bir üst seviyeye taşıyabilirsiniz.
