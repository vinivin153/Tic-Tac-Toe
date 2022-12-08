import reactDom from 'react-dom';

export default function ModalPortal({ children }) {
  const rootModal = document.getElementById('root-modal');

  return reactDom.createPortal(children, rootModal);
}
