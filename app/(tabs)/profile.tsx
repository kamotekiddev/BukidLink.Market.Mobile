import { Button, SafeAreaView } from "react-native";
import { useAuthContext } from "@/context/AuthContext";
import Icon from "react-native-vector-icons/AntDesign";

export default function Profile() {
    const ctx = useAuthContext();

    const handleLogout = () => ctx.logout();

    return (
        <SafeAreaView>
            <Button
                onPress={handleLogout}
                title="Logout"
                // icon={
                //     <Icon
                //         type="antdesign"
                //         name="logout"
                //         color="white"
                //         size={18}
                //         style={{ marginLeft: 10 }}
                //     />
                // }
                // iconRight
            />
        </SafeAreaView>
    );
}
