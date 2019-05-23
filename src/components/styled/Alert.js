import styled from 'styled-components';

export default styled.div`
  color: ${props =>
    (props.error && '#721c24') ||
    (props.success && '#155724') ||
    (props.info && '#0c5460')};
  background-color: ${props =>
    (props.error && '#f8d7da') ||
    (props.success && '#d4edda') ||
    (props.info && '#d1ecf1')};
  padding: 0.75rem 1.25rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
