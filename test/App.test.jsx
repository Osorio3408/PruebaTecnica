import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";

describe("App Component", () => {
  beforeAll(() => {
    // Mock completo y realista de fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              firstName: "John",
              lastName: "Doe",
              email: "john@example.com",
              status: true,
            },
          ]),
        headers: new Headers(),
        status: 200,
        statusText: "OK",
      })
    );
  });

  it("muestra el estado de carga inicial", async () => {
    render(<App />);

    // Verifica el texto exacto que muestra el componente Loading
    const loadingText = screen.getByText((content, element) => {
      // Busca "cargando" sin importar mayúsculas o minúsculas
      return content.toLowerCase().includes("cargando");
    });

    expect(loadingText).toBeInTheDocument();

    // Limpia el renderizado para el siguiente test
    await waitFor(() => {
      expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
    });
  });

  it("muestra los usuarios después de cargar", async () => {
    render(<App />);

    // Espera a que los datos se carguen
    await waitFor(
      () => {
        // Busca el nombre y apellido por separado para mayor flexibilidad
        const firstNameElement = screen.getByText("John");
        const lastNameElement = screen.getByText("Doe");

        expect(firstNameElement).toBeInTheDocument();
        expect(lastNameElement).toBeInTheDocument();
      },
      { timeout: 3000 }
    ); 
  });
});
