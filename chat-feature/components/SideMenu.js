import SideMenu from 'react-native-side-menu';

export default function Menu({navigation}) {
    const menu = <Menu navigator = 'navigator'/>;
    return (
        <SideMenu menu={menu}>
        //ROUTE WHERE MENU SHOUDL EXISTS (CONVERSATIONS SCREEN)
//        <App style={{backgroundColor='white'}} />

      </SideMenu>
    );
    
}
