import React from "react";

export default function A11yCheatCodes() {
  return (
    <div style={{ padding: 24, fontFamily: "sans-serif", lineHeight: 1.8 }}>
      <h1>A11y Cheat Codes (React + TSX)</h1>

      {/* 1) Icon Button (aria-label) */}
      <section>
        <h2>1) Icon Button (aria-label)</h2>
        <button aria-label="بستن">✖</button>
      </section>

      <hr />

      {/* 2) Input + Label */}
      <section>
        <h2>2) Input + Label</h2>
        <label htmlFor="email">ایمیل</label>
        <br />
        <input id="email" type="email" autoComplete="email" />
      </section>

      <hr />

      {/* 3) Input + Help Text (aria-describedby) */}
      <section>
        <h2>3) Input + Help Text (aria-describedby)</h2>
        <label htmlFor="email2">ایمیل</label>
        <br />
        <input id="email2" type="email" aria-describedby="help-email" />
        <p id="help-email">مثال: name@gmail.com</p>
      </section>

      <hr />

      {/* 4) Input Error (aria-invalid + aria-describedby) */}
      <section>
        <h2>4) Input Error (aria-invalid)</h2>
        <label htmlFor="email3">ایمیل</label>
        <br />
        <input
          id="email3"
          type="email"
          aria-invalid="true"
          aria-describedby="err-email"
        />
        <p id="err-email" style={{ color: "crimson" }}>
          ایمیل معتبر نیست
        </p>
      </section>

      <hr />

      {/* 5) Modal / Dialog */}
      <section>
        <h2>5) Modal / Dialog</h2>

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          style={{
            border: "1px solid #ccc",
            borderRadius: 12,
            padding: 16,
            maxWidth: 420,
          }}
        >
          <h3 id="dialog-title">حذف آیتم</h3>
          <p>آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟</p>

          <div style={{ display: "flex", gap: 8 }}>
            <button>حذف</button>
            <button>انصراف</button>
          </div>
        </div>
      </section>

      <hr />

      {/* 6) Alert */}
      <section>
        <h2>6) Alert (for important errors)</h2>
        <div role="alert" style={{ background: "#ffe5e5", padding: 12 }}>
          خطا! اطلاعات ذخیره نشد
        </div>
      </section>

      <hr />

      {/* 7) Status */}
      <section>
        <h2>7) Status (for success / toast)</h2>
        <div role="status" style={{ background: "#e5ffe5", padding: 12 }}>
          ذخیره شد
        </div>
      </section>

      <hr />

      {/* 8) Navigation */}
      <section>
        <h2>8) Navigation</h2>
        <nav aria-label="منوی اصلی">
          <a href="#home">خانه</a> | <a href="#products">محصولات</a> |{" "}
          <a href="#contact">تماس</a>
        </nav>
      </section>

      <hr />

      {/* 9) Checkbox with label */}
      <section>
        <h2>9) Checkbox + Label</h2>
        <label>
          <input type="checkbox" /> مرا به خاطر بسپار
        </label>
      </section>

      <hr />

      {/* 10) Images: decorative vs meaningful */}
      <section>
        <h2>10) Images: decorative vs meaningful</h2>

        <p>تصویر تزئینی:</p>
        <img
          src="https://via.placeholder.com/120"
          alt=""
          style={{ display: "block", marginBottom: 12 }}
        />

        <p>تصویر معنی‌دار:</p>
        <img
          src="https://via.placeholder.com/120"
          alt="نمودار فروش ماهانه"
          style={{ display: "block" }}
        />
      </section>

      <hr />

      {/* Common Traps */}
      <section>
        <h2>⚠️ Common Traps (Don’t do these)</h2>

        <pre style={{ background: "#f5f5f5", padding: 12 }}>
        </pre>
      </section>

      <hr />

      {/* Golden Rule */}
      <section>
        <h2>⭐ Golden Rule</h2>
        <p>
          Semantic HTML اولویت دارد. تا وقتی می‌توانی از button / a / label / nav
          استفاده کن، بعد اگر لازم شد aria.
        </p>
      </section>
    </div>
  );
}
