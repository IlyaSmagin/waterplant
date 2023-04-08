import { screen, render, fireEvent} from '@testing-library/react'
import {Home, GroupCategory, SearchFilter, Feed} from '../pages/index'

describe('checkbox', () => {
  it('renders with checked init value', () => {
    render(<GroupCategory filterCategory={"wateringVolume"}
    setFilterCategory={() => (1)} />);
    expect(screen.queryByLabelText('Water').checked).toBe(true);
    expect(screen.queryByLabelText('Size').checked).toBe(false);
    expect(screen.queryByLabelText('Light').checked).toBe(false);
    expect(screen.queryByLabelText('Difficulty').checked).toBe(false);
  })

  it('changes category when another checkbox is clicked', async () => {
    render(<GroupCategory filterCategory={"wateringVolume"}
    setFilterCategory={() => (1)} />);
    expect(screen.getByLabelText('Water').checked).toBe(true);
    expect(screen.getByLabelText('Size').checked).toBe(false);
    fireEvent.click(screen.getByLabelText('Size'));
    expect(screen.getByLabelText('Size').checked).toBe(true);
    expect(screen.getByLabelText('Water').checked).toBe(false);
  })
})
describe('searchbar', () => {
  it('renders empty searchbar with correct placeholder', () => {
    render(<SearchFilter setSearchQuery={() => (1)} />);
    expect(screen.queryByLabelText('Search').value).toBe("");
    expect(screen.queryByLabelText('Search').placeholder).toBe("Search");
  })

  it('changes input and removes placeholder on input', async () => {
    render(<SearchFilter setSearchQuery={() => (1)} />);
    expect(screen.queryByLabelText('Search').value).toBe("");
    fireEvent.change(screen.queryByLabelText('Search'), {target: {value: 'Red'}})
    expect(screen.queryByLabelText('Search').value).toBe("Red");
    expect(screen.queryByLabelText('Search').placeholder).toBe("Search");
  })
})