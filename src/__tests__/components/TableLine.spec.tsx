import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import TableLine from '../../components/TableLine';

afterEach(cleanup);

const mockedOnDelete = jest.fn();
const itemMock = {
  id: '123456',
  timeSpend: 2,
  type: 'Run',
  day: '2020-10-29',
  dayFormatted: '2020-10-29',
};

describe('TableLine Component', () => {
  it('should render element', () => {
    render(
      <table>
        <tbody>
          <TableLine item={itemMock} onDelete={mockedOnDelete} />
        </tbody>
      </table>,
    );
    const typeElement = screen.getByText(/Run/i);
    expect(typeElement).toBeInTheDocument();
  });

  it('should call onDelete', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <TableLine item={itemMock} onDelete={mockedOnDelete} />
        </tbody>
      </table>,
    );
    const buttonDelete = getByTestId('delete');
    fireEvent.click(buttonDelete);

    expect(mockedOnDelete).toBeCalled();
  });
});
