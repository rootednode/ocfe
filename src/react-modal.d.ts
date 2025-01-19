declare module 'react-modal' {
  import { Component, CSSProperties } from 'react';

  interface ModalProps {
    isOpen: boolean;
    onAfterOpen?: () => void;
    onRequestClose?: (event: MouseEvent | KeyboardEvent) => void;
    closeTimeoutMS?: number;
    style?: {
      content?: CSSProperties;
      overlay?: CSSProperties;
    };
    contentLabel?: string;
    portalClassName?: string;
    overlayClassName?: string | Record<string, boolean>;
    className?: string | Record<string, boolean>;
    bodyOpenClassName?: string;
    htmlOpenClassName?: string;
    ariaHideApp?: boolean;
    shouldFocusAfterRender?: boolean;
    shouldCloseOnOverlayClick?: boolean;
    shouldReturnFocusAfterClose?: boolean;
    aria?: {
      [key: string]: string;
    };
    data?: {
      [key: string]: any;
    };
    role?: string;
    parentSelector?: () => HTMLElement;
    appElement?: HTMLElement;
    overlayRef?: (node: HTMLElement | null) => void;
    contentRef?: (node: HTMLElement | null) => void;
    testId?: string;
  }

  class Modal extends Component<ModalProps> {}

  export default Modal;
}
