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
    <div className="w-full bg-emerald-500 text-white text-center text-xs font-bold p-2 md:p-3 lg:p-4">
      {/* <button onClick={() => dispatch(modal.action.setIsShowIsTurnModal(false))}>X</button> */}
      <h1>It's Your Turn!</h1>
    </div>
  );
};

export default IsTurnModal;
