import {render, screen} from '@testing-library/react';
import SortingSelect, {SortingType} from './sorting-select';

describe('Component: SortingSelect', () => {

  const handleChangeSorting = jest.fn();

  it('should be rendered correctly', () => {
    render(
      <SortingSelect
        currentType={SortingType.Popular}
        changeSorting={handleChangeSorting}
      />
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(`${SortingType.Popular}`, 'i')).length)
      .toBe(2);
  });
});
