interface msgIprop {
    title: string,
    msg: string
}



const Toast = ({msg, handleClose , bgColor} : {msg:msgIprop , handleClose: any ,bgColor: string}) => {
    // console.log("msg", msg)
    return (
        <div
            className={`toast show position-fixed text-light ${bgColor}`}
            style={{ top: "5px", right: "5px", minWidth: "280px" , zIndex: "9999"}}
        >
            <div className={`toast-header ${bgColor} text-light`}>
                <strong className="mr-auto text-light">{msg.title}</strong>

                <button
                    type="button"
                    className="ml-2 mb-1 close "
                    data-dismiss="toast"
                    style={{ outline: "none" }}
                    onClick={handleClose}
                >
                    x
                </button>
            </div>

            <div className="toast-body">{msg.msg}</div>
        </div>
    );
};

export default Toast;
