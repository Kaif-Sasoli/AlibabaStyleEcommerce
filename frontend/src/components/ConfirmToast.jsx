import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const confirmToast = (message, onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div
        className="flex flex-col justify-center"
        style={{
          width: "800px",
          minHeight: "120px",
          padding: "5px",
        }}
      >
        <p className="">{message}</p>
        <div className="flex gap-3  mt-3">
          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            className="px-3 py-0.5 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Yes
          </button>
          <button
            onClick={closeToast}
            className="px-3 py-0.5 bg-gray-300 rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      position: "top-center",
    }
  );
};
