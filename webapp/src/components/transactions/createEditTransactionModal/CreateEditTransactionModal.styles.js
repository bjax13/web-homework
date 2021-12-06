import { css } from '@emotion/core'

export const styles = css`
  .modal-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    cursor: pointer;
  }
  .modal {
    width: 500px;
    background: white;
    border: 1px solid #ccc;
    position: absolute;
    top: 20%;
    left: 20%;
    z-index: 5;

    h2 {
      border-bottom: 1px solid #ccc;
      padding: 1rem;
      margin: 0;
    }
    .modal-content {
      padding: 1rem;
    }
    .actions {
      border-top: 1px solid #ccc;
      background: #eee;
      padding: 0.5rem 1rem;
      button:first-child {
        margin-right: 15px;
      }
    }
  }
`
