import { setToastOpen } from "@/store/recipeSlice";
import { selectToastMessage, selectToastOpen } from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/store/store";

import { Toast } from "gpdesign";

const ToastMessage = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectToastOpen);
  const toastMessage = useAppSelector(selectToastMessage);

  return (
    <Toast isOpen={isOpen} onClose={() => dispatch(setToastOpen(false))}>
      {toastMessage}
    </Toast>
  );
};

export default ToastMessage;
