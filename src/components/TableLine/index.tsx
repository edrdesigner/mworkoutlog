import React, { useCallback } from 'react';
import { FiMinus } from 'react-icons/fi';

import { WorkoutLog } from '../../types/WorkoutTypes';
import { Container } from './styles';

interface TableLineProps {
  item: WorkoutLog;
  onDelete(item: WorkoutLog): void;
}

/**
 * @author Eduardo Reichert <edrdesigner@gmail.com>
 * @since 0.1.0 - 29/10/2020
 */
const TableLine: React.FC<TableLineProps> = ({ item, onDelete }) => {
  const handleDeleteLog = useCallback(() => {
    onDelete(item);
  }, [item, onDelete]);

  return (
    <Container>
      <td>{item.timeSpend}h</td>
      <td>{item.type}</td>
      <td>{item.dayFormatted}</td>
      <td width="25">
        <button
          data-testid="delete"
          className="delete"
          onClick={handleDeleteLog}
          type="button"
        >
          <FiMinus />
        </button>
      </td>
    </Container>
  );
};

export default TableLine;
