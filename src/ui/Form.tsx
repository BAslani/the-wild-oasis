import styled, { css } from 'styled-components'

const Form = styled.form`
  ${(props) =>
    props.typeof === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.typeof === 'modal' &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`

Form.defaultProps = {
  typeof: 'regular',
}
export default Form
