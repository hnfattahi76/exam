# CSP Cheat Sheet (React / SPA)

## CSP چیه؟
CSP (Content Security Policy) یک **HTTP Header** است که به مرورگر می‌گوید:
> چه منابعی اجازه دارند لود/اجرا شوند.

مرورگر اگر چیزی خلاف Policy ببیند:
- آن را **Block** می‌کند
- در **Console** خطا می‌دهد

---

## مهم‌ترین دستورها

### 1) `default-src 'self'`
قانون پیش‌فرض برای همه چیز.

```txt
default-src 'self'
```

یعنی همه منابع فقط از همین دامنه.

---

### 2) `script-src`
مهم‌ترین بخش CSP (برای XSS)

#### حالت امن استاندارد:
```txt
script-src 'self'
```

نتیجه: inline script و inline handlerها بلاک می‌شوند:

```html
<script>alert(1)</script>
<button onclick="alert(1)">click</button>
```

---

### 3) Nonce (برای اجازه دادن به inline خاص)
اگر نیاز داری یک inline script اجرا شود ولی امن باشد:

```txt
script-src 'self' 'nonce-abc123'
```

و در HTML:

```html
<script nonce="abc123">
  console.log("OK")
</script>
```

فقط scriptهایی که nonce درست دارند اجرا می‌شوند.

---

### 4) `style-src`
کنترل CSS

در dev معمولاً لازم است:

```txt
style-src 'self' 'unsafe-inline'
```

در prod بهتر است:

```txt
style-src 'self'
```

---

### 5) `img-src`
کنترل تصاویر

```txt
img-src 'self' data:
```

یعنی:
- تصاویر از خود سایت مجاز
- تصاویر base64 مجاز
- تصاویر از دامنه‌های دیگر غیرمجاز

---

### 6) `connect-src`
کنترل requestها (fetch/axios/ws)

```txt
connect-src 'self'
```

اگر API خارجی داری:

```txt
connect-src 'self' https://api.example.com
```

---

### 7) `object-src 'none'`
برای امنیت بهتر همیشه ببند:

```txt
object-src 'none'
```

---

### 8) `frame-ancestors`
برای جلوگیری از Clickjacking:

```txt
frame-ancestors 'none'
```

یا اگر فقط یک دامنه اجازه دارد:

```txt
frame-ancestors https://trusted.com
```

---

## CSP نمونه‌ی خوب

### نسخه Dev (Vite / React)
```txt
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
connect-src 'self' ws: http: https:;
object-src 'none';
base-uri 'self';
frame-ancestors 'none';
```

### نسخه Production (سخت‌گیرانه‌تر + nonce)
```txt
default-src 'self';
script-src 'self' 'nonce-<RANDOM>';
style-src 'self';
img-src 'self' data:;
connect-src 'self';
object-src 'none';
base-uri 'self';
frame-ancestors 'none';
```

---

## سوال‌های طلایی آزمونی

### CSP جلوی چی رو می‌گیره؟
- inline XSS (script/onclick/onerror…)
- لود شدن اسکریپت از دامنه‌های ناشناس
- Clickjacking (با frame-ancestors)

### CSP جلوی چی رو نمی‌گیره؟
- HTML فیشینگ (بدون JS هم میشه UI جعلی ساخت)
- اگر sanitize نکنی، HTML مخرب هنوز می‌تواند رندر شود
- اگر attacker از کدهای مجاز سایت سوءاستفاده کند

---

## Payloadهای تست سریع
این‌ها را داخل `dangerouslySetInnerHTML` تست کن:

### Inline onclick
```html
<button onclick="alert(1)">Click</button>
```

### Inline script
```html
<script>alert(1)</script>
```

### javascript: link
```html
<a href="javascript:alert(1)">click</a>
```

اگر CSP درست باشد:
- alert اجرا نمی‌شود
- Console پیام “Refused to execute…” می‌دهد
