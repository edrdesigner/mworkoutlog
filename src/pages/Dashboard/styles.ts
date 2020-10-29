import styled from 'styled-components';
import { darken, cssVar } from 'polished';

const primary = cssVar('--primary', '#0086ff').toString();

export const Container = styled.div`
  max-width: 790px;
  padding: 16px 24px;
  margin: 0 auto;

  H1 {
    text-align: center;
    color: var(--white);
    font-size: 2rem;
    padding-bottom: 24px;
  }
`;

export const ContainerForm = styled.div`
  background: var(--grayBg);
  padding: 12px 12px 16px 12px;
  border-radius: 8px;

  H3 {
    color: var(--gray);
    font-size: 1rem;
    padding-bottom: 16px;
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;

  > div {
    flex-grow: 1;
    margin-right: 16px;
    width: 25%;

    p {
      color: var(--red);
      font-size: 12px;
      padding-top: 4px;
    }

    p::before {
      display: inline;
      content: '⚠ ';
    }
  }

  input,
  select {
    font-size: 14px;
    padding: 0px 12px;
    color: var(--white);
    background: var(--black);
    height: 48px;
    border-radius: 4px;
    border: 2px solid var(--black);
    outline: 0;
    transition: border 0.2s ease 0s;
    width: 100%;

    &:focus {
      border-color: var(--primary);
    }
  }

  > button {
    background: var(--primary);
    border: 0;
    padding: 16px;
    height: 44px;
    font-size: 14px;
    color: var(--white);
    transition: background 0.2s linear;
    border-radius: 4px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-weight: bold;

    &:hover {
      background: ${darken(0.1, primary)};
    }
  }
`;

export const ContainerGrid = styled.table`
  margin-top: 24px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 8px;

  thead {
    th {
      color: var(--gray);
      font-size: 13px;
      font-weight: 500;
      text-align: left;
      padding-left: 12px;
      padding-bottom: 4px;
    }
  }

  tbody {
    tr {
      background: var(--grayBg);
      border-radius: 4px;
    }

    td {
      font-size: 15px;
      color: var(--gray);
      padding: 8px 16px;
    }

    td:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    td:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    button {
      border: 0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      padding: 6px;
      outline: 0;
      transition: 0.2s linear;

      svg {
        color: var(--white);
      }

      &.delete {
        background: var(--black);

        svg {
          color: var(--gray);
        }

        &:hover {
          background: var(--red);

          svg {
            color: var(--white);
          }
        }
      }
    }
  }
`;

export const EmptyMessage = styled.div`
  padding: 24px;
  font-size: 13px;
  color: var(--gray);
  text-align: center;

  h3 {
    font-size: 20px;
    color: var(--secondary);
    text-align: center;
    padding-bottom: 12px;
  }
`;

export const ResultContainer = styled.div`
  margin-top: 24px;

  h3 {
    font-size: 1.4rem;
    color: var(--secondary);
    text-align: center;
  }
`;
