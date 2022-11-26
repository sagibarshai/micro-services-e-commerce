import Notification from "../notification/Notification";
import { colors } from "../colors/colors";
import IconInfoCircle from "../svg/info-circle.svg";
import { useSelector } from "react-redux";
import { StoreState } from "../../redux/store";

export default () => {
     const { showErrorNotification } = useSelector(
          (state: StoreState) => state.userNotificationSlice
     );
     const { showUserNotification } = useSelector(
          (state: StoreState) => state.userNotificationSlice
     );
     if (showErrorNotification) {
          return (
               <Notification
                    backgroundColor={colors.blackInputText}
                    position="fixed"
                    variant="error"
                    animation={true}
                    message={
                         typeof showErrorNotification === "string"
                              ? showErrorNotification
                              : undefined
                    }
                    bottom="60%"
                    left="50%"
                    transform="translate(-50% , -50%)"
                    fontSize="2.5rem"
                    fontWeight="bolder"
                    color={colors.white}
                    height="150px"
                    width="450px"
                    icon={<IconInfoCircle />}
               />
          );
     } else if (showUserNotification) {
          return (
               <Notification
                    backgroundColor={colors.blackInputText}
                    position="fixed"
                    variant="error"
                    animation={true}
                    message={
                         typeof showUserNotification === "string"
                              ? showUserNotification
                              : undefined
                    }
                    bottom="60%"
                    left="50%"
                    transform="translate(-50% , -50%)"
                    fontSize="2.5rem"
                    fontWeight="bolder"
                    color={colors.white}
                    height="150px"
                    width="450px"
                    icon={<IconInfoCircle />}
               />
          );
     } else return <></>;
};
