import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FiMinus } from 'react-icons/fi';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import ReactDatePicker from 'react-datepicker';
import { format, formatISO, parseISO } from 'date-fns';

import {
  LOCAL_STORAGE_KEY,
  WORKOUT_TYPES,
} from '../../constants/LogsConstants';
import {
  Container,
  ContainerForm,
  Form,
  ContainerGrid,
  ResultContainer,
  EmptyMessage,
} from './styles';

interface WorkoutLog {
  id?: string;
  timeSpend: number;
  type: string;
  day: Date | string;
}

// Validation schema
const LogSchema = yup.object().shape({
  timeSpend: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be greater than zero')
    .required('Is required')
    .max(8, 'Can´t be greater than 8'),
  type: yup.string().required('Is required'),
  day: yup.date().typeError('Must be a valid date').required('Is requerid'),
});

/**
 * @author Eduardo Reichert <edrdesigner@gmail.com>
 * @since 0.1.0 - 29/10/2020
 */
const Dashboard: React.FC = () => {
  const [logs, setLogs] = useState<WorkoutLog[]>(() => {
    const storageWorkouts = localStorage.getItem(`${LOCAL_STORAGE_KEY}:logs`);

    if (storageWorkouts) {
      return JSON.parse(storageWorkouts);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:logs`, JSON.stringify(logs));
  }, [logs]);

  const { register, handleSubmit, errors, reset, control } = useForm<
    WorkoutLog
  >({
    resolver: yupResolver(LogSchema),
  });

  const onAddLog = useCallback(
    (data: WorkoutLog) => {
      setLogs(prevLogs => [
        ...prevLogs,
        {
          ...data,
          day: formatISO(data.day as Date),
          id: uuidv4(),
        },
      ]);
      reset();
    },
    [reset],
  );

  const handleDeleteLog = useCallback(
    (item: WorkoutLog) => {
      const updatedLogs = logs.filter(log => log.id !== item?.id);
      setLogs(updatedLogs);
    },
    [logs],
  );

  const totalHours = useMemo(() => {
    if (logs.length > 0) {
      return logs.reduce((acumulador, log) => {
        const total = acumulador + log.timeSpend;
        return total;
      }, 0);
    }

    return 0;
  }, [logs]);

  return (
    <Container>
      <h1>
        WorkoutLog{' '}
        <span role="img" aria-label="strong">
          💪
        </span>
      </h1>
      <ContainerForm>
        <h3>Insert an item</h3>
        <Form onSubmit={handleSubmit(onAddLog)}>
          <div>
            <input
              name="timeSpend"
              type="text"
              placeholder="Time spend"
              ref={register}
            />
            {errors.timeSpend && <p>{errors.timeSpend.message}</p>}
          </div>
          <div>
            <select name="type" ref={register}>
              <option value="">Select type</option>
              {WORKOUT_TYPES.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && <p>{errors.type.message}</p>}
          </div>
          <div>
            <Controller
              control={control}
              name="day"
              defaultValue={new Date()}
              render={({ onChange, onBlur, value }) => (
                <ReactDatePicker
                  onChange={val => onChange(val)}
                  onBlur={onBlur}
                  selected={value}
                />
              )}
            />
            {errors.day && <p>{errors.day.message}</p>}
          </div>
          <button type="submit">Add</button>
        </Form>
      </ContainerForm>
      {logs.length > 0 ? (
        <ContainerGrid>
          <thead>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Data</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td>{log.timeSpend}h</td>
                <td>{log.type}</td>
                <td>{format(parseISO(log.day.toString()), 'MM/dd/yyyy')}</td>
                <td width="25">
                  <button
                    className="delete"
                    onClick={() => handleDeleteLog(log)}
                    type="button"
                  >
                    <FiMinus />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ContainerGrid>
      ) : (
        <EmptyMessage>
          <h3>Oooh :(</h3>
          <span>You don´t have any logs registred.</span>
        </EmptyMessage>
      )}

      {totalHours > 0 && (
        <ResultContainer>
          <h3>{`${totalHours} hours of exercicies`}</h3>
        </ResultContainer>
      )}
    </Container>
  );
};

export default Dashboard;
