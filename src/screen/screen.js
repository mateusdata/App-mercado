
import React, { useContext } from "react";
import { Image, Text, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Compras from "../../assets/carinho.jpg";
import ShoppingDay from "../pages/shoppingDay/shoppingDay";
import ListItens from "../pages/list/ListItens";
import RuleOfThree from "../pages/rule of three/ruleOfThree";
import { Context } from "../context/context";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();
function Screen() {
  const { setItenSelected, open, setOpen, setCompletedItems } =
    useContext(Context);
  const navigate = useNavigation()
  /*
    import { useNavigation } from '@react-navigation/native';
    const navigation = useNavigation()
    eu posso usar assim ou passar um paramentro e uma função que retorna um objeto contendo as propriedades
    por exemplo a propriedade headerTitleLeft: () => (<View>Meu condigo</View>), demais propriedades...
    */
  const removeAdd = () => {
    AsyncStorage.removeItem("lista");
    setOpen(false);
    setItenSelected([]);
  };
  const removeConcluded = () => {
    AsyncStorage.removeItem("concluidos");
    setOpen(false);
    setCompletedItems([]);
  };
  const removeAll = () => {
    AsyncStorage.removeItem("lista");
    AsyncStorage.removeItem("concluidos");
    setOpen(false);
    setItenSelected([]);
    setCompletedItems([]);
  };
  function openModal() {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Listas de compras"
        component={ListItens}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <Image onTouchStart={() => navigate.navigate("Dia da compra")} source={Compras} style={{ width: 80, height: 65, resizeMode: "center" }} />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    fontSize: 25,
                  }}
                >
                  Data Compras
                </Text>
                <Ionicons

                  name="calculator-sharp"
                  size={26}
                  color={"orange"}
                  onPress={() => navigation.navigate("Compras")}
                />
                <SimpleLineIcons
                  onTouchStart={() => openModal()}
                  style={{

                  }}
                  name="options-vertical"
                  size={24}
                  color="#066ca3"
                />
              </View>
              {open ? (
                <View
                onTouchStart={(event)=> {
                  event.stopPropagation();
                  setOpen(false)
                  return false
                }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    top: "-50%",
                    left: "-10%",
                    paddingTop: 0,
                    backgroundColor: "#00000090",
                    width: "120%",
                    height: "1340%",
                    borderRadius: 0,
                    alignItems: "center",
                    justifyContent:"flex-end",
                    padding: 0,
                    flex:1
                  }}
                >
                  <View  onTouchStart={()=>{setOpen(true)}} style={{backgroundColor:"white",  borderRadius: 20, width:"90%", padding:20}}>
                    <View style={{alignItems:"center" }}>
                      <View  style={{ backgroundColor: "#38393a", height: 7, bottom: 12, width: "15%", borderRadius: 5, alignItems:"center" }}></View>
                    </View>
                    <View
                      onTouchStart={() => removeAdd()}
                      style={{
                        width: 380,
                        marginBottom: 20,
                        paddingLeft: 20,
                        borderBottomColor: "#2f3133",
                        borderBottomWidth: 0.5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          marginBottom: 20,
                          color: "#2f3133",
                        }}
                      >
                        Remover todos Adicionados
                      </Text>
                    </View>

                    <View
                      onTouchStart={() => removeConcluded()}
                      style={{
                        width: 380,
                        marginBottom: 20,
                        paddingLeft: 20,
                        borderBottomColor: "#2f3133",
                        borderBottomWidth: 0.5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          marginBottom: 20,
                          color: "#2f3133",
                        }}
                      >
                        Remover todos concluidos
                      </Text>
                    </View>

                    <View
                      onTouchStart={() => removeAll()}
                      style={{
                        width: 380,
                        paddingLeft: 20,
                        borderBottomColor: "#2f3133",
                        borderBottomWidth: 0.5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          marginBottom: 20,
                          color: "#2f3133",
                        }}
                      >
                        Remover todos os itens
                      </Text>
                    </View>
                  </View>
                </View> //aqui
              ) : (
                false
              )}
            </View>
          ),
          headerStyle: {
            backgroundColor: "white",
            minHeight: 100,
            maxHeight: 100,
            height: 100,
          },
          headerTintColor: "black",
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={40} color={color} />
          ),
          tabBarLabelStyle: {
            fontSize: 0,
          },
        })}
      />
      <Stack.Screen
        name="Compras"
        component={RuleOfThree}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="calculator-sharp"
              size={36}
              color={color}
              style={{ top: 2.5 }}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 0,
          },
        }}
      />
      <Stack.Screen name="Dia da compra" component={ShoppingDay} />
    </Stack.Navigator>
  );
}

export default Screen;
