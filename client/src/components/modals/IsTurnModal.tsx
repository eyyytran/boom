import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import modalSlice from "../../store/modalSlice";

const IsTurnModal = () => {
  const modal = {
    state: useSelector((state: RootState) => state.modal),
    action: modalSlice.actions,
  };

  const dispatch = useDispatch();

  return (
    <div className="w-full bg-green-500 text-white text-center font-bold rounded">
      {/* <button onClick={() => dispatch(modal.action.setIsShowIsTurnModal(false))}>X</button> */}
      <h1>It's Your Turn!</h1>
    </div>
  );
};

export default IsTurnModal;
