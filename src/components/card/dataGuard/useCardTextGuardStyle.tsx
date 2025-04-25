import {MD2Colors, MD3Colors, useTheme} from "react-native-paper";
import {CardDataGuardVisibility} from "./type";
import {useCardDataGuardContext} from "./context/useCardDataGuardContext";


export function useCardTextGuardStyle() {
    const HIDDEN_COLOR = MD3Colors.neutral30
    const {colors} = useTheme()
    const cardDataGuardContext = useCardDataGuardContext()

    const calculateStyle = (visibility: CardDataGuardVisibility) => {
        const isVisible = cardDataGuardContext.visibility === CardDataGuardVisibility.BOTH || visibility === cardDataGuardContext.visibility

        return {
            color: isVisible ? colors.onSurface : HIDDEN_COLOR,
            backgroundColor: isVisible ? MD2Colors.transparent : HIDDEN_COLOR,
        }
    }

    return [calculateStyle];
}