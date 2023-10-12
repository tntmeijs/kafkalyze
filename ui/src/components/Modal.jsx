export const Modal = ({children, onClose}) => {
    return (
        <div className="modal is-active p-4">
            <div className="modal-background" onClick={() => { onClose && onClose() }}></div>
            <div className="modal-content">{children}</div>
        </div>
    );
};
