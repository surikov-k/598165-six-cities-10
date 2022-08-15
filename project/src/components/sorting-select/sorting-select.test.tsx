import {render, screen} from '@testing-library/react';
import SortingSelect, {SortingType} from './sorting-select';
import userEvent from '@testing-library/user-event';

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

  it('should call a change sorting callback when the select item is pressed', async () => {
    render(
      <SortingSelect
        currentType={SortingType.Popular}
        changeSorting={handleChangeSorting}
      />
    );

    for (const item of screen.getAllByTestId('sort-item')) {
      await userEvent.click(item);
      expect(handleChangeSorting).toBeCalled();
    }
  });
});
