import {render, screen } from '@testing-library/react';

describe("Async component", () => {
  test("renders gets if requests succeeds", async () => {
     // dummy or mock values 
     window.fetch() = jest.fn();
     window.fetch.mockResolvedValueOnce({
        json: async () =>[{id: "4mN0qcMxWX8oToqfDPM5yV", name: 'José José', popularity: '77', type: 'artist', genres: [ "bolero", "cancion melodica", "latin pop", "ranchera" ], 
        followers: {total: 5912659}}]
     })
     //Arrange
     render(<SearchByArtist />);

      // Act
    const tablenElement = await screen.findAllByRole("table", {},{});
    expect(tablenElement).not.toHaveLength(0);

  });
});
