import React from 'react';
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
  queryByAttribute,
} from '@testing-library/react';
import Dashboard from '../../pages/Dashboard';

afterEach(cleanup);

describe('Dashboard Page', () => {
  it('should render title', () => {
    render(<Dashboard />);
    const titleElement = screen.getByText(/WorkoutLog/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('should not be able to add workout log with invalid attributes', async () => {
    const mockedUUID = jest.fn();
    jest.mock('uuid', () => {
      return {
        v4: () => mockedUUID,
      };
    });

    const getById = queryByAttribute.bind(null, 'id');

    const { getByText, container } = render(<Dashboard />);

    const dayField = getById(container, 'day');
    const buttonAdd = getByText('Add');

    if (dayField) {
      fireEvent.change(dayField, { target: { value: null } });
    }

    fireEvent.click(buttonAdd);

    expect(await screen.findAllByRole('alert')).toHaveLength(3);
    expect(mockedUUID).not.toBeCalled();
  });

  it('should be able to add workout log', async () => {
    const { getByTestId, getByText } = render(<Dashboard />);

    const timeSpendField = getByTestId('timeSpend');
    const typeField = getByTestId('type');
    const buttonAdd = getByText('Add');
    fireEvent.change(timeSpendField, { target: { value: 1 } });
    fireEvent.change(typeField, { target: { value: 'Run' } });

    fireEvent.click(buttonAdd);

    const listNode = await waitFor(() => getByTestId('grid'));

    expect(listNode.children).toHaveLength(2);
  });

  it('should be able to delete workout log', async () => {
    const { getByTestId } = render(<Dashboard />);

    const listNode = await waitFor(() => getByTestId('grid'));

    const deleteButton = screen.getAllByTestId('delete');

    fireEvent.click(deleteButton[0]);

    expect(listNode.children).toHaveLength(2);
  });
});
