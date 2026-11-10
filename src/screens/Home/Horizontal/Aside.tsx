import { memo } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { useNavActiveId, useStatusbarHeight } from '@/store/common/hook'
import { useTheme } from '@/store/theme/hook'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'
import { createStyle, exitApp as backHome } from '@/utils/tools'
import { NAV_MENUS, LIST_IDS } from '@/config/constant'
import type { InitState } from '@/store/common/state'
// import commonState from '@/store/common/state'
import { exitApp, setNavActiveId } from '@/core/common'
import { setActiveList } from '@/core/list'
import { useSettingValue } from '@/store/setting/hook'

const NAV_WIDTH = 120

const styles = createStyle({
  container: {
    flexGrow: 0,
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 10,
    borderRightWidth: 2,
    paddingBottom: 10,
    width: NAV_WIDTH,
  },
  header: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    marginLeft: 16,
  },
  menus: {
    flex: 1,
  },
  list: {
    // paddingTop: 10,
    paddingBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContent: {
    // width: 24,
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
  },
  text: {
    paddingLeft: 15,
    // fontWeight: '500',
  },
})

const Header = () => {
  const theme = useTheme()
  const statusBarHeight = useStatusbarHeight()
  const handlePressLogo = () => {
    setNavActiveId('nav_top')
    global.app_event.changeMenuVisible(false)
  }
  return (
    <View style={{ paddingTop: statusBarHeight }}>
      <TouchableOpacity style={styles.header} onPress={handlePressLogo} activeOpacity={0.6}>
        <Text size={20} color={theme['c-primary-font-active']} weight="500">首页</Text>
      </TouchableOpacity>
    </View>
  )
}

type IdType = InitState['navActiveId'] | 'nav_exit' | 'back_home'

// 车机版：侧边栏菜单项中文标签
const NAV_LABELS: Record<string, string> = {
  nav_search: '搜索',
  nav_songlist: '歌单',
  nav_top: '排行榜',
  nav_love: '收藏',
  nav_download: '下载',
  nav_setting: '设置',
  nav_health: '健康',
  nav_source: '音源',
  nav_exit: '退出',
  back_home: '首页',
}

const MenuItem = ({ id, icon, onPress }: {
  id: IdType
  icon: string
  onPress: (id: IdType) => void
}) => {
  const activeId = useNavActiveId()
  const theme = useTheme()
  const label = NAV_LABELS[id] || ''

  return activeId == id
    ? <View style={{ ...styles.menuItem, backgroundColor: theme['c-primary-background-active'] }}>
        <View style={styles.iconContent}>
          <Icon name={icon} size={48} color={theme['c-primary-font-active']} />
          <Text size={14} color={theme['c-primary-font-active']} style={{ marginTop: 6 }}>{label}</Text>
        </View>
      </View>
    : <TouchableOpacity style={styles.menuItem} onPress={() => { onPress(id) }}>
        <View style={styles.iconContent}>
          <Icon name={icon} size={48} color={theme['c-font-label']} />
          <Text size={14} color={theme['c-font-label']} style={{ marginTop: 6 }}>{label}</Text>
        </View>
      </TouchableOpacity>
}

export default memo(() => {
  const theme = useTheme()
  // console.log('render drawer nav')
  const showBackBtn = useSettingValue('common.showBackBtn')
  const showExitBtn = useSettingValue('common.showExitBtn')

  const handlePress = (id: IdType) => {
    switch (id) {
      case 'nav_exit':
        exitApp('Exit Btn')
        return
      case 'back_home':
        backHome()
        return
      case 'nav_love':
        // 定制：侧边栏「收藏」直接打开我的收藏列表
        setActiveList(LIST_IDS.LOVE)
        break
    }

    global.app_event.changeMenuVisible(false)
    setNavActiveId(id)
  }

  return (
    <View style={{ ...styles.container, borderRightColor: theme['c-border-background'] }}>
      <Header />
      <ScrollView style={styles.menus}>
        <View style={styles.list}>
          {NAV_MENUS.map(menu => <MenuItem key={menu.id} id={menu.id} icon={menu.icon} onPress={handlePress} />)}
        </View>
      </ScrollView>
      {
        showBackBtn ? <MenuItem id="back_home" icon="home" onPress={handlePress} /> : null
      }
      {
        showExitBtn ? <MenuItem id="nav_exit" icon="exit2" onPress={handlePress} /> : null
      }
    </View>
  )
})

