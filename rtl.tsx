pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event

vite.config
import { defineConfig } from 'vitest/config'
test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup.ts',
  }

setup.ts

import "@testing-library/jest-dom"


package.json
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",

tsconfing.app.ts
compilerOptions
    "types": ["vite/client", "vitest/globals", "@testing-library/jest-dom"],


test.tsx

// ===============================
// RTL CHEAT CODE – EXAM READY 🧠
// ===============================

// ---------- Imports ----------
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
// Jest:
// import { jest } from "@jest/globals"
// Vitest:
import { vi } from "vitest"

// Component under test
import Login from "./Login"

// ---------- Basic Test Structure ----------
describe("Login component", () => {
  test("submit login form successfully", async () => {
    // ---------- Mock function ----------
    const onSubmit = vi.fn() // jest.fn() for Jest
    const user = userEvent.setup()

    // ---------- Render ----------
    render(<Login onSubmit={onSubmit} />)

    // ---------- Queries (FIND ELEMENTS) ----------
    // NOW exists -> getBy*
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const button = screen.getByRole("button", { name: /login/i })

    // ---------- User Interactions ----------
    await user.type(emailInput, "test@test.com")
    await user.type(passwordInput, "123456")
    await user.click(button)

    // ---------- Assertions ----------
    expect(onSubmit).toHaveBeenCalled()
    expect(onSubmit).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "123456",
    })
  })

  test("does NOT submit when email is empty", async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    render(<Login onSubmit={onSubmit} />)

    await user.click(
      screen.getByRole("button", { name: /login/i })
    )

    // SHOULD NOT exist -> queryBy*
    expect(onSubmit).not.toHaveBeenCalled()

    // APPEARS later (async) -> findBy*
    expect(
      await screen.findByText(/email is required/i)
    ).toBeTruthy() // or toBeInTheDocument() with jest-dom
  })

  test("loading state disables button", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn(
      () => new Promise<void>((r) => setTimeout(r, 50))
    )

    render(<Login onSubmit={onSubmit} />)

    const button = screen.getByRole("button", { name: /login/i })

    await user.click(button)

    // Without jest-dom
    expect((button as HTMLButtonElement).disabled).toBe(true)
    expect(button.textContent).toMatch(/loading/i)

    // After async finishes
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeTruthy()
    })
  })
})

/*
========================================
RTL RULES – EXAM SUMMARY
========================================

getBy*    -> element MUST exist now
queryBy* -> element MUST NOT exist
findBy*  -> element appears later (async)

Prefer:
- getByRole
- getByLabelText
- userEvent over fireEvent

Avoid:
- class / id
- testing state or implementation

RTL tests BEHAVIOR, not CODE.
*/
