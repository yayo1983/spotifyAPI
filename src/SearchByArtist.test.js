import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchByArtist from "./components/spotify/SearchByArtist";

// Agrupar test
describe("Search By Artist component", () => {
  test("render nombre del artista", () => {
    //Arrange
    render(<SearchByArtist />);

    const element = screen.getByText("Nombre del artista", {
      exact: false,
    });
    expect(element).toBeInTheDocument();
  });

  test("renders Búsqueda satisfactoria", () => {
    //Arrange
    render(<SearchByArtist />);

    // Act
    const buttonElement = screen.getByRole("button", {
      exact: false,
    });
    userEvent.click(buttonElement)

    //Assert
    const element = screen.getByText("Búsqueda satisfactoria", {
      exact: false,
    });
    expect(element).toBeInTheDocument();
  });

  test("renders Error en la búsqueda por el nombre del artista", () => {
    //Arrange
    render(<SearchByArtist />);

    // Act
    const buttonElement = screen.getByRole("button", {
      exact: false,
    });
    userEvent.click(buttonElement)

    //Assert
    const element = screen.queryByText("Búsqueda satisfactoria", {
      exact: false,
    });
    expect(element).toBeNull();
  });
});


