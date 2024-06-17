import { StackNavigationProp } from "@react-navigation/stack";
import { TItem } from "./GenericTypes";

export type ApplicationStackParamList = {
    Home: undefined
    AddTask: undefined;
    EditTask: {
        task: TItem
    };
}

export type NavigationProp<T extends keyof ApplicationStackParamList> = StackNavigationProp<ApplicationStackParamList, T>