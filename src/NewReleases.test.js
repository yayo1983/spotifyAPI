import { render, screen } from '@testing-library/react';
import NewReleases from './components/spotify/NewReleases';

test('renders learn react link', () => {
  //Arrange
  render(<NewReleases />);
  
  const element = screen.getByText("Los nuevos lanzamientos", {exact: false});
  expect(element).toBeInTheDocument();
});
